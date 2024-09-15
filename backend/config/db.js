// const mongoose = require('mongoose')

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI)
//     console.log(
//       `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
//     )
//   } catch (error) {
//     console.log(`Error: ${error.message}`.red.underline.bold)
//     process.exit(1) // exit process with failure
//   }
// }

// module.exports = connectDB
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = 'mongodb://localhost:27017/myapp'; // Replace with your actual URI
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1); // exit process with failure
  }
};

module.exports = connectDB;

