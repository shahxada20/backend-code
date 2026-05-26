const dns = require('dns');
dns.setServers(["1.1.1.1", "8.8.8.8"]);
//require("dotenv").config();

const connectDB = require("./config/db");
const app = require("./src/app")

const PORT = process.env.PORT || 5500;

connectDB()

app.get("/", (req, res) => {
    res.send("Hello World");
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})