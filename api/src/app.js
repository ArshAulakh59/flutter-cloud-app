// Imports
const cors = require('cors');
const express = require('express');
const queries = require('./queries');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// Variables
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());

// Create middleware for checking the JWT
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://branapps.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: 'https://branapps.auth0.com/api/v2/', //replace with your API's audience, available at Dashboard > APIs
  issuer: 'https://branapps.auth0.com/',
  algorithms: [ 'RS256' ]
});

// Enable the use of request body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup routes
app.get('/', (req, res) => {
  res.send('Hii');
});

app.get('/users', checkJwt, (req, res) => queries.getUsers(req, res));
app.post('/user', (req, res) => queries.createUser(req, res));

// Enable listening on port
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});
