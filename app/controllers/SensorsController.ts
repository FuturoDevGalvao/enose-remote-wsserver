import Sensor from "../database/entities/Sensor.js";
import SensorsModel from "../models/SensorsModel.js";
import AbstractController from "./AbstractController.js";

export default class SensorController extends AbstractController {
  static async get(id?: number): Promise<Array<Sensor> | Sensor> {
    if (id) return await SensorsModel.getSpecifySensor(id);

    return await SensorsModel.getAllSensors();
  }
}
