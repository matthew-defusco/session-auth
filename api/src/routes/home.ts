import { NextFunction, Request, Response, Router } from "express";
import { User } from "../models";
import { auth } from "../middleware";

const router = Router();

router.get(
  "/home",
  auth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.session.userId);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
