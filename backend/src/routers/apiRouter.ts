import BaseRouter from "../utils/baseRouter";

export default class ApiRoute extends BaseRouter {
  constructor() {
    super("/api");

    this.router.get("/", (req, res) => {
      res.status(200).json({ status: "hello, world!" });
    });
  }
}
