const express = require("express");
const dotenv = require("dotenv");

class Server {
  constructor() {
    this.app = express();
    this.setupEnvironment();
  }

  setupEnvironment() {
    dotenv.config();
    this.port = process.env.PORT || 4000;
    this.configureExpress();
  }

  configureExpress() {
    this.app.use(express.json());
    this.setupRootRoute();
  }

  setupRootRoute() {
    this.app.get("/", (req, res) => {
      res.status(200).json({ success: true, message: "Server is working perfectly" });
    });
    this.setupRoutes();
  }

  setupRoutes() {
    this.app.use("/api", require("./routes"));
    this.startServer();
  }

  startServer() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`);
    });
  }
}

new Server();
