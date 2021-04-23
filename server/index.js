import express from "express";
import next from "next";
require("dotenv").config();

// configure express
import configureExpressApp from "./configureExpressApp";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// api
import api from "./api";

app.prepare().then(async () => {
  const server = express();

  configureExpressApp(server);

  // api routes
  server.use("/api", api);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Ready on port ${port}`);
  });
});
