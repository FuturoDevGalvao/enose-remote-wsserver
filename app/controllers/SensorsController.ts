import Sensor from "../database/entities/Sensor.js";
import SensorsModel from "../models/SensorsModel.js";
import AbstractController from "./AbstractController.js";

export default class SensorController extends AbstractController {
  static async get(id?: number): Promise<Array<Sensor> | Sensor> {
    if (id) return await SensorsModel.getSpecifySensor(id);

    return await SensorsModel.getAllSensors();
  }

  static async insert(reading: any): Promise<boolean> {
    SensorsModel;
    return false;
  }

  // Função para lidar com as requisições relacionadas a /sensors
  static async handleSensorRequests(ws: any, queryParams: any, message: any) {
    try {
      if (this.isJSON(message)) {
        const readings = JSON.parse(message);
        const readingInserted = await SensorController.insert(readings);

        ws.send(
          JSON.stringify({
            status: readingInserted ? 200 : 500,
            message: readingInserted
              ? "Success on insert readings"
              : "Failed to insert readings",
          })
        );
      } else {
        const sensorId = queryParams?.id ? Number(queryParams.id) : undefined;
        const sensors = sensorId
          ? await SensorController.get(sensorId)
          : await SensorController.get();
        ws.send(SensorController.render(sensors));
      }
    } catch (error: any) {
      ws.send(
        JSON.stringify({
          status: 500,
          error: `Failed to handle sensor request: ${error.message}`,
        })
      );
      console.error(error);
    }
  }

  // Função auxiliar para verificar se uma string é JSON válido
  private static isJSON(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}
