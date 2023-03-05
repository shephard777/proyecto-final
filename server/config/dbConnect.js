const mongoose = require("mongoose");

//Conexion a la base de datos

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      "mongodb+srv://shephardcoding:ferna7778910@income-express.ub9ngox.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("La conexion a la base de datos ha sido exitosa");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

dbConnect();
