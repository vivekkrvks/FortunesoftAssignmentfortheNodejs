require('dotenv').config()

module.exports = {
  mongoURL: process.env.MONGO_URL,
  secret: process.env.MONGO_SECRET,
  
};
