import {Express} from "express";
import validate from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createMessageSchema, getMessageSchema, updateMessageSchema, deleteMessageSchema } from "./message.schema";
import { createMessageHandler, getMessageHandler, updateMessageHandler, deleteMessageHandler, getAllMessagesHandler } from "./message.controller";

function messageRoutes(app: Express){
  app.post(
    "/api/messages",
    [requireUser, validate(createMessageSchema)],
    createMessageHandler
  );

  app.get(
    "/api/messages/:messageId",
    validate(getMessageSchema),
    getMessageHandler
  )

  app.put(
    "/api/messages/:messageId",
    [requireUser, validate(updateMessageSchema)],
    updateMessageHandler
  );

  app.delete(
    "/api/messages/:messageId",
    [requireUser, validate(deleteMessageSchema)],
    deleteMessageHandler
  )

  app.get(
    "/api/messages/",
    getAllMessagesHandler
  )
}

export default messageRoutes;