const mongoose = require('mongoose');
const dotenv = require('dotenv');

const db = process.env.DATABASE;
// ('mongodb+srv://itfever2743:saifi143@dreamdesigners.xpmc2rk.mongodb.net/mernproject?retryWrites=true&w=majority');
dotenv.config({ path: './config.env' });
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log(err);
  });
