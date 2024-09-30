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
const { Server } = require('socket.io');
const app = express();
const http = require("http")
const server = http.createServer(app);
const io = new Server(server);
require('dotenv').config();


const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY;
const PAYMONGO_PUBLIC_KEY = process.env.PAYMONGO_PUBLIC_KEY;

app.use(cors({
    origin:"http://localhost:3000",
    methods: ["POST","GET"],
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
})

function generateToken() {
    return Math.random().toString(36).substr(2, 10);
}

app.get('/',(req,res)=>{
    
    if(req.session.name && req.session.role === 'user'){
        return res.json({valid:true, name: req.session.name, userId: req.session.userId})
    }
    else{
        return res.json({valid: false})
    }

})

app.get('/admin',(req,res)=>{
    
    if(req.session.name && req.session.role === 'admin'){
        return res.json({valid:true, name: req.session.name, userId: req.session.userId})
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



app.get('/foods', (req,res)=>{
    
    const query = 
    
    `SELECT f.id, f.name, f.description, f.image_url, fs.size, fs.price 
    FROM foods f JOIN food_sizes fs ON f.id = fs.food_id 
    GROUP BY f.id, f.name, f.description, f.image_url 
    WHERE visible = 1
    LIMIT 4;`;

    const order = `
                   SELECT count(o.order_id) as totalOrder , f.name, f.description, f.image_url, fs.price 
                   FROM foods f 
                   JOIN food_sizes fs on f.id = fs.id 
                   JOIN orders_food of on of.food_id = fs.id 
                   JOIN orders o on o.order_id = of.order_id 
                   WHERE visible = 1
                   GROUP BY f.name,fs.size, f.description, f.image_url, fs.price 
                   order by totalOrder desc limit 4;
                `
    db.query(order,(err,results)=>{
        if(err) {
        res.json({err: "error"});
        }
        res.json(results);
        
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
                                            link: `http://localhost:8081/verify/${verificationToken}`
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
    

app.get('/menu', (req ,res )=>{
        const query = 
        `SELECT
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
            visible = 1   
        GROUP BY
            f.id, f.name, f.description, f.image_url;
         
            
            `
            
            
            ;
    
        db.query(query, (err,results)=>{
            if(err) {
            res.json({err: "error"});
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
        f.image_url AS food_image_url,
        c.size,
        c.price AS food_price,
        c.addons,
        c.quantity
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

    const query = `SELECT * From ORDERS Where order_id = ?`
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
    const { foodId, size, price, addons, quantity } = req.body;
    const userId = req.session.userId;

    // Insert the add-ons names directly
    const query = 'INSERT INTO cart_items (user_id, food_id, size, price, addons, quantity) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(query, [userId, foodId, size, price, addons, quantity], (err, results) => {
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


app.post('/login',async (req, res) => {

    const sql = 'SELECT * FROM user WHERE email = ?';

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        const isMatch = bcrypt.compare(req.body.password,data[0].password);
        if (err) {
            return res.json("Error");
        }
        
        if (data.length == 0) {
            return res.json({ Login: false, Message: "NO RECORD EXISTED" });
        } 
        const userData = data[0];

        if (!userData.verified) {
            return res.status(401).json({ error: 'Account not verified. Please check your email for verification instructions.' });
        }
        
        if (isMatch && data[0].role === 'user'){
            req.session.userId = userData.id;
            const name = data[0].name;
            req.session.name = name;          
            req.session.role = 'user';          
            return res.json({ Login: true });
        }

        else{
            res.send("Wrong Password");
            return
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
    const { userId, amount } = req.body;

    // Insert into orders table
    const query = `
        INSERT INTO orders (customer_id, totalPrice, status) 
        VALUES (?, ?, 'paid');
        SELECT LAST_INSERT_ID() as lastOrderId;
    `;

    db.query(query, [userId, amount], (err, resInInserting) => {
        if (err) {
            return res.json({ success: false, err: "Error inserting order" });
        }

        const lastOrderId = resInInserting[1][0].lastOrderId;

        // Insert into orders_food with addons
        const gettingOrder = `
            INSERT INTO orders_food (order_id, food_id, quantity, addons, size)
            SELECT ?, food_id, quantity, addons, size
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
            });

            return res.json({ success: true });
        });
    });
});

// Webhook route to handle payment success
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    const event = req.body;

    // Function to fetch the list of webhooks
    const getWebhooks = async () => {
        const options = {
            method: 'GET',
            url: 'https://api.paymongo.com/v1/webhooks',
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
            axios.post('http://localhost:8081/order', orderData)
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
  
app.post('/create-payment-intent', async (req, res) => {
    const { amount, description, userId } = req.body;

    try {
        const response = await axios.post(
            'https://api.paymongo.com/v1/payment_intents',
            {
                data: {
                    attributes: {
                        amount: amount * 100,
                        payment_method_allowed: ['gcash'],
                        currency: 'PHP',
                        description: description,
                        metadata: {
                            userId: userId.toString()
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

        const paymentIntentId = response.data.data.id;

        const checkoutResponse = await axios.post(
            'https://api.paymongo.com/v1/sources',
            {
                data: {
                    attributes: {
                        amount: amount * 100, // amount in cents
                        redirect: {
                            success: `http://localhost:3000/tracking`,
                            failed: 'http://localhost:3000/payment-failed',
                        },
                        type: 'gcash', // Payment type
                        currency: 'PHP',
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

        res.json({
            checkoutUrl: checkoutResponse.data.data.attributes.redirect.checkout_url,
            paymentIntentId,
        });
    } 
    catch (error) {
        console.error('Error creating payment intent or checkout:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create payment intent or checkout' });
    }
});



// app.post('/verify-payment', async (req, res) => {
//     const { paymentIntentId } = req.body;

//     try {
//         const response = await axios.get(`https://api.paymongo.com/v1/payment_intents/${paymentIntentId}`, {
//             headers: {
//                 'Authorization': `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
//                 'Content-Type': 'application/json',
//             },
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error('Error verifying payment:', error);
//         res.status(500).json({ error: 'Failed to verify payment' });
//     }
// });

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
            res.status(200).json({ message: 'User info updated successfully' });
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

        if (!userData.verified) {
            return res.status(401).json({ error: 'Account not verified. Please check your email for verification instructions.' });
        }
        
        if (isMatch && data[0].role === 'admin'){
            req.session.userId = userData.id;
            const name = data[0].name;
            req.session.name = name;
            req.session.role = 'admin';          
            return res.json({ Login: true });
        }

        else{
            res.send("Wrong Password");
             return
        }

    });
});

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


app.post('/adminTable', async (req,res) => {

    const query = 
            `SELECT 
            f.image_url, 
            f.id, 
            f.name,
            c.title, 
            f.description, 
            fs.price,
            COUNT(DISTINCT of.id) AS sold, 
            (fs.price * COUNT(DISTINCT of.id)) AS profit
                FROM 
                    foods f 
                JOIN 
                    food_sizes fs ON f.id = fs.food_id
                JOIN
                    category c on f.category_id = c.id
                JOIN
                    orders_food of ON f.id = of.food_id
                JOIN
                    orders o ON of.order_id = o.order_id
                GROUP BY 
                    f.id, f.name, f.description, f.image_url;`

      db.query(query,(error, result) => {
        if(error){
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(result)

      })
})

app.post('/adminsignup', async (req, res) => {
    
    const { fullname, email, password } = req.body;

    try {
        // Check if email already exists
        const checkQuery = `SELECT * FROM admin WHERE email = ? `;
        
        db.query(checkQuery, [email], async (error, resultFromDb) => {
            
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            if (resultFromDb.length > 0) {
                return res.status(400).json({ error: 'Email Already Taken' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const insertQuery = 'INSERT INTO admin (fullname, email, password) VALUES (?, ?, ?)';
            const values = [fullname, email, hashedPassword];

            db.query(insertQuery, values, (insertError, result) => {
                if (insertError) {
                    console.error('Error signing up:', insertError);
                    return res.status(500).json({ error: 'Failed to sign up' });
                }
                console.log('Admin signed up successfully:', result); 

        });
    });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({ error: 'Failed to sign up' });
    }
});


app.post('/fetchUserData', (req,res)=>{

    const query = `SELECT id, name , email, role from user WHERE role = 'admin' OR role = 'rider' `
    db.query(query,(err,result) => {
        
        if(err){
            res.json({err: "Unable to fetch user data to admin management"})
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
            res.json({err: "Unable to fetch foods to product management"})
        }
        res.json(result)

    })

})

app.post('/fetchAddons', (req,res) =>{

    const query = 'Select * from addons';

    db.query(query,(err,result) =>{
        if(err){
            res.json({err: "Unable to fetch addons to product management"})
        }
        res.json(result)

    })
})


app.post('/addProduct', upload.single('image_url') , (req, res) =>{

    const { name, description, category_id, medprice } = req.body;
    const image_url = req.file ? `/images/${req.file.filename}` : '/images/americano.png';

    const query = `INSERT INTO foods (name, description, image_url, category_id) 
                   VALUES (?,?,?,?);
                   SELECT LAST_INSERT_ID() as lastfoodsId`
    

    db.query(query, [name, description, image_url, category_id], (err,result) =>{
        if(err){
            res.json({err: "Unable to add into foods"})
        }

        const lastfoodsId = result[1][0].lastfoodsId;
        const medSizeQuery = `INSERT INTO food_sizes(food_id, size , price) 
                            VALUES (?,'medium',?)`

        db.query(medSizeQuery, [lastfoodsId, medprice], (sizeErr, sizeResult)=> {
            if(sizeErr){
                res.json({sizeErr: "Unable to add into food_sizes"})
            }
            
        })

        // const lgSizeQuery = `INSERT INTO food_sizes(food_id, size , price) 
        //                     VALUES (?,'large',?)`

        // db.query(lgSizeQuery, [lastfoodsId,lgprice], (sizeErr, sizeResult)=> {
        //     if(sizeErr){
        //         res.json({sizeErr: "Unable to add into food_sizes"})
        //     }
            
        // })

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
            res.json({err: "Unable to add into food_sizes"})
        }
        
    })

})



app.post('/removeProduct',  async (req, res) =>{

    const {id} = req.body;

    let foodId;

    const rows = db.query(`Select id from foods where id = ?;`, [id], (error,result)=>{
        if(error){
            res.json({error: "Unable to Select Id into foods"})
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
                res.json({err: "Unable to delete into foods"})
            }
    
            const sizeQuery = `Delete from food_sizes where id = ?`
    
            db.query(sizeQuery, [foodId], (sizeDelErr, sizeResult)=> {
                if(sizeDelErr){
                    res.json({sizeDelErr: "Unable to delete into food_sizes"})
                }
                
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
                res.json({err: "Unable to delete into addons"})
            }
            
        })
    })
    
    app.post('/removeCategory',(req,res)=>{
        const {id} = req.body

        const query = `Delete from Category where id = ?`

        db.query(query, [id], (err, result)=> {
            if(err){
                res.json({err: "Unable to delete into addons"})
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
                res.json({err: "Unable to fetch food and food_sizes"})
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
                res.json({err: "Unable to update into food and food_sizes"})
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
                    res.json({ err: "Unable to update sizes", details: updateErr });
                });
         
        })
 
    })
        
        app.post('/updateAddons' , (req,res) => {

        const { name , price, AddonsId } = req.body;

        const query = 
        `
        Update addons
        SET name = ?, 
        price = ? 

        WHERE 
        id = ?
        `

        db.query (query,[name , price, AddonsId], (err,result) => {
            if (err){
                res.json({err: "Unable to update into Addons"})
            }
            res.json({success: true})
         
        })
 
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
                res.json({err: "Unable to update into category"})
            }
            res.json({success: true})
         
        })
 
        })

    app.post('/users', (req, res) => {
        const query = `SELECT COUNT(DISTINCT customer_id) AS customer_count FROM orders;`;
        
        try {
            db.query(query, (err, result) => {
                if (err) {
                    res.json({err: "error"});
                }
                
                res.json(result[0]);
            });
        } catch (error) {
            res.json({ error: 'Failed to fetch user count' });
        }
    });
    
    app.post('/totalRevenue', (req,res) =>{
        const query = `SELECT SUM(totalPrice) AS total_revenue FROM orders`;
    
        db.query(query,(err,result)=>{
            if(err){
                res.json({err: "error"});
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

    app.post('/orderNotif', (req,res)=>{
        const {userId} = req.body;

        const query = `SELECT Count(*) as totalOrders FROM cart_items where user_id = ?`;

        db.query(query,[userId],(err,result)=>{
            if(err){
                res.json({err: "error"});
            }

            res.json(result[0]);
            
        })
    });
    
    app.post('/recentorder', async (req,res)=>{
        const query = 'SELECT id, user_id, food_id, quantity, total_price, order_date FROM orders ORDER BY order_date DESC LIMIT 10;';
            
            try{
                db.query(query,(err,result)=>{
                    if(err){
                        res.json({err: "error"});
                    }
                    const recentOrder = result.totalOrder;
                    res.json({recentOrder});
                })
            }catch(error){
                res.json({error: "Failed to fetch Recent Orders"});
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
                res.json({err:"ERROR"});
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

    app.post('/fetchCategory', (req,res)=>{
        const query = "Select * from category"
            
            db.query(query, (err,result)=>{
                if(err){
                    res.json({err:"ERROR"});
                }
                res.json(result)
                    
            })
        
    })

    app.post('/addAddons',(req,res)=>{

        const {name, price, category_id} = req.body;
        
        const query = `Insert into addons (name, price, category_id) VALUES
        (?, ?, ?)`

        db.query(query, [name, price, category_id] ,(err, result) => {
            
            if(err){
                res.json({err:"ERROR"});
            }
            res.json({Sucess: true})
             
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
    
            res.json({ message: 'Visibility updated successfully' });
        });

    })

    app.post('/orderTracking', (req,res) =>{

        const query = 
        `
        SELECT 
            o.order_id, 
            u.name,
            u.address,
            o.customer_id, 
            o.order_date, 
            o.status,
            o.totalPrice, 
            GROUP_CONCAT(
                CONCAT('Food Name: ',
                    f.name, ' ( Size: ', 
                    of.size, ', Quantity: ', 
                    of.quantity, ', Addons: ', 
                    IFNULL(of.addons, ''), ')'
                ) ORDER BY f.name SEPARATOR ', '
            ) AS food_details
        FROM 
            orders o
        JOIN 
            orders_food of ON of.order_id = o.order_id
        JOIN 
            foods f ON f.id = of.food_id
        JOIN 
            user u ON u.id = o.customer_id
        WHERE 
            o.status = 'pending' OR o.status = 'paid'
        GROUP BY 
            o.order_id, 
            u.name,
            u.address,
            o.customer_id, 
            o.order_date, 
            o.status
        ORDER BY 
            o.order_date ASC;
             
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
            o.status,
            o.totalPrice, 
            GROUP_CONCAT(
                CONCAT('Food Name: ',
                    f.name, ' ( Size: ', 
                    of.size, ', Quantity: ', 
                    of.quantity, ', Addons: ', 
                    IFNULL(of.addons, ''), ')'
                ) ORDER BY f.name SEPARATOR ', '
            ) AS food_details
        FROM 
            orders o
        JOIN 
            orders_food of ON of.order_id = o.order_id
        JOIN 
            foods f ON f.id = of.food_id
        JOIN 
            user u ON u.id = o.customer_id
        WHERE 
            o.status = 'completed' or o.status = 'cancelled'
        GROUP BY 
            o.order_id, 
            u.name,
            u.address,
            o.customer_id, 
            o.order_date, 
            o.status
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
    
    
    app.post('/personalOrder', (req,res) =>{
        
        const {userId} = req.body

        const query = 
        `
        SELECT 
            o.order_id, 
            u.name,
            u.address,
            o.customer_id, 
            o.order_date, 
            o.status,
            o.totalPrice, 
            o.customer_id,
            GROUP_CONCAT(f.name ORDER BY f.name) AS food_name
        FROM 
            orders o
        JOIN 
            orders_food of ON of.order_id = o.order_id
        JOIN 
            foods f ON f.id = of.food_id
        JOIN 
            user u ON u.id = o.customer_id
        WHERE 
            o.customer_id = ?
        GROUP BY 
            o.order_id, 
            u.name,
            u.address,
            o.customer_id, 
            o.order_date, 
            o.status
        ORDER BY 
            o.order_date DESC;
             
        `

        db.query(query,[userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get orders' });
            }
            res.json(result)
        });

    })


    app.post('/profile',(req,res) =>{

        const {userId} = req.body

        const query = ` SELECT name, email, pnum, address FROM user WHERE id = ? `

        db.query(query, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to get profile' });
            }
            if (result.length > 0) {
                res.json(result[0]);
            } 
            
        });

    })

    app.post('/Addons',(req,res)=>{

        const query = `Select * from addons`

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


    let users = {};  // To keep track of users

    io.on('connection', (socket) => {
        
        console.log('A user connected:', socket.id);


        socket.on('join', ({ userId, role }) => {
            // Query the database for the user
            const query = 'SELECT * FROM user WHERE id = ?'; // Adjust according to your user table structure
    
            connection.execute(query, [userId], (error, results) => {
                if (error) {
                    console.error('Database query error:', error);
                    return;
                }
    
                if (results.length > 0) {
                    const user = results[0]; // Assuming user exists
                    users[socket.id] = { userId: user.id, role: user.role };
    
                    if (role === 'admin') {
                        socket.join('admin');
                        console.log('Admin joined');
                    } else {
                        socket.join(userId);  // Each user has their own room
                        console.log('User joined:', userId);
                    }
                } else {
                    console.log('User not found:', userId);
                }
            });
        });

        // Join a room based on the user type (admin or user)
        socket.on('sendMessage', ({ message, to }) => {
            const sender = users[socket.id];
            if (sender.role === 'admin') {
                // Admin sends message to a specific user
                io.to(to).emit('receiveMessage', { message, from: 'admin' });
            } else {
                // User sends message to admin
                io.to('admin').emit('receiveMessage', { message, from: sender.userId });
            }
        });
    
        // Handle disconnect
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            delete users[socket.id];
        });
    });

    





app.listen(8081,()=>{
    console.log("Connected");
})