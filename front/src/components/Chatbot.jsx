import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hello! How can I help you today?' }
    ]);

    const [sessionId, setSessionId] = useState(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                return `user_${user.id}`;
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
            }
        }
        return `sess_${Math.floor(Math.random() * 100000)}`;
    });
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const handleAuthChange = () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    setSessionId(`user_${user.id}`);
                } catch (e) {}
            } else {
                setSessionId(`sess_${Math.floor(Math.random() * 100000)}`);
                setMessages([{ sender: 'bot', text: 'Hello! How can I help you today?' }]);
            }
        };

        window.addEventListener('authChanged', handleAuthChange);
        return () => window.removeEventListener('authChanged', handleAuthChange);
    }, []);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/chatbot/history/${sessionId}`);
                if (response.data && response.data.length > 0) {
                    setMessages(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch chat history", error);
            }
        };
        fetchHistory();
    }, [sessionId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        try {
            const response = await axios.post('http://localhost:5000/api/chatbot', {
                session_id: sessionId,
                message: userMsg.text
            });

            const botMsg = { sender: 'bot', text: response.data.reply, products: response.data.products };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error("Error when sending message:", error);
            setMessages(prev => [...prev, { sender: 'bot', text: 'The system is busy, please try again later.' }]);
        }
    };

    return (
        <div className="chatbot-container">
            {isOpen ? (
                <div className="chat-window">
                    <div className="chat-header">
                        <span>Fashi Support</span>
                        <button onClick={() => setIsOpen(false)} className="close-btn">X</button>
                    </div>
                    
                    <div className="message-area overflow-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.sender === 'user' ? 'user-msg' : 'bot-msg'}>
                                <ReactMarkdown components={{ p: ({ children }) => <p className="m-0">{children}</p> }}>
                                    {msg.text}
                                </ReactMarkdown>

                                {msg.products && msg.products.length > 0 && (
                                    <div className="d-flex overflow-auto mt-2 pb-2">
                                        {msg.products.map((product, idx) => (
                                            <div key={product.id} className="card flex-shrink-0 shadow-sm mr-2 chatbot-product-card">
                                                <img src={`/${product.image}`} alt={product.name} className="card-img-top object-fit-cover p-2 chatbot-product-img" />
                                                <div className="card-body p-2 d-flex flex-column pt-0">
                                                    <h6 className="card-title text-truncate mb-1 small" title={product.name}>{product.name}</h6>
                                                    <p className="card-text fw-bold text-danger mb-2 small">${parseFloat(product.price).toFixed(2)}</p>
                                                    <Link to={`/product/${product.id}`} className="btn btn-dark btn-sm mt-auto w-100 small">
                                                        Xem chi tiết
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={sendMessage} className="input-area">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="chat-input"
                        />
                        <button type="submit" className="send-btn">Send</button>
                    </form>
                </div>
            ) : (
                <button onClick={() => setIsOpen(true)} className="floating-btn">
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot;