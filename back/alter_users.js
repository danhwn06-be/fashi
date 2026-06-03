const pool = require('mysql2').createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fashi_db',
    port: 3306
}).promise();

async function migrate() {
    try {
        console.log("Checking if columns exist...");
        // Check if first_name exists
        const [cols] = await pool.query(`SHOW COLUMNS FROM users LIKE 'first_name'`);
        if (cols.length === 0) {
            console.log("Adding columns to users table...");
            await pool.query(`
                ALTER TABLE users 
                ADD COLUMN first_name VARCHAR(100) AFTER username,
                ADD COLUMN last_name VARCHAR(100) AFTER first_name,
                ADD COLUMN address VARCHAR(255) AFTER last_name,
                ADD COLUMN phone VARCHAR(20) AFTER address
            `);
            console.log("Migration successful.");
        } else {
            console.log("Columns already exist.");
        }
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        pool.end();
    }
}

migrate();
