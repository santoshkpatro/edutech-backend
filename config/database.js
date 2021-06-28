const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("DB CONNECTED");
  } catch (error) {
    console.log(`ERROR IN DB CONNECTION ${error}`);
  }
};

module.exports = db;
