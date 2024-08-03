import View from "../utils/View.js";
export default class AbstractController {
    static get() { }
    static render(data) {
        return View.render(data);
    }
}
