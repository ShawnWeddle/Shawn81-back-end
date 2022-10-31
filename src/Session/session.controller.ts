import { Request, Response } from "express";
import config from "config";
import { createSession, findSessions, updateSession } from "./session.service";
import { validatePassword } from "../User/user.service";
import { signJwt } from "../utils/jwt.utils";

export async function createUserSessionHandler(req: Request, res: Response){
  const user = await validatePassword(req.body);

  if(!user){
    return res.status(401).send("Invalid email or password");
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

  return res.send({accessToken, refreshToken});
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