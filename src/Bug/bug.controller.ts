import { Request, Response } from "express";
import { CreateBugInput } from "./bug.schema";
import { createBug } from "./bug.service";

export async function createBugHandler(
  req: Request<{}, {}, CreateBugInput["body"]>, 
  res: Response
  ){
    const body = req.body;

    try {
      const bug = await createBug({...body});
      return res.send(bug);
    } catch (error: any) {
      return res.status(400).send({message: error.message});
    }
}

