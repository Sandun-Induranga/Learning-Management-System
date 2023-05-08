import { RequestHandler, Request, Response } from "express";
import { User } from "../models/User";

export default class UserController {
  userLogin: RequestHandler = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ username: username });
      if (user) {
        if (user.password == password) {
          return res
            .status(200)
            .json({
              message: "Login",
              responseData: { username: username, role: user.role },
            });
        } else {
          return res.status(200).json({
            message: "Your Password is Wrong..!",
            responseData: user.role,
          });
        }
      } else {
        return res
          .status(200)
          .json({ message: "Your Username is Wrong..!", responseData: "" });
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        return res.status(500).json({ message: error.message });

      return res.status(500).json({ message: "Unknown Error Occured..!" });
    }
  };
}
