import express from "express";
import config from "config";
import cors from "cors";
import connect from "./utils/connect";
import logger from "./utils/logger";
import userRoutes from "./User/user.routes";
import sessionRoutes from "./Session/session.routes";
import messageRoutes from "./Message/message.routes";
import bugRoutes from "./Bug/bug.routes";

import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(
  cors({
    origin: "https://shawn81-front-end.onrender.com"
  })
)

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async ()=> {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  userRoutes(app);
  sessionRoutes(app);
  messageRoutes(app);
  bugRoutes(app);
});

