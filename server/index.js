let express = require("express");
let productRouter = require("./routers/productRoutes")
let mongoose = require("mongoose")
let userRouter = require("./routers/userRouter");
var cors = require('cors')

let corsOptions = {
  origin:"http://localhost:5173"
}

let app = express();
app.use(cors(corsOptions))
app.use(express.json());
app.use("/products",productRouter);
app.use("/user",userRouter);

function connectMongo() {
    let url =
    // "mongodb+srv://gopalchoudhary493:gopal@nodejs-e-commerce.4wsmbqx.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-e-commerce";
    "mongodb://localhost/e-commerce"
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to mongodb");
    })
    .catch((error) => {
      console.log(error);
      console.log("Something went wrong while conmnection db");
    });
}

app.listen(9000, ()=>{
    console.log("Server started");
    connectMongo();
})