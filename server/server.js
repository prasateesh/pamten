const express = require('express');
const app = express();
const cors = require('cors');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

// configure cors
app.use(cors());

// configure express to accept the form data
app.use(express.json());
app.use(express.urlencoded({extended : false}));

// configure dotEnv
dotEnv.config({path : './config/config.env'});

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

// configure mongodb
mongoose.connect(process.env.MONGO_DB_LOCAL_URL , {
  useNewUrlParser : true,
  useUnifiedTopology : true,
  useFindAndModify : false,
  useCreateIndex : true
}).then((response) => {
  console.log('Connected to MongoDB Successfully....');
}).catch((error) => {
  console.error(error);
  process.exit(1); // stop the node js process if mongodb is failed to connect
});

// basic url
app.get('/', (request , response) => {
  response.status(200).send(`<h2>Welcome to Members Application Backend Server</h2>`);
});

// configure the router
app.use('/api', require('./routers/userRouter'));


// listen to port
app.listen(port, hostname, () => {
  console.log(`Express Server is started at http://${hostname}:${port}`);
});
