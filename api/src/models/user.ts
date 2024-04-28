import { Schema, model, Document } from "mongoose";
import { compare, hash } from "bcryptjs";
import { BCRYPT_WORK_FACTOR } from "../config";

export interface UserDocument extends Document {
  email: string;
  name: string;
  password: string;
  matchesPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    email: String,
    name: String,
    password: String,
  },
  { timestamps: true }
);

// Hashes the password before saving it to DB
userSchema.pre<UserDocument>("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR);
  }
});

// Appends a method to an instance of user to compare password with hash
userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password);
};

// Makes sure that the password and __v fields are never accessed when querying
userSchema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }, options) => rest,
});
export const User = model<UserDocument>("User", userSchema);
