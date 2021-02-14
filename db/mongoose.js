const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  retryWrites: false,
});
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${process.env.MONGODB_URI}`);
});
// mongoose.set('debug', true);

console.log("Conectado a Mongo!");
