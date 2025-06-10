const express = require('express');
const app = express();
const PORT = 3000;
require('dotenv').config()
// const authRoutes = require('./routes/signup')
const signinRoutes = require('./routes/signin')
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const checkAuth = require('./middlewares/isAuth');
const DynamoDBStore = require('connect-dynamodb')({ session });
const transactionsRoutes = require('./routes/transactions');
const groupsRoutes = require('./routes/groups')
const loansRoutes = require('./routes/loans')
const usersRoutes = require('./routes/users')
const userSessions = require('./routes/user-sessions')



const verifyToken = require('./middlewares/verifyToken');





// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(
    cors(
        { 
            origin: 'http://localhost:5173',   
            credentials: true
        }
    )
);
app.use(session({
    store: new DynamoDBStore({
        table: 'sessions',            // DynamoDB table name
        AWSRegion: 'ap-south-1',       // your AWS region
        createTable: true             // true = auto-create table
      }),
    secret: process.env.SESSION_SECRET || 'your-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,                // set true if using HTTPS
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000   // 1 day
    }
  }));
app.use(bodyParser.json());
app.use('/api', verifyToken);


// Routes
app.get('/', (req, res) => {

      res.send('Hello from Express!'); 
});

// app.use('/auth', authRoutes);
app.use('/auth', userSessions);
app.use('/api/v1/session', checkAuth);
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/transactions', transactionsRoutes)
app.use('/api/v1/groups', groupsRoutes)
app.use('/api/v1/loans', loansRoutes)
app.get("/check",checkAuth, (req,res) => {
    res.send("after.auth")
})





// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});