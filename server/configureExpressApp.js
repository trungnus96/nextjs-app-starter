import express from "express";
import path from "path";
import logger from "morgan";
import compression from "compression";

export default (server) => {
  // logger
  server.use(logger("dev"));
  server.use(compression());

  // support parsing of application/json
  server.use(express.json());

  //support parsing of application/x-www-form-urlencoded post data
  server.use(express.urlencoded({ extended: true }));

  // view engine setup
  server.set("views", path.join(__dirname, "views"));
  server.set("view engine", "hjs");

  // static folders
  server.use(
    "/static",
    express.static(__dirname + "/../static", { maxAge: "1d" })
  );
};
