import { Request, Response } from "express";
import { getUserByToken } from "../helper/getUserByToken";
import { UserModel } from "../models/models";

interface UserInterface {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}

export const update = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const user = (await getUserByToken(token)) as UserInterface;
    if (!user || !user._id) {
      return res.status(401).json({
        msg: "User not authenticated",
        error: true,
      });
    }

    const { name, profile_pic } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      {
        name,
        profile_pic,
      },
      { new: true }
    ).lean().exec();

    if (!updatedUser) {
      return res.status(404).json({
        msg: "User not found",
        error: true,
      });
    }

    return res.status(202).json({
      msg: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    return res.status(502).json({
      msg: error.message || error,
      error: true,
    });
  }
};