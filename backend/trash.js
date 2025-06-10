// app.get('/profile', verifyToken, async (req, res) => {
//     try {
//         console.log("here");
        
//         const cognitoId = req.user.sub 
//         const [rows] = await pool.query('SELECT * FROM users WHERE fname = ?', [cognitoId])
//         if(rows.length === 0) return res.status(404).send("User not found");
        
//         res.json(rows[0])

//     } catch (error) {
//         res.status(500).send('Server error');
//     }
// })



// //
// let client;
// // Initialize OpenID Client
// async function initializeClient() {
//     const issuer = await Issuer.discover(`https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_POOL_ID}`);
//     client = new issuer.Client({
//         client_id: '1mai8u0j9lpufv11n16iv4vdl',
//         client_secret: 'donein8474',
//         redirect_uris: ['https://d84l1y8p4kdic.cloudfront.net'],
//         response_types: ['code']
//     });
// };
// initializeClient().catch(console.error);

// app.use(session({
//     secret: 'mysceret',
//     resave: false,
//     saveUninitialized: false
// }));

// app.get('/login', (req, res) => {
//     const nonce = generators.nonce();
//     const state = generators.state();

//     req.session.nonce = nonce;
//     req.session.state = state;

//     const authUrl = client.authorizationUrl({
//         scope: 'email openid phone',
//         state: state,
//         nonce: nonce,
//     });

//     res.redirect(authUrl);
// });
// app.set('view engine', 'ejs'); 


const mydb = require('./db')

function getRandomStepNumber(min =200, max =1200, step = 100) {
    const numSteps = Math.floor((max - min ) / step) + 1
    const randomStep = Math.floor(Math.random() * numSteps)
    return min + randomStep * step
}
const tranactions = [
    {user_id: getRandomBetween5And13(), account_id: 1, amount: getRandomStepNumber()}
]


function getRandomBetween5And13() {
    return Math.floor(Math.random() * (13 - 5 + 1)) + 5;
  }


  for (let i = 0; i < 350; i++) {

    tranactions.push( {user_id: getRandomBetween5And13(), account_id: 1, amount: getRandomStepNumber()})
  }

function generateTransactions(){
    for (let i = 0; i < 350; i++) {

        tranactions.push( {user_id: getRandomBetween5And13(), account_id: 1, amount: getRandomStepNumber()})
      }
    
}

function insertTransactions() {
    for (let i = 0; i < tranactions.length; i++) {
        const { user_id, account_id, amount } = tranactions[i];
        const sql = 'INSERT INTO transactions (user_id, account_id,amount) VALUES (?, ?, ?)';
        mydb.query(sql, [user_id, account_id, amount], (err, result) => {
          if (err) {
            console.error(`Error inserting :`, err.message);
          } else {
            console.log(`Inserted  with ID:`);
          }
        });
      }
}

insertTransactions()
