import {FilterQuery, UpdateQuery, QueryOptions} from "mongoose";
import MessageModel, { MessageInput } from "./message.model";

export async function createMessage(input:MessageInput) {
  return MessageModel.create(input);
}

export async function findMessage(
  query: string
  ) {
  return MessageModel.findById(query);
}

export async function findMessageByUsername(
  query: FilterQuery<{username: string}>
){
  return MessageModel.findOne(query);
}

export async function findAllMessages() {
  return MessageModel.find();
}

export async function findAndUpdateMessage(
  query: string,
  update: UpdateQuery<MessageInput>,
  options: QueryOptions
  ) {
  return MessageModel.findByIdAndUpdate(query, update, options);
}

export async function deleteMessage(query: string) {
  return MessageModel.findByIdAndDelete(query);
}