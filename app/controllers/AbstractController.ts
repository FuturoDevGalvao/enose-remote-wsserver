import View from "../utils/View.js";

export default abstract class AbstractController {
  static get(): any {}

  static render(data: any): string {
    return View.render(data);
  }
}
