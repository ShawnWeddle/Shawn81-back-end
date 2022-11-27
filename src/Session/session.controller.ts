import { Request, Response } from "express";
import config from "config";
import { createSession, findSessions, updateSession } from "./session.service";
import { validatePassword } from "../User/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response){
  try {
    const user = await validatePassword(req.body);

    if(!user){
      throw new Error("Invalid username or password");
    }

    const session = await createSession(user._id);

    const accessToken = signJwt(
      {...user, session: session._id },
      {expiresIn: config.get("accessTokenTtl")} // 15m
    );

    const refreshToken = signJwt(
      {...user, session: session._id },
      {expiresIn: config.get("refreshTokenTtl")} // 1y
    );

    const username = user.username;

    return res.send({ username, accessToken, refreshToken});

  } catch (error: any) {
    console.log(error);
    if(error.message === "Invalid username or password"){
      return res.status(401).send({error: {type:"loginError", message: "Invalid username or password"}});
    }
    return res.status(401).send({error: error.message});
  }
}

  

export async function getUserSessionsHandler(req: Request, res: Response){
  const userId = res.locals.user._id;

  const sessions = await findSessions({user: userId, valid: true});

  return res.send(sessions);
}

export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({_id: sessionId}, {valid: false});

  return res.send({
    accessToken: null,
    refreshToken: null
  });
}