import { Router } from "express";
import { registerSchema, validate } from "../validation";
import { User } from "../models";
import { logIn } from "../auth";
// Can use catchAsync as well but it's harder to understand than just a try/catch here
import { guest, catchAsync } from "../middleware";
import { BadRequest } from "../errors";

const router = Router();

router.post("/register", guest, async (req, res, next) => {
  try {
    await validate(registerSchema, req.body);

    const { email, name, password } = req.body;

    const found = await User.exists({ email });

    if (found) {
      throw new BadRequest("Invalid email");
    }

    const user = await User.create({ email, name, password });

    logIn(req, user.id);

    res.json({ message: "OK" });
  } catch (err) {
    next(err);
  }
});

export default router;
