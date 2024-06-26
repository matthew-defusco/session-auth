import { NextFunction, Request, Response } from "express";
import { isLoggedIn, logOut } from "../auth";
import { BadRequest, UnauthorizedError } from "../errors";
import { SESSION_ABSOLUTE_TIMEOUT } from "../config";

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new BadRequest("You are already logged in"));
  }

  next();
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!isLoggedIn(req)) {
    return next(new UnauthorizedError("You must be logged in!"));
  }

  next();
};

export const active = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (isLoggedIn(req)) {
    const now = Date.now();
    const { createdAt } = req.session;
    if (createdAt) {
      if (now > createdAt + SESSION_ABSOLUTE_TIMEOUT) {
        await logOut(req, res);
        return next(new UnauthorizedError("Session Expired"));
      }
    }
  }

  next();
};
