import {number, object, string, TypeOf} from "zod";

const payload = {
  body: object({
    username: string({
      required_error: "Username is required"
    }),
    msg: string({
      required_error: "Message is required"
    }).max(500, "Message is too long"),
    color: string({
      required_error: "Description is required"
    }).regex(/^#[0-9A-F]{6}$/i, "Invalid color"),
    location: number({
      required_error: "Location uncertain"
    }).max(80, "Location is over 80").min(0, "Location is under 0").int("Location must be an integer")
  })
}

const idParams = {
  idParams: object({
    messageId: string({
      required_error: "Message ID is required"
    })
  })
}

const usernameParams = {
  usernameParams: object({
    username: string({
      required_error: "Username is required"
    })
  })
}

export const createMessageSchema = object({
  ...payload
});

export const updateMessageSchema = object({
  ...payload,
  ...idParams
});

export const getMessageSchema = object({
  ...idParams
});

export const getMessagebyUsernameSchema = object({
  ...usernameParams
});

export const deleteMessageSchema = object({
  ...idParams
});

export type CreateMessageInput = TypeOf<typeof createMessageSchema>;
export type UpdateMessageInput = TypeOf<typeof updateMessageSchema>;
export type ReadMessageInput = TypeOf<typeof getMessageSchema>;
export type ReadMessageUsernameInput = TypeOf<typeof getMessagebyUsernameSchema>;
export type DeleteMessageInput = TypeOf<typeof deleteMessageSchema>;