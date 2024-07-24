const session = require("express-session");
const cookieParser = require("cookie-parser");
const express = require("express");
const mysql = require("mysql");
const cors = require ("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const MailGen = require('mailgen');
const {EMAIL,PASSWORD} = require('./env.js')

const app = express();
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

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testreact"
})

function generateToken() {
    return Math.random().toString(36).substr(2, 10);
}


app.get('/',(req,res)=>{
    
    if(req.session.name){
        return res.json({valid:true, name: req.session.name, userId: req.session.userId})
    }
    
    else{
        return res.json({valid: false})
    }
})  

app.get('/foods', (req,res)=>{
    const query = `SELECT f.id, f.name, f.description, f.image_url, fs.size, fs.price 
    FROM foods f JOIN food_sizes fs ON f.id = fs.food_id 
    GROUP BY f.id, f.name, f.description, f.image_url LIMIT 4;`;

    db.query(query,(err,results)=>{
        if(err) {
        res.json({err: "error"});
    }
        res.json(results);
    });
      
    });



app.post('/users', async (req, res) => {
    const query = `SELECT COUNT(*) AS user_count FROM user;`;
    
    try {
        db.query(query, (err, result) => {
            if (err) {
                res.json({err: "error"});
            }
            const userCount = result[0].user_count;
            res.json({ user_count: userCount });
        });
    } catch (error) {
        res.json({ error: 'Failed to fetch user count' });
    }
});

app.post('/totalRevenue', async(req,res) =>{
    const query = 'SELECT SUM(total_price) AS total_revenue FROM orders';

    try{
        db.query(query,(err,result)=>{
            if(err){
                res.json({err: "error"});
            }
            const totalRevenue = result[0].total_revenue;
            res.json({total_revenue: totalRevenue});
        })
    }catch(error){
        res.json({ error: 'Failed to fetch Total Revenue' });
    }

});


app.post('/totalOrder', async (req,res)=>{
    const query = 'SELECT Count(*) AS total_order FROM orders';
    try{
        db.query(query,(err,result)=>{
            if(err){
                res.json({err: "error"});
            }
            const totalOrder = result[0].total_order;
            res.json({total_order:totalOrder});
        })
    }
    
    catch(error){
        res.json({error: 'Failed to fetch Total Orders'});
    }

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

    
    app.post('/signup', async (req, res) => {
        const { name, email, password, address } = req.body;
    
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
                const insertQuery = 'INSERT INTO `user` (name, email, password, address, verification_token) VALUES (?, ?, ?, ?, ?)';
                const values = [name, email, hashedPassword, address, verificationToken];
    
                db.query(insertQuery, values, (insertError, result) => {
                    if (insertError) {
                        console.error('Error signing up:', insertError);
                        return res.status(500).json({ error: 'Failed to sign up' });
                    }
    
                    console.log('User signed up successfully:', result);

                
                    const userId = result.insertId;

                    if (!userId) {
                        console.error('Failed to retrieve userId:', result);
                        return res.status(500).json({ error: 'Failed to retrieve userId' });
                    }

                    const cartQuery = 'INSERT INTO cart (user_id) VALUES (?)';

                db.query(cartQuery, [userId], (userError, cartResult)=>{
                    if(userError){
                        console.error('Error signing up:', userError);
                        return res.status(500).json({ error: 'Failed to create cart' });
                    }

                    console.log('User signed up successfully with ID:', cartResult);
                      
    
                    // Send registration email
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
                                name: 'POURING JOE',
                                link: 'https://mailgen.js/'
                            }
                        });
    
                        const response = {
                            body: {
                                // color: "#ffffff",
                                name: name,
                                intro: 'YOU REGISTERED SUCCESSFULLY',
                                outro: 'PLEASE CLICK THE LINK TO CONTINUE',
                                action: {
                                    instructions: 'To complete your registration, please click the following button:',
                                    button: {
                                        color: '#22BC66', // Optional action button color
                                        text: 'Verify your account',
                                        link: `http://localhost:5051/verify/${verificationToken}` // Verification link
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
                                res.status(201).json({ msg: 'You should receive an email shortly' });
                            })
                            .catch(emailError => {
                                console.error('Email Sending Error:', emailError);
                                res.status(500).json({ error: 'Failed to send email' });
                            });
    
                    } catch (emailError) {
                        console.error('Email Sending Error:', emailError);
                        res.status(500).json({ error: 'Failed to send email' });
                    }
                });
    
            });
        });

        } catch (error) {
            console.error('Signup Error:', error);
            res.status(500).json({ error: 'Failed to sign up' });
        }
    });

app.get('/menu', (req,res)=>{
        const query = 
        `SELECT
            f.id,
            f.name,
            f.description,
            f.image_url,
            MAX(CASE WHEN fs.size = 'large' THEN fs.price END) AS Large,
            MAX(CASE WHEN fs.size = 'medium' THEN fs.price END) AS Medium
            
        FROM
            foods f
        JOIN
            food_sizes fs ON f.id = fs.food_id
        GROUP BY
            f.id, f.name, f.description, f.image_url;`;
    
        db.query(query, (err,results)=>{
            if(err) {
            res.json({err: "error"});
        }
            res.json(results);
        });
});


app.post('/itemGetter',(req,res)=>{
    
    const userId = req.body.userId;

    const query = `
    SELECT
    c.food_id,
    f.name,
    f.image_url,
    c.size,
    c.price
    
        FROM
            cart_items c 
        JOIN foods f ON
            f.id = c.food_id
        WHERE user_id = ?
        `
    db.query(query, [userId], (err,result)=>{
        if(err){
            return res.status(500).json({ success: false, message: 'Failed to get item to cart' });
        }
        res.json({ success: true, items: result });
    })

})



app.get('/items/:foodId', (req, res) => {
    const { foodId } = req.params;
  
    const query = `
      SELECT
        f.id,
        f.name,
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

app.post('/cart_items', (req, res) => {
    const { foodId, size, price } = req.body;
    const userId = req.session.userId;
    const query = 'INSERT INTO cart_items (user_id, food_id, size, price) VALUES (?, ?, ?, ?)';
  
    db.query(query, [userId, foodId, size, price], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to add item to cart' });
      }
      res.status(200).json({ success: true, message: 'Item added to cart', results });
    });
  });

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
        
        if (isMatch){
            req.session.userId = userData.id;
            const name = data[0].name;
            req.session.name = name;          
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



app.listen(5051,()=>{
    console.log("Connected");
})