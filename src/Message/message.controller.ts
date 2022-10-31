import { Request, Response } from "express";
import { CreateMessageInput, UpdateMessageInput, ReadMessageInput, DeleteMessageInput } from "./message.schema";
import { createMessage, deleteMessage, findMessage, findAndUpdateMessage, findAllMessages } from "./message.service";

export async function createMessageHandler(
  req: Request<{}, {}, CreateMessageInput["body"]>, 
  res: Response
  ){
    const userId = res.locals.user._id;
    const body = req.body;

    try {
      const message = await createMessage({...body, user: userId});
      return res.send(message);
    } catch (error: any) {
      return res.status(400).send({message: error.message});
    }
}

export async function getMessageHandler(
  req: Request<ReadMessageInput["params"]>, 
  res: Response
  ){
    const messageId = req.params.msgId;

    const message = await findMessage({messageId});

    if(!message){
      return res.sendStatus(404);
    }

    return res.send(message);
}

export async function getAllMessagesHandler(
  req: Request, 
  res: Response
  ){
    const messages = await findAllMessages();

    if(!messages){
      return res.sendStatus(404);
    }

    return res.send(messages);
}

export async function updateMessageHandler(
  req: Request<UpdateMessageInput["params"]>,
  res: Response
  ){
    const userId = res.locals.user._id;
    const messageId = req.params.msgId;
    const update = req.body;

    const message = await findMessage({messageId});

    if(!message){
      return res.sendStatus(404);
    }

    if(String(message.user) !== userId){
      return res.sendStatus(403);
    }

    const updatedMessage = await findAndUpdateMessage({messageId}, update, {new: true});

    return res.send(updatedMessage);
}

export async function deleteMessageHandler(
  req: Request<DeleteMessageInput["params"]>,
  res: Response
  ) {
    const userId = res.locals.user._id;
    const messageId = req.params.msgId;

    const message = await findMessage({messageId});

    if(!message){
      return res.sendStatus(404);
    }

    if(String(message.user) !== userId){
      return res.sendStatus(403);
    }

    await deleteMessage({messageId});

    return res.sendStatus(200);
}