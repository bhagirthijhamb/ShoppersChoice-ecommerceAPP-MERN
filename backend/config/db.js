const mongoose = require ('mongoose');

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDB Connected. ${conn.connection.host}`.bgYellow)
  } catch(error){ 
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1)
  }
}

module.exports = connectDB;