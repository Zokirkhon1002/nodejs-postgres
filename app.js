const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ state: true, message: "it's working perfectly" });
});

// initials routes
const routes = require("./routes");
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
