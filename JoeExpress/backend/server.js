const session = require("express-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const mysql = require("mysql");
const cors = require ("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const MailGen = require('mailgen');
const axios = require('axios');
const multer = require('multer')
const path = require('path')
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const { error } = require("console");
const server = http.createServer(app);
const imap = require('imap-simple');
const { simpleParser } = require('mailparser');

const io = new Server(server);

require('dotenv').config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_PUBLIC_KEY = process.env.PAYMONGO_PUBLIC_KEY;
const db_host = process.env.DB_HOST;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASSWORD;
const db_name = process.env.DB_NAME;
const db_port = process.env.DB_PORT;

app.use(cors({
    origin:"http://localhost:3000",
    methods: ["POST","GET","DELETE"],
    credentials: true 
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
        secure:false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const config = {
    imap: {
      user: EMAIL, // Replace with your Gmail
      password: PASSWORD, // Use App Password, not Gmail password
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
      authTimeout: 3000,
    },
  };


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, '../joeexpress/public/images')
    },
    filename:(req, file, cb)=>{
        cb(null, file.fieldname + "_" + Date.now()+ path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testreact",
    multipleStatements: true
});

function generateToken() {
    return Math.random().toString(36).substr(2, 10);
}

app.get('/',(req,res)=>{
    
    if(req.session.name && req.session.role === 3){
        return res.json({valid:true, name: req.session.name, userId: req.session.userId})
    }
    else{
        return res.json({valid: false})
    }

})

app.get('/admin',(req,res)=>{
    
    if(req.session.name && req.session.role === 1){
        return res.json({
            valid:true, name: req.session.name, userId: req.session.userId, role: req.session.role
        })
    }
    else if(req.session.name && req.session.role === 2){
        return res.json({
            valid:true, name: req.session.name, userId: req.session.userId, role: req.session.role
        })
    }
    else if(req.session.name && req.session.role === 4){
        return res.json({
            valid: true, name: req.session.name, userId: req.session.userId, role: req.session.role
        })
    }
    else{
        return res.json({valid: false})
    }

}) 

app.post('/cms', (req, res) => {
    const { title } = req.body;
  
    const query = 'SELECT content FROM cms_pages WHERE title = ?';
  
    db.query(query, [title], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (results.length > 0) {
        res.json({ content: results[0].content });
      } else {
        res.status(404).json({ error: 'No content found' });
      }
    });
});
  
  app.post('/data', async (req, res) => {
    try {

        const weeklyResults = `
            SELECT 
                WEEK(order_date) AS week_number, 
                YEAR(order_date) AS year, 
                SUM(totalPrice) AS total_revenue
            FROM orders
            GROUP BY year, week_number
            ORDER BY year DESC, week_number ASC
            LIMIT 7
        `;

        db.query(weeklyResults, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Database query error' }); // Respond with an error
            }
                res.json(result);
        });


    } catch (error) {
        // console.error('Error details:', error);  // Log the error details
        res.status(500).send('Error retrieving data');
    }
});

app.post('/dataMonthly', async (req, res) => {
    try {

        const montlyResult = `
            SELECT 
                MONTH(order_date) AS Month_number, 
                YEAR(order_date) AS year, 
                SUM(totalPrice) AS total_revenue
            FROM orders
            GROUP BY year, Month_number
            ORDER BY year DESC, Month_number ASC
            LIMIT 12;
        `;

        db.query(montlyResult, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Database query error' });
            }
                res.json(result);
        });


    } catch (error) {

        res.status(500).send('Error retrieving data');
    }
});


app.get('/foods', (req,res)=>{
    
    try {
        const order = `
                   SELECT count(o.order_id) as totalOrder, 
                        f.id, f.name, f.description, f.image_url, fs.price, c.title
                    FROM foods f
                    JOIN food_sizes fs ON f.id = fs.id
                    JOIN category c ON f.category_id = c.id
                    JOIN orders_food ofd ON ofd.food_id = fs.id
                    JOIN orders o ON o.order_id = ofd.order_id
                    WHERE visible = 1
                    GROUP BY f.id, f.name, fs.size, f.description, f.image_url, fs.price
                    ORDER BY totalOrder DESC 
                    LIMIT 4;

                `
    db.query(order,(err,results)=>{
        if(err) {
        res.json({err: "error"});
        }
        res.json(results);
        
    });
    } catch (error) {
        console.log(error)
    }
       
});


app.post('/foodsSpecial', (req, res) => {

    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const order = `
                    SELECT 
                        c.title AS category_title
                    FROM category c
                    JOIN foods f ON c.id = f.category_id
                    LEFT JOIN orders_food ofd ON ofd.food_id = f.id
                    LEFT JOIN orders o ON o.order_id = ofd.order_id
                    WHERE f.visible = 1
                    AND o.customer_id = ?
                    GROUP BY c.title
                    ORDER BY COUNT(o.order_id) DESC;

    `;

    db.query(order, [userId], (err, categories) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }

        if (categories.length === 0) {
            return res.json({ success: true, categories: [], foods: [] });
        }

        // Extract category titles
        const categoryTitles = categories.map(category => category.category_title);

        // Query to get all foods for the extracted categories
        const foodQuery = `
            SELECT 
                f.name,
                c.title AS category_title,
                f.id AS food_id,
                f.description,
                f.image_url,
                MIN(fs.price) AS price
            FROM category c
            JOIN foods f ON c.id = f.category_id
            JOIN food_sizes fs ON f.id = fs.food_id
            WHERE c.title IN (?)
            AND f.visible = 1
            GROUP BY f.name, c.title, f.id, f.description, f.image_url
            ORDER BY c.title, f.name;
        `;

        db.query(foodQuery, [categoryTitles], (foodErr, foods) => {
            if (foodErr) {
                return res.status(500).json({ success: false, error: foodErr.message });
            }

            res.json({
                success: true,
                categories,
                foods
            });
        });
    });

});

app.post('/signup', async (req, res) => {
    const { pnum, name, email, password, address } = req.body;

    try {
        // Check if email already exists
        const checkQuery = 'SELECT * FROM user WHERE email = ?';
        db.query(checkQuery, [email], async (error, resultFromDb) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            if (resultFromDb.length > 0) {
                return res.status(400).json({ error: 'Email Already Taken' });
            }

            const verificationToken = generateToken();

            // Proceed to insert user into database
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO `user` (pnum, name, address, email, password, verification_token) VALUES (?, ?, ?, ?, ?, ?)';
            const values = [pnum, name, address, email, hashedPassword, verificationToken];

            db.query(insertQuery, values, (insertError, result) => {
                if (insertError) {
                    console.error('Error signing up:', insertError);
                    return res.status(500).json({ error: 'Failed to sign up' });
                }

                const userId = result.insertId;

                if (!userId) {
                    console.error('Failed to retrieve userId:', result);
                    return res.status(500).json({ error: 'Failed to retrieve userId' });
                }

                // Insert into cart table
                const cartQuery = 'INSERT INTO cart (user_id) VALUES (?)';
                db.query(cartQuery, [userId], (userError, cartResult) => {
                    if (userError) {
                        console.error('Error creating cart:', userError);
                        return res.status(500).json({ error: 'Failed to create cart' });
                    }

                    // Sending email after user creation
                    try {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            host: 'smtp.gmail.com',
                            port: 587,
                            secure: false,
                            auth: {
                                user: EMAIL,
                                pass: PASSWORD
                            }
                        });

                        const mailGenerator = new MailGen({
                            theme: 'default',
                            product: {
                                name: `Jayd's Cafe`,
                                link: 'https://mailgen.js/'
                            }
                        });

                        const response = {
                            body: {
                                name: name,
                                intro: 'YOU REGISTERED SUCCESSFULLY',
                                outro: 'PLEASE CLICK THE LINK TO CONTINUE',
                                action: {
                                    instructions: 'To complete your registration, please click the following button:',
                                    button: {
                                        color: '#22BC66',
                                        text: 'Verify your account',
                                        link: `http://localhost:3000/verify/${verificationToken}`
                                    }
                                }
                            }
                        };

                        const mail = mailGenerator.generate(response);

                        const message = {
                            from: EMAIL,
                            to: email,
                            subject: 'REGISTRATION',
                            html: mail
                        };

                        transporter.sendMail(message)
                            .then(() => {
                                // Send success response when everything is successful
                                return res.status(201).json({ success: true, msg: 'You should receive an email shortly' });
                            })
                            .catch(emailError => {
                                console.error('Email Sending Error:', emailError);
                                return res.status(500).json({ error: 'Failed to send email' });
                            });

                    } catch (emailError) {
                        console.error('Email Sending Error:', emailError);
                        return res.status(500).json({ error: 'Failed to send email' });
                    }
                });

                
            });
        });
    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({ error: 'Failed to sign up' });
    }
});
    
