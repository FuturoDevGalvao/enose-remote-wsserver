import SensorsModel from "../models/SensorsModel.js";
import AbstractController from "./AbstractController.js";
export default class SensorController extends AbstractController {
    static async get(id) {
        if (id)
            return await SensorsModel.getSpecifySensor(id);
        return await SensorsModel.getAllSensors();
    }
    static async insert(reading) {
        SensorsModel;
        return false;
    }
    // Função para lidar com as requisições relacionadas a /sensors
    static async handleSensorRequests(ws, queryParams, message) {
        try {
            if (this.isJSON(message)) {
                const readings = JSON.parse(message);
                const readingInserted = await SensorController.insert(readings);
                ws.send(JSON.stringify({
                    status: readingInserted ? 200 : 500,
                    message: readingInserted
                        ? "Success on insert readings"
                        : "Failed to insert readings",
                }));
            }
            else {
                const sensorId = queryParams?.id ? Number(queryParams.id) : undefined;
                const sensors = sensorId
                    ? await SensorController.get(sensorId)
                    : await SensorController.get();
                ws.send(SensorController.render(sensors));
            }
        }
        catch (error) {
            ws.send(JSON.stringify({
                status: 500,
                error: `Failed to handle sensor request: ${error.message}`,
            }));
            console.error(error);
        }
    }
    // Função auxiliar para verificar se uma string é JSON válido
    static isJSON(str) {
        try {
            JSON.parse(str);
            return true;
        }
        catch (e) {
            return false;
        }
    }
}
