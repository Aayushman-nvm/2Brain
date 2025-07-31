import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { Users } from "../model/user";

interface SafeUser {
  _id: string;
  name: string;
  email: string;
}

export async function handleLogin(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user._id.toString(), name: user.name },
      process.env.SECRET as string
    );

    const finalUser:SafeUser = {
        _id:user._id.toString(),
        name:user.name,
        email:user.email,
    }

    res.json({ token, user: finalUser });
  } catch (error) {
    res.status(500).json({ error: "Login failed", detail: error });
  }
}

export async function handleLogout(req: Request, res: Response): Promise<void> {
  // Server-side logout is usually stateless for JWT
  res.json({ token: null });
}

export async function handleRegister(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      name,
      email,
      password: passwordHash,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Registration failed", detail: error });
  }
}
