import SensorsModel from "../models/SensorsModel.js";
import { AbstractController } from "./AbstractController.js";

export default class SensorController extends AbstractController {
  static get(id?: number): any {
    if (id) return SensorsModel.getEspecifySensor(id);

    return SensorsModel.getAllSensors();
  }
}
