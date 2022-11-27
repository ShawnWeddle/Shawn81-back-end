import {object, string, TypeOf} from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Name is required"
    }).min(3, "Username must be at least three characters").max(24, "Username can not be over 24 characters"),
    password: string({
      required_error: "Password is required"
    }).min(8, "Password too short").max(64, "Password too long"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required"
    })
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
  })
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;