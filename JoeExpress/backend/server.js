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
const {EMAIL,PASSWORD,PAYMONGO_SECRET_KEY} = require('./env.js')

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
    database: "testreact",
    multipleStatements: true
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


app.post('/order', (req,res)=>{
    const {userId, totalBill} = req.body;

    const query = 
    `INSERT INTO orders (customer_id, totalPrice ,status) VALUES (?, ${totalBill} ,'pending');
    SELECT LAST_INSERT_ID() as lastOrderId`

    db.query(query,[userId],(err,resInInserting)=>{
        if(err) {
            res.json({success: false, err: "Error on inserting order"});
        }
        
        const lastOrderId = resInInserting[1][0].lastOrderId;

        const gettingOrder = 
        ` INSERT INTO orders_food (order_id, food_id, quantity)
          SELECT ? , food_id, quantity
          FROM cart_items
          WHERE user_id = ?;
        `
        db.query(gettingOrder,[lastOrderId,userId],(err,resInGettingOrder)=>{
            if(err){
                res.json({err: "Error on getting order"})
            }
            const remove = `Delete from cart_items WHERE user_id = ? `
                db.query(remove,[userId],(errInRemove, resInRemove)=>{
                    if(errInRemove){
                        res.json({err:"Error in Removing from cart"})
                    }
                })

        })

        return res.json({ success: true });

    })

})

app.get('/foods', (req,res)=>{
    const query = `SELECT f.id, f.name, f.description, f.image_url, fs.size, fs.price 
    FROM foods f JOIN food_sizes fs ON f.id = fs.food_id 
    GROUP BY f.id, f.name, f.description, f.image_url LIMIT 4;`;

    const order = `
                   SELECT count(o.order_id) as totalOrder , f.name, f.description, f.image_url, fs.price 
                   FROM foods f 
                   JOIN food_sizes fs on f.id = fs.id 
                   JOIN orders_food of on of.food_id = fs.id 
                   JOIN orders o on o.order_id = of.order_id 
                   GROUP BY f.name, f.description, f.image_url, fs.price 
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
                                        link: `http://localhost:8081/verify/${verificationToken}` // Verification link
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

app.get('/menu', (req ,res )=>{
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
        
        if (isMatch && data[0].role === 'user'){
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

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const response = await axios.post('https://api.paymongo.com/v1/payment_intents', {
            data: {
                attributes: {
                    amount,
                    currency: 'PHP',
                    payment_method_types: ['gcash'],
                },
            },
        }, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: 'Failed to create payment intent' });
    }
});

app.post('/verify-payment', async (req, res) => {
    const { paymentIntentId } = req.body;

    try {
        const response = await axios.get(`https://api.paymongo.com/v1/payment_intents/${paymentIntentId}`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(`${PAYMONGO_SECRET_KEY}:`).toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: 'Failed to verify payment' });
    }
});

// dashboard

app.post('/adminlogin',async (req, res) => {

    const sql = 'SELECT * FROM admin WHERE email = ?';

    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        const isMatch = bcrypt.compare(req.body.password,data[0].password);
        if (err) {
            return res.json("Error");
        }
        
        if (data.length == 0) {
            return res.json({ Login: false, Message: "NO RECORD EXISTED" });
        } 
        const userData = data[0];
        
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

app.post('/productResult', (req,res)=>{
    
    const query = ` SELECT f.name, c.title, f.id, fs.size,
                    CASE 
                        WHEN fs.size = 'medium' THEN fs.price 
                        WHEN fs.size = 'large' THEN fs.price
                        ELSE NULL 
                    END AS price

                    FROM foods f
                    JOIN food_sizes fs ON f.id = fs.food_id
                    JOIN category c ON f.category_id = c.id
                    WHERE fs.size = ?
                    GROUP BY f.name, c.title, f.id
                    `
    db.query(query,[req.body.sizedd],(err,result) =>{
        if(err){
            res.json({err: "Unable to fetch foods to product management"})
        }
        res.json(result)

    })

})

app.post('/addProduct', (req, res) =>{
    const {name,description,image_url,category_id, size, medprice, lgprice} = req.body;
    const query = `INSERT INTO foods (name, description, image_url, category_id) 
                    VALUES (?,?,?,?);
                    SELECT LAST_INSERT_ID() as lastfoodsId`

    db.query(query, [name,description,image_url,category_id], (err,result) =>{
        if(err){
            res.json({err: "Unable to add into foods"})
        }

        const lastfoodsId = result[1][0].lastfoodsId;
        const medSizeQuery = `INSERT INTO food_sizes(food_id, size , price) 
                            VALUES (?,'medium',?)`

        db.query(medSizeQuery, [lastfoodsId,medprice], (sizeErr, sizeResult)=> {
            if(sizeErr){
                res.json({sizeErr: "Unable to add into food_sizes"})
            }
            
        })

        const lgSizeQuery = `INSERT INTO food_sizes(food_id, size , price) 
                            VALUES (?,'large',?)`

        db.query(lgSizeQuery, [lastfoodsId,lgprice], (sizeErr, sizeResult)=> {
            if(sizeErr){
                res.json({sizeErr: "Unable to add into food_sizes"})
            }
            
        })

    })

})

app.post('/removeProduct',  async (req, res) =>{

    const {name} = req.body;
    let foodId;

    const rows = db.query(`Select id from foods where name = ?;`, [name], (error,result)=>{
        if(error){
            res.json({error: "Unable to Select Id into foods"})
        }

        foodId = rows[0];

        if (rows.length === 0) {
            return res.json({ error: 'Food item not found' });
        }
    });
    
    try{
        const query = `Delete from foods where name = ? `
        await db.query (query,[name], (err,result) =>{
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

    app.post('/updateProduct', (req,res)=>{
        
        const {name ,description ,image_url ,category_id , foodID} = req.body;

        const query = 
        `Update foods, food_sizes
        SET name= ?, description= ? , image_url= ? ,category_id = ?
        WHERE food_sizes.food_id = foods.id
        AND foods.id = ?
            `

        db.query (query,[name ,description ,image_url ,category_id , foodID], (err,result) => {
            if (err){
                res.json({err: "Unable to update into food and food_sizes"})
            }
            
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
    
    
    app.post('/totalOrder', async (req,res)=>{
        const query = `SELECT Count(*) as totalOrders FROM orders`;

        db.query(query,(err,result)=>{
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


    



app.listen(8081,()=>{
    console.log("Connected");
})