import express from "express";
import config from "config";
import cors from "cors";
import connect from "./utils/connect";
import logger from "./utils/logger";
import userRoutes from "./User/user.routes";
import sessionRoutes from "./Session/session.routes";
import productRoutes from "./Product/product.routes";
import messageRoutes from "./Message/message.routes";

import deserializeUser from "./middleware/deserializeUser";

const port = config.get<number>("port");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080"
  })
)

app.use(express.json());

app.use(deserializeUser);

app.listen(port, async ()=> {
  logger.info(`App is running at http://localhost:${port}`);

  await connect();

  userRoutes(app);
  sessionRoutes(app);
  productRoutes(app);
  messageRoutes(app);
});