app.post('/addAdmin', async (req, res) => {
    const { pnum, name, email, role, password, address } = req.body;

    try {
        // Check if email already exists
        const checkQuery = 'SELECT * FROM user WHERE email = ?';
        db.query(checkQuery, [email], async (error, resultFromDb) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            if (resultFromDb.length > 0) {
                return res.status(400).json({ error: 'Email Already Taken' });
            }

            const verificationToken = generateToken();

            // Proceed to insert user into database
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO `user` (pnum, name, address, email, password, role, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?)';
            const values = [pnum, name, address, email, hashedPassword, role , verificationToken];

            db.query(insertQuery, values, (insertError, result) => {
                if (insertError) {
                    console.error('Error signing up:', insertError);
                    return res.status(500).json({ error: 'Failed to sign up' });
                }
                return res.status(201).json({ success: true});
                });
            });
        }
    catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({ error: 'Failed to sign up' });
    }
});
    

app.get('/menu', (req ,res )=>{
    const query = 
    `SELECT
        f.id,
        f.name,
        f.category_id,
        f.description,
        f.image_url,
        fs.size,
        fs.price    
    FROM
        foods f
    JOIN
        food_sizes fs ON f.id = fs.food_id
    WHERE
        visible = 1  
    GROUP BY
    f.id, f.name, f.description, f.image_url;`;

    db.query(query, (err,results)=>{
        if(err) {
      return res.json({err: "error"});
    }
        res.json(results);
    });
});


app.post('/itemGetter', (req, res) => {
    const userId = req.body.userId;

    const query = `
    SELECT
        c.id,
        c.food_id,
        f.name AS food_name,
        fs.price,
        f.image_url,
        c.size,
        c.price AS food_price,
        c.addons,
        c.quantity,
        c.sugar_level
    FROM
        cart_items c 
    JOIN foods f ON
        f.id = c.food_id
    JOIN food_sizes fs ON
        fs.food_id = f.id
    WHERE c.user_id = ? AND fs.size = c.size
    `;

    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching items from cart:', err);
            return res.status(500).json({ success: false, message: 'Failed to get items from cart' });
        }
        // Process result if needed (e.g., parse add-ons)
        res.json({ success: true, items: result });
    });
});


app.get('/items/:foodId', (req, res) => {
    const { foodId } = req.params;
  
    const query = `
      SELECT
        f.id,
        f.name,
        f.category_id,
        f.description,
        f.image_url,
        MAX(CASE WHEN fs.size = 'large' THEN fs.price END) AS Large,
        MAX(CASE WHEN fs.size = 'medium' THEN fs.price END) AS Medium
      FROM
        foods f
      JOIN
        food_sizes fs ON f.id = fs.food_id
      WHERE
        f.id = ?
      GROUP BY
        f.id, f.name, f.description, f.image_url
    `;
  
    db.query(query, [foodId], (err, results) => {
      if (err) {
        console.error('Error fetching food data:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Food not found' });
      }
  
      res.status(200).json({ success: true, data: results[0] });
    });
    
  });

app.get('/tracking/:OrdrId',(req,res)=>{

const { OrdrId } = req.params

const query = `SELECT * From orders Where order_id = ?`
db.query(query, [OrdrId], (err, results) => {
    if (err) {
        console.error('Error fetching food data:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
        }
        if (results.length > 0) {
        res.json(results[0]);
        } 
        else {
        // If no order is found, return a 404 status
        res.status(404).json({ success: false, message: 'Order not found' });
        }
})

})

app.post('/cart_items', (req, res) => {
const { foodId, size, price, addons, quantity, sugar } = req.body;
const userId = req.session.userId;

// Insert the add-ons names directly
const query = 'INSERT INTO cart_items (user_id, food_id, size, price, addons, quantity, sugar_level) VALUES (?, ?, ?, ?, ?, ?, ?)';

db.query(query, [userId, foodId, size, price, addons, quantity, sugar], (err, results) => {
    if (err) {
        console.error('Error adding item to cart:', err);
        return res.status(500).json({ success: false, message: 'Failed to add item to cart' });
    }

    res.status(200).json({ success: true, message: 'Item added to cart', results });
});
});

app.post('/update_items', (req, res) => {
    const { quantity, id } = req.body;

    const query = 'UPDATE cart_items SET quantity = ? WHERE id = ?';

    db.query(query, [quantity, id], (err, results) => {
        if (err) {
            console.error('Error adding item to cart:', err);
            return res.status(500).json({ success: false, message: 'Failed to update item to cart' });
        }
        res.status(200).json({ success: true, message: 'Quantity successfully updated', results });
    });
});

app.post('/fetchAddons', (req,res) =>{

    const {id} = req.body

    const query = 'Select * from addons where id = ?';

    db.query(query,[id], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to fetch item to addons' });
        }
        res.json(results[0]);
    });

})

app.post('/menuOption', (req, res) => {
    
  const query = `
    SELECT 
      f.id, f.name, f.description, f.image_url, fs.size, fs.price 
    FROM 
      foods f 
    JOIN 
      food_sizes fs ON f.id = fs.food_id 
    WHERE 
      fs.size = ?
      f.visible = 1;
    GROUP BY 
      f.id, f.name, f.description, f.image_url;
  `;
  
    connection.query(query,[req.body.getSize], (error, results) => {
      if (error) {
        console.error('Database query error:', error);
        return res.status(500).json({ error: 'Database query error' });
      }
      res.json(results);
    });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM user WHERE email = ?';

  db.query(sql, [email], async (err, data) => {
    
    if (err) {
      console.error("Error in database query:", err);
      return res.status(500).json({ error: "Database error." });
    }

    // Check if the email exists
    if (data.length === 0) {
      return res.json({ Login: false, Message: "Email does not exist." });
    }

    const userData = data[0];

    // Verify password
    const isMatch = await bcrypt.compare(password, userData.password);
    
    if (isMatch) {
      // Check if user role is 3 and set session variables if applicable
      if (userData.role === 3) {
        req.session.userId = userData.id;
        req.session.name = userData.name;
        req.session.role = 3;
        return res.json({ Login: true });
      } else {
        return res.status(403).json({ error: "Unauthorized role." });
      }
    } else {
      // If password is incorrect
      return res.json({ Login: false, Message: "Wrong password." });
    }
  });
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ success: false, message: 'Logout failed!' });
        }
        res.clearCookie('connect.sid');
        return res.json({ success: true, message: 'Logout successful!' });
    });
});

app.get('/verify/:token', (req, res) => {
    const token = req.params.token;

    const sql = 'SELECT * FROM user WHERE verification_token = ?';

    db.query(sql, [token], (err, results) => {
        
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(500).json({ error: 'Failed to verify token' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Invalid verification token' });
        }

        const userId = results[0].id;
        const updateSql = 'UPDATE user SET verified = ? WHERE id = ?';
        
        db.query(updateSql, ['true', userId], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating user verification status:', updateErr);
                return res.status(500).json({ error: 'Failed to update verification status' });
            }

            return res.status(200).json({ message: 'Email verified successfully' });
        });
    });
});

app.post('/order', (req, res) => {
    const { userId, amount, deliveryMethod, deliveryAddress ,paymentMethod , code } = req.body;

    let finalAmount = amount;

    const processOrder = () => {

        const query = `
            INSERT INTO orders (customer_id, deliveryMethod, paymentMethod, totalPrice, status, delivery_address) 
            VALUES (?, ?, ?, ? ,'unpaid', ?);
            SELECT LAST_INSERT_ID() as lastOrderId;
        `;

        db.query(query, [userId, deliveryMethod, paymentMethod, finalAmount, deliveryAddress], (err, resInInserting) => {
            if (err) {
                return res.json({ success: false, err: "Error inserting order" });
            }

            const lastOrderId = resInInserting[1][0].lastOrderId;

            // Insert into orders_food with addons
            const gettingOrder = `
                INSERT INTO orders_food (order_id, food_id, quantity, addons, size, sugar_level)
                SELECT ?, food_id, quantity, addons, size, sugar_level
                FROM cart_items
                WHERE user_id = ?;
            `;

            db.query(gettingOrder, [lastOrderId, userId], (err, resInGettingOrder) => {
                if (err) {
                    return res.json({ err: "Error inserting order_food" });
                }

                // Delete from cart_items after order is placed
                const remove = `DELETE FROM cart_items WHERE user_id = ?`;
                db.query(remove, [userId], (errInRemove, resInRemove) => {
                    if (errInRemove) {
                        return res.json({ err: "Error removing items from cart" });
                    }

                    return res.json({ success: true, lastOrderId });
                });
            });
        });
    };

    if (code) {

        const discountQuery = `
            SELECT * 
            FROM discount_codes 
            WHERE code = ? 
            AND is_active = 1
            AND valid_from <= NOW() 
            AND valid_until >= NOW();
        `;

        db.query(discountQuery, [code], (err, discountResults) => {
            if (err) {
                return res.json({ success: false, err: "Error validating discount code" });
            }

            if (discountResults.length === 0) {
                // Invalid or expired discount code
                return res.json({ success: false, err: "Invalid or expired discount code" });

            }

            // Apply the discount
            const discount = discountResults[0];
            const discountAmount = discount.discount_type === 'percentage'
                ? (amount * discount.discount_value) / 100
                : discount.discount_value;

            // Calculate the final amount after discount
            finalAmount = Math.max(0, amount - discountAmount); 

            // Update the times_used for the discount code
            const updateUsage = `
                UPDATE discount_codes 
                SET times_used = times_used + 1
                WHERE id = ?;
            `;

            db.query(updateUsage, [discount.id], (err) => {
                if (err) {
                    return res.json({ success: false, err: "Error updating discount code usage" });
                }

                processOrder();
            });
        });
    } else {
        processOrder();
    }
});

