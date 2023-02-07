import BugModel, { BugInput } from "./bug.model";

export async function createBug(input: BugInput) {
  return BugModel.create(input);
}