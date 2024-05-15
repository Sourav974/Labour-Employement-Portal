const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;

mongoose.connect(DB).then(() => {
  console.log('DB connection successfully!');
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening port ${port}`);
});
