import { app } from "../app";
import userRouter from "./user.route";
import courseRouter from "./course.route";

class Routes {
  constructor() {}

  router() {
    app.use("/api/v1/auth", userRouter);
    app.use("/api/v1/course", courseRouter);
  }
}

export default new Routes();
