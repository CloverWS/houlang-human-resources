const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',      // 请替换为您的 MySQL 用户名
  password: 'pass1234', // 请替换为您的 MySQL 密码
  charset: 'utf8mb4'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL server');

  // Create database if it doesn't exist with UTF-8 support
  connection.query('CREATE DATABASE IF NOT EXISTS tutoring_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      return;
    }
    console.log('Database created or already exists');

    // Use the database
    connection.query('USE tutoring_platform', (err) => {
      if (err) {
        console.error('Error using database:', err);
        return;
      }
      console.log('Using tutoring_platform database');

      // Set connection charset after selecting database
      connection.query('SET NAMES utf8mb4', (err) => {
        if (err) {
          console.error('Error setting connection charset:', err);
          return;
        }

        // Create table if it doesn't exist with UTF-8 support
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS chat_sessions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_type VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
            conversation TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
            contact_info VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
        `;
        
        connection.query(createTableQuery, (err) => {
          if (err) {
            console.error('Error creating table:', err);
            // If table exists with wrong schema, try to drop and recreate
            if (err.errno === 1293) {
              connection.query('DROP TABLE IF EXISTS chat_sessions', (dropErr) => {
                if (dropErr) {
                  console.error('Error dropping table:', dropErr);
                } else {
                  connection.query(createTableQuery, (createErr) => {
                    if (createErr) {
                      console.error('Error recreating table:', createErr);
                    } else {
                      console.log('Chat sessions table recreated successfully');
                    }
                  });
                }
              });
            }
          } else {
            console.log('Chat sessions table created or already exists');
          }
        });
      });
    });
  });
});

// API Endpoints
app.post('/api/save-chat', (req, res) => {
  const { userType, conversation } = req.body;
  
  try {
    const conversationData = JSON.parse(conversation);
    const contactInfo = conversationData.contactInfo;
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    const query = 'INSERT INTO chat_sessions (user_type, conversation, contact_info, updated_at) VALUES (?, ?, ?, NOW())';
    connection.query(query, [userType, conversation, contactInfo], (err, results) => {
      if (err) {
        console.error('Error saving chat session:', err);
        res.status(500).json({ error: 'Failed to save chat session' });
        return;
      }
      res.json({ success: true, sessionId: results.insertId });
    });
  } catch (error) {
    console.error('Error parsing conversation data:', error);
    res.status(400).json({ error: 'Invalid conversation data format' });
  }
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 