app.post('/removeCartItems', (req,res)=>{
    
    const {id} = req.body

    const query = 
    `Delete from cart_items where id = ?`;


    db.query(query, [id], (err, results)=>{
        if(err){
            return res.json({ err: "Error removing items from cart" });
        }
        res.json({success: true})

    })


})

// Webhook route to handle payment success
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    const event = req.body;

    // Function to fetch the list of webhooks
    const getWebhooks = async () => {
        const options = {
            method: 'GET',
            url: 'https:/api.paymongo.com/v1/webhooks',
            headers: {
                accept: 'application/json',
                authorization: 'Basic c2tfdGVzdF81NXhIV1JVRFI3UXoxOTZicHNBZTFCREw6' // Replace with actual credentials
            }
        };

        try {
            const response = await axios.request(options);
            console.log('Fetched webhooks:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching webhooks:', error);
            return null;
        }
    };

    // First, check if the webhook event is a valid one by fetching all registered webhooks
    getWebhooks().then((webhooks) => {
        if (!webhooks) {
            return res.status(500).json({ success: false, message: 'Failed to verify webhook.' });
        }

        // Now process the incoming webhook event
        if (event.type === 'payment_intent.succeeded') {
            const paymentIntent = event.data;
            const { metadata } = paymentIntent.attributes;

            const { userId } = metadata;

            // Amount is in cents, convert it back to PHP
            const totalBill = paymentIntent.attributes.amount / 100;

            const orderData = {
                userId: userId,
                amount: totalBill,
            };

            // Call the /order route to place the order
            axios.post('http://localhost:3000/order', orderData)
                .then(() => {
                    res.status(200).json({ success: true, message: 'Order placed successfully after payment.' });
                })
                .catch(err => {
                    console.error('Error placing order after payment:', err);
                    res.status(500).json({ success: false, message: 'Error placing order after payment' });
                });
        } else {
            // If event type is not handled, log the event and respond with 400
            console.log('Unhandled event type:', event.type);
            res.status(400).send('Webhook event not handled');
        }
    });
});
  
app.post('/create-payment-intent/:id', async (req, res) => {
    const { amount, description, userId } = req.body;
    const orderId = req.params.id;

    try {
        // Create payment intent
        const paymentIntentResponse = await axios.post(
            'https:/api.paymongo.com/v1/payment_intents',
            {
                data: {
                    attributes: {
                        amount: amount * 100, // Amount in cents
                        payment_method_allowed: ['gcash'], // Allowed payment methods
                        currency: 'PHP', // Currency
                        description: description, // Payment description
                        metadata: {
                            userId: userId.toString(), // User ID in metadata
                            OrderId: orderId.toString() // Use the orderId from params
                        },
                    },
                },
            },
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const paymentIntentId = paymentIntentResponse.data.data.id;

        // Create a source for the payment
        const checkoutResponse = await axios.post(
            'https:/api.paymongo.com/v1/sources',
            {
                data: {
                    attributes: {
                        amount: amount * 100, // Amount in cents
                        redirect: {
                            success: `http://localhost:3000/paymentSuccess/${orderId}`, // Use the orderId from params
                            failed: 'http://localhost:3000/checkout', // Redirect on failure
                        },
                        type: 'gcash', // Payment type
                        currency: 'PHP', // Currency
                    },
                },
            },
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(PAYMONGO_SECRET_KEY).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Respond with checkout URL and payment intent ID
        res.json({
            checkoutUrl: checkoutResponse.data.data.attributes.redirect.checkout_url,
            paymentIntentId,
            OrderId: orderId // Return the OrderId
        });
    } catch (error) {
        console.error('Error creating payment intent or checkout:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create payment intent or checkout' });
    }
});

app.post('/create-payment-flow', async (req, res) => {
    try {
      const { phone, amount, description, orderId } = req.body;
  
      // Step 1: Create Payment Method
      const paymentMethodId = await createPaymentMethod(phone);
  
      // Step 2: Create Payment Intent
      const paymentIntentId = await createPaymentIntent(amount, description);
  
      // Step 3: Attach Payment Method
      const redirectUrl = await attachPaymentMethod(
        paymentIntentId,
        paymentMethodId,
        `http://localhost:3000/paymentSuccess/${orderId}`
      );
  
      // Return redirect URL to the frontend
      res.json({ success: true, redirectUrl });
    } catch (error) {
      console.error('Error creating payment flow:', error.response?.data || error.message);
      res.status(500).json({ success: false, message: 'Failed to create payment flow' });
    }
  });

app.post('/check-payment-status', async (req, res) => {
    const { paymentIntentId } = req.body; // Or use req.query if preferred
  
    if (!paymentIntentId) {
      return res.status(400).json({ success: false, message: 'PaymentIntentId is required' });
    }
  
    try {
      const response = await axios.get(
        `https://api.paymongo.com/v1/payment_intents/${paymentIntentId}`,
        {
          headers: {
            Authorization: `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
          },
        }
      );
  
      const status = response.data.data.attributes.status;
  
      return res.json({ success: true, status });
    } catch (error) {
      console.error('Error checking payment intent status:', error.response?.data || error.message);
      return res.status(500).json({
        success: false,
        message: 'Failed to check payment status',
      });
    }
  });

const createPaymentMethod = async (phone) => {
const response = await axios.post(
    'https://api.paymongo.com/v1/payment_methods',
    {
    data: {
        attributes: {
        type: 'gcash',
        details: { phone },
        },
    },
    },
    {
    headers: {
        Authorization: `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
    },
    }
);
return response.data.data.id; // Return the Payment Method ID
};

const createPaymentIntent = async (amount, description) => {
    const response = await axios.post(
      'https://api.paymongo.com/v1/payment_intents',
      {
        data: {
          attributes: {
            amount: amount * 100,
            currency: 'PHP',
            description,
            payment_method_allowed: ['gcash'], // Allowed payment methods
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
        },
      }
    );
    return response.data.data.id; // Return the Payment Intent ID
};

const attachPaymentMethod = async (paymentIntentId, paymentMethodId, returnUrl) => {
    const response = await axios.post(
      `https://api.paymongo.com/v1/payment_intents/${paymentIntentId}/attach`,
      {
        data: {
          attributes: {
            payment_method: paymentMethodId,
            return_url: returnUrl,
          },
        },
      },
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
        },
      }
    );
  
    // Extract redirect URL
    const redirectUrl = response.data.data.attributes.next_action.redirect.url;
    return redirectUrl;
};



app.post('/setTopaid', async (req, res) => {
    const { OrderId, userId, paymentIntentId } = req.body;
    // const { paymentIntentId } = req.query;

    // Validate request body
    if (!OrderId || !userId || !paymentIntentId) {
        return res.status(400).json({ error: "OrderId, userId, and paymentIntentId are required" });
    }

    try {
        // Step 1: Check Payment Status
        const response = await axios.get(
            `https://api.paymongo.com/v1/payment_intents/${paymentIntentId}`,
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
                },
            }
        );

        const paymentStatus = response.data.data.attributes.status;
        console.log(paymentStatus);

        // Step 2: Validate Payment Status
        if (paymentStatus !== 'succeeded') {
            return res.status(400).json({
                error: "Payment is not completed. Current status: " + paymentStatus,
            });
        }

        // Step 3: Update Order Status in Database
        const query = `UPDATE orders SET status = 'paid' WHERE order_id = ? AND customer_id = ? AND paymentMethod = 'gcash'`;

        db.query(query, [OrderId, userId], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: "Internal server error while updating order" });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ error: "Order not found or mismatched userId" });
            }

            // Success Response
            res.json({success: true, message: "Order status updated to 'paid'" });
        });

    } catch (error) {
        console.error('Error verifying payment status:', error.response?.data || error.message);
        res.status(500).json({
            error: "Failed to verify payment status with PayMongo",
        });
    }
});

