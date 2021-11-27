const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true,
    });
    //-- useCreateIndex: true,  //-- not supported w. Mongoose >= 6.0

    console.log(
      `config/db.js :: connectDB, MongoDB Connected: ${conn.connection.host}`
        .cyan.underline.bold
    );
  } catch (err) {
    console.log(`config/db.js :: connectDB, Error: ${err.message}`.red);
    process.exit(1); //1: failure, app shut down
  }
};

module.exports = connectDB;
