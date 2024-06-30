import { ZodIssue } from "zod";

type ActionResult<T> =
  | { status: "sucess"; data: T }
  | { status: "error"; error: string | ZodIssue[] };
