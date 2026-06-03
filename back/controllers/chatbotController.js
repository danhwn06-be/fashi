const Message = require('../models/Message');
const Product = require('../models/Product');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handleMessage = async (req, res) => {
    const { session_id, message } = req.body;

    try {
        await Message.saveMessage(session_id, 'user', message);

        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const [products] = await Product.getAll();
        console.log(`[Chatbot] Loaded entire catalog with ${products.length} products.`);

        const productCatalogText = products.map(p =>
            `- ID ${p.id}, Name: ${p.name}, Category: ${p.category} > ${p.subcategory}, Price: ${p.price}, Specs: ${JSON.stringify(p.specifications)}, isSale: ${p.is_sale}`)
            .join('\n');

        let couponContext = "";
        try {
            const Coupon = require('../models/Coupon');
            const [coupons] = await Coupon.getAllActiveCoupons();
            if (coupons.length > 0) {
                const couponsText = coupons.map(c => `- Code: ${c.code}, Discount: ${c.discount_value}${c.discount_type === 'PERCENT' ? '%' : '$'}`).join('\n');
                couponContext = `\n            Here are the currently active DISCOUNT COUPONS you can offer to the customer:\n${couponsText}\n`;
            }
        } catch (e) {
            console.error("Error fetching coupons for chatbot:", e);
        }

        let cartContext = "";
        let orderContext = "";
        let userContext = "";
        if (session_id && session_id.startsWith('user_')) {
            const user_id = session_id.split('_')[1];

            try {
                const User = require('../models/User');
                const [users] = await User.findById(user_id);
                if (users.length > 0) {
                    const user = users[0];
                    userContext = `\n            You are talking to a user named "${user.username}". Use this name to address them friendly. However, you must strictly protect their privacy. NEVER reveal or explicitly repeat their personal information (such as their full name, email, phone number, or address) in your responses, even if you have access to it or if they ask you for it.\n`;
                }
            } catch (e) {
                console.error("Error fetching user for chatbot:", e);
            }

            try {
                const Cart = require('../models/Cart');
                const [cartItems] = await Cart.getCartItems(user_id);
                if (cartItems.length > 0) {
                    let cartTotal = 0;
                    const itemsText = cartItems.map(item => {
                        cartTotal += parseFloat(item.price) * item.quantity;
                        let specs = "";
                        if (item.selected_specs) {
                            try {
                                specs = ` (Specs: ${Object.values(JSON.parse(item.selected_specs)).join(', ')})`;
                            } catch (e) { }
                        }
                        return `            - ${item.name}${specs} x ${item.quantity} (Price: $${parseFloat(item.price).toFixed(2)})`;
                    }).join('\n');

                    cartContext = `
            Here is the customer's CURRENT SHOPPING CART context:
${itemsText}
            Total estimated cart value: $${cartTotal.toFixed(2)}
            (Use this information ONLY if the customer asks about their cart, order total, or if you want to suggest matching/complementary items based on what they already selected.)`;
                }
            } catch (e) {
                console.error("Error fetching cart for chatbot:", e);
            }

            try {
                const Order = require('../models/Order');
                const [orders] = await Order.getUserOrders(user_id);
                if (orders.length > 0) {
                    const ordersText = orders.slice(0, 5).map(o => `            - Order #${o.id} (Total: $${o.total}, Status: ${o.status}, Date: ${new Date(o.created_at).toLocaleDateString()})`).join('\n');
                    orderContext = `\n            Here is the customer's RECENT ORDER HISTORY (last 5 orders):\n${ordersText}\n            (Use this to answer questions about their previous purchases or order status.)\n`;
                }
            } catch (e) {
                console.error("Error fetching orders for chatbot:", e);
            }
        }

        const prompt = `
            You are a highly friendly and professional customer service virtual assistant for an e-commerce fashion website named "Fashi".
            ${userContext}
            Here is our COMPLETE PRODUCT CATALOG:
            ${products.length > 0 ? productCatalogText : "(No products available in the database)"}
            ${cartContext}
            ${orderContext}
            ${couponContext}
            Here is additional store policy information:
            - Free shipping for orders over $50.
            - Nationwide delivery within 2-4 days.
            - 7-day return policy for manufacturer defects.
            
            Answering rules:
            - Always refer to yourself as "Fashi" or "I" and call the customer "you".
            - Keep answers short, concise, and highly relevant, maximum 3-4 sentences.
            - Carefully analyze the ENTIRE product catalog and the customer's request. Find the EXACT product that matches their criteria.
            - If no product perfectly matches ALL of the customer's criteria, you MUST recommend the closest matching products (at least 1) that meet as many criteria as possible.
            - IMPORTANT: Always recommend products by precisely matching the customer's height, weight, foot length, or intended weather/season with the specifications (Specs) provided in the catalog. Explain to the customer exactly which size (S, M, L or 39, 40, 41) or specification fits their needs best.
            - MUST RETURN YOUR RESPONSE IN JSON FORMAT EXACTLY LIKE THIS:
            {
                "text": "Your friendly reply text here...",
                "product_ids": [array of recommended product IDs (integers), or empty array [] if none]
            }
            - Do not include markdown code block syntax (like \`\`\`json) in your response, return ONLY the raw JSON object.
            
            Customer's message: "${message}"
        `;

        let botReplyText = "";
        let botReplyProducts = [];
        let retries = 3;
        while (retries > 0) {
            try {
                const result = await model.generateContent(prompt);
                let rawText = result.response.text().trim();
                rawText = rawText.replace(/```json|```/g, '').trim();

                try {
                    const parsedResponse = JSON.parse(rawText);
                    if (typeof parsedResponse === 'object' && parsedResponse !== null) {
                        let dataObj = parsedResponse;
                        if (Array.isArray(parsedResponse)) {
                            dataObj = parsedResponse.length > 0 ? parsedResponse[0] : {};
                        }

                        botReplyText = dataObj.text || dataObj.message || dataObj.reply || dataObj.response || "Sorry, I can't display this response. Please try again.";
                        botReplyProducts = dataObj.product_ids || dataObj.products || [];
                    } else {
                        botReplyText = String(parsedResponse);
                        botReplyProducts = [];
                    }
                } catch (parseError) {
                    botReplyText = rawText;
                }
                break;
            } catch (err) {
                retries--;
                if (retries === 0) {
                    console.error("Gemini API Error after retries:", err);
                    throw err;
                }

                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        const recommendedProducts = products.filter(p => botReplyProducts.includes(p.id));

        const storedMessage = JSON.stringify({
            text: botReplyText,
            products: recommendedProducts
        });

        await Message.saveMessage(session_id, 'bot', storedMessage);

        res.status(200).json({ reply: botReplyText, products: recommendedProducts });
    } catch (error) {
        console.error("Error processing AI Chatbot with DB:", error);
        res.status(500).json({
            reply: "The system is busy, please try again later.",
            error: error.message,
            stack: error.stack
        });
    }
}

exports.getHistory = async (req, res) => {
    try {
        const { session_id } = req.params;
        const [rows] = await Message.getHistoryBySession(session_id);

        const history = rows.map(row => {
            if (row.sender === 'bot') {
                try {
                    const parsed = JSON.parse(row.message_text);
                    return { sender: 'bot', text: parsed.text, products: parsed.products || [] };
                } catch (e) {
                    return { sender: 'bot', text: row.message_text };
                }
            }
            return { sender: 'user', text: row.message_text };
        });

        res.status(200).json(history);
    } catch (error) {
        console.error("Error fetching chat history:", error);
        res.status(500).json({ error: "Failed to fetch history" });
    }
}