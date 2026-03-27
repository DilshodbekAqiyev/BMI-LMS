import { Request } from "express";
import { IUser } from "../models/user.model";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser;
//     }
//   }
// }

export interface AuthRequest extends Request {
  user?: IUser;
}

export {};