app.post('/updateAcc', async (req, res) => {
    const { id, name, email, password, address } = req.body;

    const query = `
    UPDATE user
    SET name = ?,
        email = ?,
        password = ?,
        address = ?
    WHERE id = ?`;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const values = [name, email, hashedPassword, address, id];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to update user info' });
            }
            res.status(200).json({success: true , message: 'User info updated successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// ADMIN
// dashboard

app.post('/adminlogin',async (req, res) => {

    const {email,password} = req.body

    const sql = 'SELECT * FROM user WHERE email = ?';

    db.query(sql, [email, password], (err, data) => {
        const isMatch = bcrypt.compare(req.body.password,data[0].password);
        if (err) {
            return res.json("Error");
        }
        
        if (data.length == 0) {
            return res.json({ Login: false, Message: "NO RECORD EXISTED" });
        } 
        
        const userData = data[0];
        
        if (isMatch && data[0].role === 1){
            req.session.userId = userData.id;
            const name = data[0].name;
            req.session.name = name;
            req.session.role = 1;          
            return res.json({ Login: 1 });
        }

        else if (isMatch && data[0].role === 2){
            req.session.userId = userData.id;
            const name = data[0].name;
            req.session.name = name;
            req.session.role = 2;          
            return res.json({ Login: 2 });
        }
        
        else if (isMatch && data[0].role === 4){
            req.session.userId = userData.id;
            const name = data[0].name;
            req.session.name = name;
            req.session.role = 4;          
            return res.json({ Login: 4});
        }

        else{
            res.send("Wrong Password");
             return
        }

    });
});

app.post('/updateOrders', async (req,res)=>{

    const {order_id, status, riderId} = req.body

    const query = 
    `
    Update orders 
    SET status = ?,
    rider_id = ?
    WHERE order_id = ?

    `
    db.query(query, [status, riderId, order_id ], (error, result) => {

        if(error){
            return res.status(500).json({ error: 'Database error' });
        }
        
      })

})


app.post('/adminTable', async (req,res) => {

    const query = 
                                `SELECT 
                        f.image_url, 
                        f.id, 
                        f.name,
                        c.title, 
                        f.description, 
                        fs.price,
                        fs.size,
                        COUNT(DISTINCT ofood.id) AS sold, 
                        (fs.price * COUNT(DISTINCT ofood.id)) AS profit
                    FROM 
                        foods f
                    JOIN 
                        food_sizes fs ON f.id = fs.food_id
                    JOIN
                        category c ON f.category_id = c.id
                    JOIN
                        orders_food ofood ON f.id = ofood.food_id
                    JOIN
                        orders o ON ofood.order_id = o.order_id
                    GROUP BY 
                        f.id, f.name, f.description, f.image_url, c.title, fs.price, fs.size;
                    `

      db.query(query,(error, result) => {
        if(error){
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result)

      })
})

app.post('/roleSetup', (req,res)=>{

    const query = `SELECT * from role`

    db.query(query,(err,result)=>{

        if(err){
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json(result)

    })

})

app.post('/adminsignup', async (req, res) => {
    
    const { fullname, email, password } = req.body;

    try {
        // Check if email already exists
        const checkQuery = `SELECT * FROM user WHERE email = ? `;
        
        db.query(checkQuery, [email], async (error, resultFromDb) => {
            
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            if (resultFromDb.length > 0) {
                return res.status(400).json({ error: 'Email Already Taken' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = `INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, 1)`;
            const values = [fullname, email, hashedPassword];

            db.query(insertQuery, values, (insertError, result) => {
                if (insertError) {
                    console.error('Error signing up:', insertError);
                    return res.status(500).json({ error: 'Failed to sign up' });
                }
                console.log('Admin signed up successfully:', result); 
                res.status(200).json({success:true})

        });
    });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Failed to sign up' });
    }
});

app.post('/fetchUserData', (req,res)=>{

    const query = `SELECT 
                        user.id, 
                        user.name, 
                        user.email,
                        user.role as role_id, 
                        role.title as role
                    FROM 
                        user 
                    JOIN 
                        role 
                    ON 
                        user.role = role.id 
                    WHERE 
                        user.role IN (1, 2, 4);
`
    db.query(query,(err,result) => {
        
        if(err){
           return res.json({err: "Unable to fetch user data to admin management"});
        }
        res.json(result)

    })

})

app.post('/fetchSpecificUserData', (req, res) => {
    const { id } = req.body;

    const query =

    `SELECT id, name, email, address 
    FROM user
    WHERE id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error("Error fetching user data:", err);
            return res.status(500).json({ error: "Unable to fetch user data" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(result[0]);
    });
});

app.post('/deleteUserData',(req,res)=>{

    const {id} = req.body;

    const query = `DELETE FROM cart WHERE user_id = ?`

    db.query(query,[id],(irror,result)=>{
        if(irror){
            result.json({irror: "Unable to delete from cart"})
        }
        
        const deleteQuery = `DELETE FROM user WHERE id = ? `
        
        db.query(deleteQuery,[id], (deleteErr, deleteRes)=> {
            if(deleteErr){
                deleteRes.json({err: "Unable to delete user"})
            }
            res.json({Sucess:true})
            
        })

    })

})


app.post('/productResult', (req,res)=>{
    
    const query = ` SELECT 
                    f.id,
                    f.name,
                    f.description,
                    f.image_url,
                    f.category_id,
                    f.visible,
                    fs_medium.price AS medprice,
                    fs_medium.size as medsize,
                    fs_large.price AS lgprice,
                    fs_large.size as lgsize,
                    c.title
                FROM 
                    foods f
                JOIN 
                    category c 
                    ON f.category_id = c.id
                
                LEFT JOIN 
                    food_sizes fs_medium 
                    ON f.id = fs_medium.food_id AND fs_medium.size = 'medium'
                LEFT JOIN 
                    food_sizes fs_large 
                    ON f.id = fs_large.food_id AND fs_large.size = 'large'
                
                    `
    db.query(query,(err,result) =>{
        if(err){
           return res.json({err: "Unable to fetch foods to product management"});
        }
        res.json(result)

    })

})

app.post('/fetchAddons', (req,res) =>{

    const query = 'Select * from addons';

    db.query(query,(err,result) =>{
        if(err){
           return res.json({err: "Unable to fetch addons to product management"});
        }
        res.json(result)

    })

})


app.post('/addProduct', upload.single('image_url') , (req, res) =>{

    const { name, description, category_id, sizeName , price } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : '/images/americano.png';

    const query = `INSERT INTO foods (name, description, image_url, category_id) 
                   VALUES (?,?,?,?);
                   SELECT LAST_INSERT_ID() as lastfoodsId`
    

    db.query(query, [name, description, image_url, category_id], (err,result) =>{
        if(err){
           return res.json({err: "Unable to add into foods"});
        }

        const lastfoodsId = result[1][0].lastfoodsId;
        const medSizeQuery = `INSERT INTO food_sizes(food_id, size , price) 
                            VALUES (?,?,?)`

        db.query(medSizeQuery, [lastfoodsId, sizeName, price], (sizeErr, sizeResult) => {
            if (sizeErr) {
                return res.status(500).json({ sizeErr: "Unable to add into food_sizes" });
            }
        
            res.status(200).json({ message: "Successfully added size to food_sizes" });
        });


    })

})





app.post('/addSize',(req,res)=>{
    
    const {id,size,price} = req.body;

    const query = 
    `
    INSERT INTO food_sizes (food_id, size, price)
    VALUES (?, ? ,?)

    `
    db.query(query, [id, size ,price], (err, result)=> {
        if(err){
           return res.json({err: "Unable to add into food_sizes"});
        }
        
    })

})



app.post('/removeProduct',  async (req, res) =>{

    const {id} = req.body;

    let foodId;

    const rows = db.query(`Select id from foods where id = ?;`, [id], (error,result)=>{
        if(error){
           return res.json({error: "Unable to Select Id into foods"});
        }

        foodId = rows[0];

        if (rows.length === 0) {
            return res.json({ error: 'Food item not found' });
        }
    });
    
    try{
        const query = `Delete from foods where id = ? `
        await db.query (query,[id], (err,result) =>{
            if(err){
               return res.json({err: "Unable to delete into foods"});
            }
    
            const sizeQuery = `Delete from food_sizes where id = ?`
    
            db.query(sizeQuery, [foodId], (sizeDelErr, sizeResult)=> {
                if(sizeDelErr){
                    return res.json({sizeDelErr: "Unable to delete into food_sizes"});
                }
                res.json({success: true})
                
            })

            
    
        })
    }catch(error){
        res.json(error)
    }

    })

    app.post('/removeAddons',(req,res)=>{
        const {id} = req.body

        const query = `Delete from addons where id = ?`

        db.query(query, [id], (err, result)=> {
            if(err){
                return res.json({err: "Unable to delete into addons"});
            }
        })
        res.json({Success:true})
    })
    
    app.post('/removeCategory',(req,res)=>{
        const {id} = req.body

        const query = `Delete from Category where id = ?`

        db.query(query, [id], (err, result)=> {
            if(err){
                return res.json({err: "Unable to delete into addons"});
            }
            res.json({success: true})
            
        })
    })

    app.post('/fetchProduct',(req,res) =>{
        const {id} = req.body

        const query = 
        `SELECT 
            f.name,
            f.description,
            f.image_url,
            f.category_id,
            fs_medium.price AS medprice,
            fs_large.price AS lgprice
        FROM 
            foods f
        JOIN 
            food_sizes fs_medium 
            ON f.id = fs_medium.food_id AND fs_medium.size = 'medium'
        LEFT JOIN 
            food_sizes fs_large 
            ON f.id = fs_large.food_id AND fs_large.size = 'large'
        WHERE 
            f.id = ?;
            
        `

        db.query(query,[id],(err,result)=>{
            if (err){
                return res.json({err: "Unable to fetch food and food_sizes"});
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "food not found" });
            }

            res.json(result[0]);
           
        })

    })

    app.post('/updateProduct', upload.single('image_url') ,(req,res) => {

        const {name ,description ,category_id , foodId } = req.body;
        const image_url = req.file ? `/images/${req.file.filename}` : null;
        const sizes = JSON.parse(req.body.sizes);
        const query = 
        `
        UPDATE foods
        SET name = ?, 
            description = ?, 
            image_url = ?, 
            category_id = ?
            WHERE id = ?
        `;

        db.query (query,[name ,description ,image_url ,category_id, foodId], (err,result) => {
            if (err){
                return res.json({err: "Unable to update into food and food_sizes"});
            }

            let sizeQuery = `
            UPDATE food_sizes
            SET price = ?
            WHERE food_id = ? AND size = ?
            `;

            const sizePromises = sizes.map(({ size, price }) => {
                return new Promise((resolve, reject) => {
                    db.query(sizeQuery, [price, foodId, size], (sizeErr, sizeRes) => {
                        if (sizeErr) {
                            reject(sizeErr);
                        } else {
                            resolve(sizeRes);
                        }
                    });
                });
            });
    
            Promise.all(sizePromises)
                .then(() => {
                    res.json({ success: true });
                })
                .catch((updateErr) => {
                    return res.json({ err: "Unable to update sizes", details: updateErr });
                });
         
        })
 
    })
        
    app.post('/updateAddons', (req, res) => {
        const { name, price, AddonsId } = req.body;
    
        const query = `
            UPDATE addons
            SET name = ?, 
                price = ? 
            WHERE id = ?
        `;
    
        db.query(query, [name, price, AddonsId], (err, result) => {
            if (err) {
                console.error('Database error:', err); // Log the error for debugging
                return res.status(500).json({ err: "Unable to update into Addons" });
            }
            res.json({ success: true });
        });
    });


    app.post('/setAddonsVisibility',(req,res)=>{
        const {id} = req.body
        
        const query = `Update addons set visible = !visible where id = ?`

        db.query(query, [id], (err, result) => {
            if (err) {
                console.error('Database error:', err); // Log the error for debugging
                return res.status(500).json({ err: "Unable to update into Addons" });
            }

            res.json({ success: true });
        });

    })
    
        
    app.post('/updateCategory' , (req,res) => {

    const { title, id  } = req.body;

    const query = 
    `
    Update category
    SET title = ?, 

    WHERE 
    id = ?
    `

    db.query (query,[title, id], (err,result) => {
        if (err){
            return res.json({err: "Unable to update into category"});
        }
        res.json({success: true})
        
    })

    })

    app.post('/users', (req, res) => {
        const query = `SELECT COUNT(DISTINCT customer_id) AS customer_count FROM orders;`;
        
        try {
            db.query(query, (err, result) => {
                if (err) {
                    return res.json({err: "error"});
                }
                
                res.json(result[0]);
            });
        } catch (error) {
            return res.json({ error: 'Failed to fetch user count' });
        }
    });
    
    app.post('/totalRevenue', (req,res) =>{
        const query = `SELECT SUM(totalPrice) AS total_revenue FROM orders`;
    
        db.query(query,(err,result)=>{
            if(err){
                return res.json({err: "error"});
            }
            res.json(result[0]);
        })
        
    });
    
    app.post('/totalOrder', (req,res)=>{
        const query = `SELECT Count(*) as totalOrders FROM orders`;

        db.query(query,(err,result)=>{
            if(err){
                res.json({err: "error"});
            }

            res.json(result[0]);
            
        })
    });

    app.post('/ridertotalOrder', (req,res)=>{

        const {userId} = req.body

        const query = `SELECT Count(*) as totalOrders FROM orders Where rider_id = ?`;

        db.query(query,[userId],(err,result)=>{
            if(err){
               return  res.json({err: "error"});
            }

            res.json(result[0]);
            
        })
    }); 
    
    app.post('/ridertotalOrder', (req,res)=>{

        const {userId} = req.body

        const query = `SELECT Count(*) as totalOrders FROM orders Where rider_id = ?`;

        db.query(query,[userId],(err,result)=>{
            if(err){
               return res.json({err: "error"});
            }

            res.json(result[0]);
            
        })
    });

    app.post('/weeklyridertotalOrder', (req,res)=>{
        
        const {userId} = req.body

        const query = `SELECT COUNT(*) as totalOrders 
                   FROM orders 
                   WHERE rider_id = ? 
                   AND update_order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND status = 'completed' `;

        db.query(query,[userId],(err,result)=>{
            if(err){
               return res.json({err: "error"});
            }

            res.json(result[0]);
            
        })
    });

    app.post('/pendingRiderOrder', (req,res)=>{
        const {userId} = req.body;

        const query = `SELECT * FROM orders 
                       WHERE rider_id = ? `

        db.query(query,[userId],(err,result)=>{
            if(err){
               return res.json({err: "error"});
            }
            res.json(result[0]);
            
        })
    })

    
    
    app.post('/recentorder', async (req,res)=>{
        const query = 'SELECT id, user_id, food_id, quantity, total_price, order_date FROM orders ORDER BY order_date DESC LIMIT 10;';
            
            try{
                db.query(query,(err,result)=>{
                    if(err){
                       return res.json({err: "error"});
                    }
                    const recentOrder = result.totalOrder;
                    res.json({recentOrder});
                })
            }catch(error){
               return res.json({error: "Failed to fetch Recent Orders"});
            }
        });

    app.post('/addCategory', upload.single('image_url'), (req,res)=>{
        const {title} = req.body;
        const image_url = req.file ? req.file.filename : null;

        const query = 
        `INSERT INTO category (title)
        VALUES(?)`

        db.query(query,[title,image_url],(err,result)=>{
            if(err){
               return res.json({err:"ERROR"});
            }
            res.json({success: true})
        })

    })

    // app.post('/deleteCategory',(req,res)=>{
    //     const {id} = req.body;

    //     const query = 
    //     `DELETE FROM category WHERE id = ? `

    //     db.query(query, [id] ,(err,result)=>{
    //         if(err){
    //             res.json({err:"ERROR"});
    //         }
    
    //     })   

    // })

    app.post('/addAddress', (req,res)=>{

        const {second_address, userId} = req.body

        const query = `Update user set secondary_address = ? where id = ?`

        db.query(query,[second_address, userId], (err,result)=>{
            if(err){
               return res.json({err:"ERROR"});
            }
            res.json({success: true})
                
        })
    })
    
    app.post('/editSecondaryAddress', (req,res)=>{

        const {newAddress, userId} = req.body

        const query = `Update user set secondary_address = ? where id = ?`

        db.query(query,[newAddress, userId], (err,result)=>{
            if(err){
               return res.json({err:"ERROR"});
            }
            res.json({success: true})
                
        })
    })

    app.post('/editAddress', (req,res)=>{

        const {newAddress, userId} = req.body

        const query = `Update user set address = ? where id = ?`

        db.query(query,[newAddress, userId], (err,result)=>{
            if(err){
               return res.json({err:"ERROR"});
            }
            res.json({success: true})

        })

    })

    app.post('/fetchCategory', (req,res)=>{
        const query = "Select * from category"
            
            db.query(query, (err,result)=>{
                if(err){
                 return res.json({err:"ERROR"});
                }
                res.json(result)

            })
        
    })

    app.post('/addAddons',(req,res)=>{

        const {name, price, category_id} = req.body.values;
        
        const query = `Insert into addons (name, price, category_id) VALUES
        (?, ?, ?)`

        db.query(query, [name, price, category_id] ,(err, result) => {
            
            if(err){
               return res.json({err:"ERROR"});
            }
            res.json({Success: true})
             
        })

    })

    app.post('/cms_backend', (req, res) => {
        const { title } = req.body;
      
        const query = 'SELECT * FROM cms_pages order by category desc';
      
        db.query(query, [title], (err, results) => {

          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }

          res.json(results);
          
        });
      });

      app.post('/cms_specific', (req, res) => {

        const { id } = req.body;

        const query =   `
                        SELECT *
                        FROM cms_pages
                        WHERE id = ?
                        `;

                db.query(query, [id], (err, result) => {
                    if (err) {
                        console.error("Error fetching cms data:", err);
                        return res.status(500).json({ error: "Unable to fetch cms data" });
                    }

                    if (result.length === 0) {
                        return res.status(404).json({ error: "User not found" });
                    }

                    res.json(result[0]);
                });

      });


    app.post('/editCms', upload.single('content'), (req, res) =>{

        const { id } = req.body;
        let content = req.body.content;

        if (req.file) {
            content = `/images/${req.file.filename}`;
        }

        const query = 
        `
        UPDATE cms_pages
        SET
        content = ?
        WHERE id = ?
        `
        db.query(query, [content, id], (err, results) => {

            if (err) {
              console.error('Database error:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
            
          });

    })

    app.post('/hideProduct',(req, res) =>{
        
        const {id} = req.body;

        const query = `UPDATE foods SET visible = NOT visible where id = ?`

        db.query(query, [id], (err, result) => {
            if (err) {
                console.error('Error updating visibility:', err);
                return res.status(500).json({ error: 'Failed to update visibility' });
            }
    
            res.json({success: true, message: 'Visibility updated successfully' });
        });

    })

    app.post('/orderTracking', (req,res) =>{

        const query = 
                    `SELECT 
                o.order_id, 
                u.name,
                u.address,
                u.pnum,
                o.customer_id, 
                o.order_date, 
                o.deliveryMethod,
                o.status,
                o.totalPrice, 
                GROUP_CONCAT(
                    CONCAT('Food Name: ',
                        f.name, ' ( Size: ', 
                        ofd.size, ', Quantity: ', 
                        ofd.quantity, ', Addons: ', 
                        IFNULL(ofd.addons, ''), ')'
                    ) ORDER BY f.name SEPARATOR ', '
                ) AS food_details
            FROM 
                orders o
            JOIN 
                orders_food ofd ON ofd.order_id = o.order_id
            JOIN 
                foods f ON f.id = ofd.food_id
            JOIN 
                user u ON u.id = o.customer_id
            WHERE o.status IN ('on process', 'paid', 'order ready')
            GROUP BY 
                o.order_id, 
                u.name,
                u.address,
                u.pnum,
                o.customer_id, 
                o.order_date, 
                o.status,
                o.deliveryMethod
            ORDER BY 
                o.order_date DESC;
            `

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get orders' });
            }
            res.json(result)
        });

    })
     
    app.post('/orderHistory', (req,res) =>{

        const query = 
        `
                    SELECT 
                o.order_id, 
                u.name,
                u.address,
                o.customer_id, 
                o.order_date,
                o.update_order_date, 
                o.status,
                o.deliveryMethod,
                o.totalPrice, 
                GROUP_CONCAT(
                    CONCAT('Food Name: ',
                        f.name, ' ( Size: ', 
                        ofd.size, ', Quantity: ', 
                        ofd.quantity, ', Addons: ', 
                        IFNULL(ofd.addons, ''), ')'
                    ) ORDER BY f.name SEPARATOR ', '
                ) AS food_details
            FROM 
                orders o
            JOIN 
                orders_food ofd ON ofd.order_id = o.order_id
            JOIN 
                foods f ON f.id = ofd.food_id
            JOIN 
                user u ON u.id = o.customer_id
            WHERE o.status IN ('completed', 'cancelled', 'on delivery', 'pending rider')
            GROUP BY 
                o.order_id, 
                u.name,
                u.address,
                o.customer_id, 
                o.order_date,
                o.update_order_date, 
                o.status,
                o.deliveryMethod
            ORDER BY 
                o.update_order_date DESC;

             
        `

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get orders' });
            }
            res.json(result)
        });

    })

    app.post('/riderOrderHistory', (req,res) =>{

        const {userId} = req.body

        const query = 
        `
                SELECT 
            o.order_id, 
            u.name,
            u.address,
            o.customer_id, 
            o.order_date,
            o.update_order_date, 
            o.status,
            o.totalPrice,
            o.rider_id,
            GROUP_CONCAT(
                CONCAT('Food Name: ',
                    f.name, ' ( Size: ', 
                    ofd.size, ', Quantity: ', 
                    ofd.quantity, ', Addons: ', 
                    IFNULL(ofd.addons, ''), ')'
                ) ORDER BY f.name SEPARATOR ', '
            ) AS food_details
        FROM 
            orders o
        JOIN 
            orders_food ofd ON ofd.order_id = o.order_id
        JOIN 
            foods f ON f.id = ofd.food_id
        JOIN 
            user u ON u.id = o.customer_id
        WHERE o.status IN ('completed', 'cancelled' , 'on delivery' , 'pending rider') AND o.rider_id = ?
        GROUP BY 
            o.order_id, 
            u.name,
            u.address,
            o.customer_id, 
            o.order_date,
            o.update_order_date, 
            o.status,
            o.rider_id
        ORDER BY 
            o.update_order_date DESC;

             
        `

        db.query(query, [userId] , (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get orders' });
            }
            res.json(result)
        });

    })

    app.post('/cancelOrder',(req,res)=>{
        const {order_id} = req.body

        const query = `Update orders 
        SET status = 'cancelled'
        WHERE order_id = ?`

        db.query(query, [order_id], (error, result) => {
    
            if(error){
                return res.status(500).json({ error: 'Database error' });
            }
            res.json({success: true})
            
          })
    })

    app.post('/updateOrders', async (req,res)=>{

        const {order_id, status} = req.body
    
        const query = 
        `
        Update orders 
        SET status = ?
        WHERE order_id = ?
    
        `
        db.query(query, [status, order_id], (error, result) => {
    
            if(error){
                return res.status(500).json({ error: 'Database error' });
            }
            
          })
    
    
    })
    
    
    app.post('/personalOrder', (req,res) =>{
        
        const {userId} = req.body

        const query = 
                    `
                    SELECT 
    o.order_id,
    u.id, 
    u.name,
    u.address,
    u.pnum,
    o.customer_id, 
    o.order_date, 
    o.deliveryMethod,
    o.status,
    o.totalPrice, 
    GROUP_CONCAT(
        CONCAT('Food Name: ',
            f.name, ' ( Size: ', 
            ofd.size, ', Quantity: ', 
            ofd.quantity, ', Addons: ', 
            IFNULL(ofd.addons, ''), ')'
        ) ORDER BY f.name SEPARATOR ', '
    ) AS food_details
FROM 
    orders o
JOIN 
    orders_food ofd ON ofd.order_id = o.order_id
JOIN 
    foods f ON f.id = ofd.food_id
JOIN 
    user u ON u.id = o.customer_id
WHERE u.id = ?
GROUP BY 
    o.order_id, 
    u.name,
    u.address,
    u.pnum,
    o.customer_id, 
    o.order_date, 
    o.status
ORDER BY 
    o.order_date ASC;

                        
                    `

        db.query(query,[userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get orders' });
            }
            res.json(result)
        });

    })
    
    
    app.post('/updatePersonalInfo', (req,res) =>{
        
        const {pnum, fullName} = req.body.value;
        const {userId} = req.body;

        const query = `update user set name = ? , pnum = ? where id = ?`               

        db.query(query,[fullName,pnum,userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get orders' });
            }
            res.json({success:true})
        });

    })
    
        
    app.post('/updateAdminInfo', async (req, res) => {
        try {
            const { fullName, email, password } = req.body.value;
            const { userId } = req.body;
            
            let query;
            let queryParams;
            
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                query = `UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?`;
                queryParams = [fullName, email, hashedPassword, userId];
            } else {
                query = `UPDATE user SET name = ?, email = ? WHERE id = ?`;
                queryParams = [fullName, email, userId];
            }

            db.query(query, queryParams, (err, result) => {
                if (err) {
                    console.error('Error updating admin info:', err);
                    return res.status(500).json({ error: 'Failed to update admin info' });
                }
                res.json({ success: true });
            });
        } catch (error) {
            console.error('Error in updating admin info:', error);
            res.status(500).json({ error: 'Failed to update admin info' });
        }
    });


    app.post('/profile',(req,res) =>{

        const {userId} = req.body

        const query = 
        ` SELECT 
                u.id, 
                u.name, 
                u.email, 
                u.pnum, 
                u.address,
                u.secondary_address, 
                r.title as role,
                u.verification_token,
                u.verified   
            FROM 
                user u 
            INNER JOIN 
                role r ON u.role = r.id
            WHERE 
                u.id = ?;`

        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get profile' });
            }
            if (result.length > 0) {
                res.json(result[0]);
            } 
            
        });

    })

    app.post('/setRoles', (req, res) => {
        const { roles, user_Id } = req.body;
    
        // Validate input
        if (!roles || !user_Id) {
            return res.status(400).json({ error: 'Roles and user ID are required.' });
        }
    
        const query = `UPDATE user SET role = ? WHERE id = ?`;
    
        db.query(query, [roles, user_Id], (err, result) => {
            if (err) {
                console.error("Database query error:", err); // Log detailed error
                return res.status(500).json({ error: 'Failed to set role. Please try again.' });
            }
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found.' }); // Handle case where user does not exist
            }
    
            res.json({ success: true, message: 'Role updated successfully.' });
        });
    });
    
    
    app.post('/getRider',(req,res)=>{


        const query = `Select * from user where role = 4`

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to set role' });
            }
            res.json(result)          
        });


    })
    
    app.post('/getRole',(req,res)=>{


        const query = `Select * from role`

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to set role' });
            }
            res.json(result) ;         
        });


    })
    
    app.post('/addRole',(req,res)=>{

        const {title, administer} = req.body

        const query = `Insert into role (title, administer) VALUES (?, ?)`

        db.query(query,[title, administer], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to set role' });
            }
            res.json('Insert Success')          
        });


    })

    app.post('/Addons',(req,res)=>{

        const query = `Select a.id, a.name, a.price, a.category_id, c.title as category from addons a JOIN category c ON c.id = a.category_id where a.visible = 1 `

        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get addons' });
            }
            res.json(results);
            
        });

    })
    
    app.post('/AdminAddons',(req,res)=>{

        const query = `Select a.id, a.name, a.price, a.category_id, a.visible , c.title as category from addons a JOIN category c ON c.id = a.category_id `

        db.query(query, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get addons' });
            }
            res.json(results);
            
        });

    })
    
    app.post('/sizes',(req,res)=>{

        const {foodId} = req.body

        const query = `Select * from food_sizes where food_id = ?`

        db.query(query,[foodId] ,(err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get addons' });
            }
            
            res.json(results);
            
        });

    })

    app.post('/fetchSizes',(req,res)=>{

        const {foodId} = req.body

        const query = `Select * from food_sizes`

        db.query(query,[foodId] ,(err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get addons' });
            }
            
            res.json(results);
            
        });

    })

    app.post('/orderNotif', (req,res) =>{

        const {userId} = req.body;

        const query = `SELECT Count(*) as totalOrders FROM cart_items WHERE user_id = ?`;
            
            db.query(query, [userId], (err, result) => {
                
                if (err) {
                    console.error('Error in database query:', err);
                    socket.emit('error', { message: 'Database error' });
                } 
                res.json(result[0]);

            });
    })

    io.on('connection', (socket) => {
        console.log('A user connected: ' + socket.id);
      
        socket.on('join_room', (ticketId) => {
          socket.join(ticketId);
          console.log(`User with ID: ${socket.id} joined room: ${ticketId}`);
        });

        socket.on('join_room_rider', (orderId) => {
            socket.join(orderId);
            console.log(`Rider with ID: ${socket.id} joined order room: ${orderId}`);
        });

        socket.on('leave_Room', (room) => {
            socket.leave(room);
            console.log(`${socket.id} left room: ${room}`);
        });

        socket.on('notif', (userId) => {

            const query = `SELECT Count(*) as totalOrders FROM cart_items WHERE user_id = ?`;
            
            db.query(query, [userId], (err, result) => {
                
                if (err) {
                    
                    socket.emit('error', { message: 'Database error' });
                }
                else {
                
                    socket.emit('orderNotif', result[0]);
                }

            });
            
        });


        socket.on('orderTracking', () => {
            
            const query = 
                    `
                    SELECT 
                o.order_id, 
                u.name,
                u.address,
                u.pnum,
                o.customer_id, 
                o.order_date, 
                o.deliveryMethod,
                o.status,
                o.totalPrice, 
                GROUP_CONCAT(
                    CONCAT('Food Name: ',
                        f.name, ' ( Size: ', 
                        ofd.size, ', Quantity: ', 
                        ofd.quantity, ', Addons: ', 
                        IFNULL(ofd.addons, ''), ')'
                    ) ORDER BY f.name SEPARATOR ', '
                ) AS food_details
            FROM 
                orders o
            JOIN 
                orders_food ofd ON ofd.order_id = o.order_id
            JOIN 
                foods f ON f.id = ofd.food_id
            JOIN 
                user u ON u.id = o.customer_id
            WHERE o.status IN ('unpaid','on process', 'paid', 'order ready')
            GROUP BY 
                o.order_id, 
                u.name,
                u.address,
                u.pnum,
                o.customer_id, 
                o.order_date, 
                o.status,
                o.deliveryMethod
            ORDER BY 
                o.order_date ASC;
                        
                    `

            db.query(query, (err, result) => {
                if (err) {
                    socket.emit('error', { message: 'Database error' });
                } 
                else {
                    socket.emit('orders', result);
                }
            });
         });
        
      
        socket.on('send_message', (messageData) => {
          const { author,role, room, userId, message } = messageData;
      
          const sql = `INSERT INTO messages (ticket_id, sender_id, content) VALUES (?, ?, ?)`;
          
          db.query(sql, [room, userId, message], (err, results) => {

            if (err) {
              console.error('Error sending message: ' + err.stack);
              return;
            }
      
            socket.to(room).emit('receive_message', {
                room,
                userId,
                role,
                message,
                author,
                time:  new Date(Date.now()).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            });
      
          });
        });
        
        socket.on('send_message_rider', async (messageData) => {
            const { author, room, role, userId, message } = messageData;
      
          const sql = `INSERT INTO order_msg (order_id, sender_id, content) VALUES (?, ?, ?)`;
          
          db.query(sql, [room, userId, message], (err, results) => {

            if (err) {
              console.error('Error sending message: ' + err.stack);
              return;
            }
      
            socket.to(room).emit('receive_message', {
              room: room, 
              userId: userId,
              role,
              message,
              author, 
              time: new Date(Date.now()).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              }),
            });
      
            console.log(`Message sent in room ${room}`);
          });
         });
      
        socket.on('disconnect', () => {
          console.log('User disconnected: ' + socket.id);
        });
    });

    app.post('/ChangeEmail', (req, res) => {
        const { newEmail, userId } = req.body;
      
        if (!newEmail || !userId) {
          return res.status(400).json({ success: false, message: "New email and user ID are required." });
        }
      
        const query = `UPDATE user SET email = ? WHERE id = ?`;
      
        db.query(query, [newEmail, userId], (err, result) => {
          if (err) {
            console.error("Error in database query:", err);
            return res.status(500).json({ success: false, message: "Database error." });
          }
      
          if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
          }
      
          res.json({ success: true });
        });
      });
      
    app.post('/ChangePassword', async (req, res) => {
    const { password, newPassword, userId } = req.body;
    
    if (!password || !newPassword || !userId) {
        return res.status(400).json({ success: false, message: "Current password, new password, and user ID are required." });
    }
    
    try {
        // Step 1: Retrieve the current hashed password from the database
        const getPasswordQuery = `SELECT password FROM user WHERE id = ?`;
    
        db.query(getPasswordQuery, [userId], async (err, data) => {
        if (err) {
            console.error("Error retrieving password:", err);
            return res.status(500).json({ success: false, message: "Database error." });
        }
    
        if (data.length === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
        }
    
        const storedHashedPassword = data[0].password;
    
        // Step 2: Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, storedHashedPassword);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Current password is incorrect." });
        }
    
        // Step 3: Hash the new password and update it in the database
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updatePasswordQuery = `UPDATE user SET password = ? WHERE id = ?`;
    
        db.query(updatePasswordQuery, [hashedNewPassword, userId], (err, result) => {
            if (err) {
            console.error("Error updating password:", err);
            return res.status(500).json({ success: false, message: "Database error." });
            }
    
            if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "User not found." });
            }
    
            res.json({ success: true, message: "Password updated successfully." });
        });
        });
    } catch (error) {
        console.error("Error handling password change:", error);
        res.status(500).json({ success: false, message: "Error updating password." });
    }
    });

      app.post('/closeTicket', (req, res) =>{

        const {status, ticketId} = req.body


        const sql = 'UPDATE tickets set status = ? where ticket_id = ?';
        db.query(sql, [status, ticketId], (err,result) =>{
            if(err){
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(200).json({success: true, status: "UPDATE SUCCESSFULLY"});
        })

      })

      app.post('/createTicket', (req, res) => {
        const { ticketId, userId, subject } = req.body;
      
        const checkTicketSql = 'SELECT * FROM tickets WHERE ticket_id = ? ';
        db.query(checkTicketSql, [ticketId, subject], (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
      
          if (results.length > 0) {
            
            const updateTicket = `UPDATE tickets set subject = ?, status = 'open' where ticket_id = ? AND user_id = ?`;

            db.query(updateTicket, [subject,ticketId,userId]), (err, results)=>{
                if (err) {
                    return res.status(500).json({ error: 'Error updating ticket' });
                  }
                  res.status(201).json({ message: 'Ticket updated successfully', ticketId });
            }
            
            return res.status(200).json({ success: 'Ticket subject updated' });

          }

          else{

            const createTicketSql = 'INSERT INTO tickets (ticket_id, user_id, subject) VALUES (?, ?, ?)';
            db.query(createTicketSql, [ticketId, userId, subject], (err, results) => {
              if (err) {
                return res.status(500).json({ error: 'Error creating ticket' });
              }
              res.status(201).json({ message: 'Ticket created successfully', ticketId });
            });
    
          }


        });
          
      });

      app.post('/getMessages', (req, res) => {
        const { ticketId } = req.body;
      
        const sql = `
                    SELECT m.id, u.name, m.sender_id, m.ticket_id, m.content, m.created_at
                    FROM messages m
                    JOIN tickets t ON m.ticket_id = t.ticket_id
                    JOIN user u ON m.sender_id = u.id
                    WHERE m.ticket_id = ?
                    ORDER BY t.status = 'close', m.created_at ASC;
                    
                    
                    `;

        db.query(sql, [ticketId ], (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.status(200).json(results);
        });

      });
      
      
      app.post('/getRiderMessages', (req, res) => {
        
        const { ticketId } = req.body;

        const sql = `
                    SELECT m.id, u.name,m.sender_id, m.order_id, m.content, m.created_at
                    FROM order_msg m
                    JOIN orders o ON m.order_id = o.order_id
                    JOIN user u ON m.sender_id = u.id
                    WHERE m.order_id = ?
                    ORDER BY m.created_at ASC;
                    
                    `;

        db.query(sql, [ticketId ], (err, results) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' });
          }
          res.status(200).json(results);
        });

      });

      

      app.post('/getOrderId', (req, res) => {
        const {userId} = req.body;

        const sql = `SELECT o.order_id, u.name 
                        FROM orders o
                        JOIN user u ON o.customer_id = u.id
                        WHERE o.rider_id = ? 
                        ORDER BY o.order_date DESC; `;

        db.query(sql,[userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'No results found' });
            }

            res.json(results);
        });
        
    });
      
    app.post('/getTicketId', (req, res) => {

        const sql = `
                    SELECT 
                        t.id, 
                        t.subject, 
                        t.status, 
                        t.ticket_id, 
                        t.updated_at, 
                        u.name
                    FROM 
                        tickets t
                    JOIN 
                        user u
                    ON 
                        t.ticket_id = u.verification_token
                    ORDER BY 
                        t.status = 'closed' ASC, 
                        t.updated_at DESC;
                   `;

        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'No results found' });
            }

            res.json(results);
        });
        
    });
    
    app.post('/validateDiscount', (req, res) => {
        const { code, totalBill } = req.body;

        const sql = 
        `
          SELECT * 
          FROM discount_codes 
          WHERE code = ? 
          AND is_active = 1
          AND valid_from <= NOW() 
          AND valid_until >= NOW()
        `;
    
        db.query(sql, [code], (err, results) => {
            
            if (err) {
                return res.status(500).json({ success: false, message: 'Database error' });
            }
    
            if (results.length === 0) {
                return res.status(400).json({ success: false, message: 'Invalid or expired discount code' });
            }
    
            const discount = results[0];
            let discountAmount = 0;
    
            if (discount.min_order_value && totalBill < discount.min_order_value) {
                return res.status(400).json({
                    success: false,
                    message: `Minimum order value is $${discount.min_order_value.toFixed(2)} to apply this discount.`,
                });
            }
    
            if (discount.discount_type === 'percentage') {
                discountAmount = (totalBill * discount.discount_value) / 100;
    
                if (discount.max_discount_value && discountAmount > discount.max_discount_value) {
                    discountAmount = discount.max_discount_value;
                }

            } else if (discount.discount_type === 'fixed') {
                discountAmount = discount.discount_value;
            }
    
            return res.json({
                success: true,
                discountAmount,
                finalAmount: totalBill - discountAmount,
            });
        });
    });

    app.post('/addDiscount', (req,res)=>{
        const {code,type,value,min_order,max_discount_value,limit, valid_from, valid_until} = req.body.discount;

        const sql = 
        `Insert INTO discount_codes (code, discount_type, discount_value, min_order_value,max_discount_value, usage_limit, valid_from, valid_until)
        VALUES (?,?,?,?,?,?,?,?)
        `
        
        db.query(sql, [code, type, value, min_order, max_discount_value, limit, valid_from, valid_until], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: 'Failed to add discount code. Please try again later.' });
            }
    
            res.status(201).json({ message: 'Discount code added successfully!' });
        });
    })

    app.get('/fetchDiscount', (req, res) => {
        const sql = `SELECT * FROM discount_codes`;
    
        db.query(sql, (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: 'Failed to fetch discount codes. Please try again later.' });
            }
            res.json(result);
        });
    });

    app.delete('/removeDiscount/:id', (req, res) => {
        const { id } = req.params;
    
        // SQL query to delete the discount code by ID
        const sql = 'DELETE FROM discount_codes WHERE id = ?';
    
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ error: 'Failed to delete discount code. Please try again later.' });
            }
    
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Discount code not found.' });
            }
    
            res.status(200).json({ message: 'Discount code deleted successfully.' });
        });
    });
    
    app.post('/contact', async (req, res) => {
        const { firstName, lastName, email, message } = req.body;

        if (!firstName || !lastName || !email || !message) {
            return res.status(400).json({ error: "All fields are required." });
        }

        try {
            // Nodemailer transporter setup
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            });

            const mailGenerator = new MailGen({
            theme: 'default',
            product: {
                name: "Jayd's Cafe",
                link: 'https://jaydscafe.com',
            },
            });

            // Email template for sender acknowledgment
            const acknowledgmentEmailContent = mailGenerator.generate({
            body: {
                name: `${firstName}`,
                intro: "Thank you for reaching out to Jayd's Cafe!",
                action: {
                instructions: 'We have received your message and will respond shortly.',
                button: {
                    color: '#017242',
                    text: 'Visit our website',
                    link: 'https://jaydscafe.com',
                },
                },
                outro: 'Thank you for choosing Jayd’s Cafe!',
            },
            });

            // Owner email options
            const ownerMessage = {
            from: email,
            to: process.env.EMAIL, // Your admin email address
            subject: `New Message from ${firstName} ${lastName}`,
            text: `Message from ${firstName} ${lastName} (${email}):\n\n${message}`,
            };

            const senderMessage = {
            from: process.env.EMAIL,
            to: email,
            subject: "Thank You for Contacting Jayd's Cafe",
            html: acknowledgmentEmailContent,
            };

            await transporter.sendMail(ownerMessage);

            await transporter.sendMail(senderMessage);

            return res.status(201).json({ success: true, msg: 'Emails sent successfully.' });
        } catch (error) {
            console.error('Email Sending Error:', error);
            return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
        }
    });


    async function fetchEmails() {
        try {
          const connection = await imap.connect(config);
          await connection.openBox('INBOX');
      
          const searchCriteria = ['UNSEEN']; // Fetch unread emails
          const fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            struct: true,
          };
      
          const messages = await connection.search(searchCriteria, fetchOptions);
      
          const emails = await Promise.all(
            messages.map(async (message) => {
              // Parse email header and body
              const headerPart = message.parts.find((part) => part.which === 'HEADER');
              const textPart = message.parts.find((part) => part.which === 'TEXT');
      
              // Parse header information
              const headers = headerPart ? headerPart.body : {};
              const subject = headers.subject ? headers.subject[0] : 'No Subject';
              const from = headers.from ? headers.from[0] : 'Unknown Sender';
              const date = headers.date ? headers.date[0] : 'Unknown Date';
      
              // Parse body
              const body = textPart ? textPart.body : 'No Body';
      
              return {
                subject,
                from,
                date,
                body,
              };
            })
          );
      
          connection.end();
          return emails;
        } catch (error) {
          console.error('Error fetching emails:', error);
          throw error;
        }
      }
      
      
      // REST API Endpoint to Fetch Emails
      app.get('/emails', async (req, res) => {
        try {
          const emails = await fetchEmails();
          res.json(emails);
        } catch (error) {
          res.status(500).send('Error fetching emails');
        }
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other email services like Yahoo, Outlook, etc.
        auth: {
            user: EMAIL, // Replace with your email
            pass: PASSWORD,  // Replace with your email password or an app-specific password if using Gmail
        },
    });
      

    app.post('/sendMessage', async (req, res) => {
        const { recipient, subject, body } = req.body;
    
        // Validate the required fields
        if (!recipient || !subject || !body) {
            return res.status(400).json({ error: 'Recipient, subject, and body are required' });
        }

        const mailGenerator = new MailGen({
            theme: 'default', // You can choose other themes like 'default', 'cerberus', etc.
            product: {
                name: "Jayd's Cafe",
                link: 'https://jaydscafe.com',
            },
        });
    
        // Generate the email content using MailGen
        const acknowledgmentEmailContent = mailGenerator.generate({
            body: {
                name: recipient.split('@')[0],  // You can use the recipient's name or another custom name
                intro: "Thank you for reaching out to Jayd's Cafe!",
                action: {
                    instructions: 'Thank you for reaching out! We’ll be in touch again if any further action is needed.',
                    button: {
                        color: '#017242', // Button color
                        text: 'Visit our website',
                        link: 'https://jaydscafe.com',
                    },
                },
                outro: 'Thank you for choosing Jayd’s Cafe!',
                table: {
                    data: [
                        { message: body },
                    ],
                },
            },
        });
    
        const mailOptions = {
            from: process.env.EMAIL,
            to: recipient,
            subject: subject,
            html: acknowledgmentEmailContent,
        };
    
        try {

            await transporter.sendMail(mailOptions);
    
            return res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'An error occurred while sending the message' });
        }
    });

server.listen(8081, () => {
    console.log("Connected");
});