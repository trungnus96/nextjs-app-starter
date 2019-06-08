import express from "express";
import next from "next";
import compression from "compression";
import helmet from "helmet";
import bodyparser from "body-parser";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    const server = express();

    // use helmet, compress, bodyParser.json
    // set routes
    server.use(helmet());
    server.use(compression());
    server.use(bodyparser.json());

    server.use(
      "/static",
      express.static(__dirname + "/static", { maxAge: "1d" })
    );

    server.get("*", (req, res) => {
      return handler(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on port ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
