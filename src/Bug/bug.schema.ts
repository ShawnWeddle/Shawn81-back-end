import {object, string, TypeOf} from "zod";

export const createBugSchema = object({
  body: object({
    msg: string({
      required_error: "Message is required"
    }).max(500, "Message is too long")})
});

export type CreateBugInput = TypeOf<typeof createBugSchema>;