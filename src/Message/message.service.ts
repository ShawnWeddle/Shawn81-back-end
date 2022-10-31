import {FilterQuery, UpdateQuery, QueryOptions} from "mongoose";
import MessageModel, { MessageInput } from "./message.model";

export async function createMessage(input:MessageInput) {
  return MessageModel.create(input);
}

export async function findMessage(
  query:FilterQuery<MessageInput>,
  options: QueryOptions = {lean: true}
  ) {
  return MessageModel.findOne(query, {}, options);
}

export async function findAllMessages() {
  return MessageModel.find();
}

export async function findAndUpdateMessage(
  query:FilterQuery<MessageInput>,
  update: UpdateQuery<MessageInput>,
  options: QueryOptions
  ) {
  return MessageModel.findOneAndUpdate(query, update, options);
}

export async function deleteMessage(query: FilterQuery<MessageInput>) {
  return MessageModel.deleteOne(query);
}