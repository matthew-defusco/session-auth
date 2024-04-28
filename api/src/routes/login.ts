import { Router } from "express";
import { validate, loginSchema } from "../validation";
import { User } from "../models";
import { UnauthorizedError } from "../errors";
import { logIn, logOut } from "../auth";
import { auth, guest } from "../middleware";

const router = Router();

router.post("/login", guest, async (req, res, next) => {
  try {
    await validate(loginSchema, req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await user.matchesPassword(password))) {
      throw new UnauthorizedError("Incorrect email or password");
    }

    logIn(req, user.id);

    res.json({ message: "Logged in" });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    await logOut(req, res);
    res.json({ message: "OK" });
  } catch (error) {
    next(error);
  }
});

export default router;
