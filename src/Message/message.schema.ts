import {number, object, string, TypeOf} from "zod";

const payload = {
  body: object({
    username: string({
      required_error: "Username is required"
    }),
    msg: string({
      required_error: "Message is required"
    }).max(500, "Message is too long"),
    location: number({
      required_error: "Location uncertain"
    }).max(80, "Location is over 80").min(0, "Location is under 0").int("Location must be an integer")
  })
}

const params = {
  params: object({
    messageId: string({
      required_error: "Message ID is required"
    })
  })
}

export const createMessageSchema = object({
  ...payload
});

export const updateMessageSchema = object({
  ...payload,
  ...params
});

export const getMessageSchema = object({
  ...params
});

export const deleteMessageSchema = object({
  ...params
});

export type CreateMessageInput = TypeOf<typeof createMessageSchema>;
export type UpdateMessageInput = TypeOf<typeof updateMessageSchema>;
export type ReadMessageInput = TypeOf<typeof getMessageSchema>;
export type DeleteMessageInput = TypeOf<typeof deleteMessageSchema>;