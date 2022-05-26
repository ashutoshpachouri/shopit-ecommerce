const mongoose = require("mongoose");
module.exports = connect = async () => {
  try {
    const response = await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Yes Your Connection Is Established");
  } catch (error) {
    console.log(error);
  }
};
