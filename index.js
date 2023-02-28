const mongoose = require("mongoose");
const app = require("./src/app");
require("dotenv").config();

let port = process.env.PORT;
let DBurl = process.env.DATABASE_URL;
// console.log(DBurl);

mongoose.connect(DBurl).then((err)=>{
    console.log("connected to DB");
    
}).catch((err)=>console.log(err.message));

app.listen(port,()=>{
    console.log("connected to " + port);
})