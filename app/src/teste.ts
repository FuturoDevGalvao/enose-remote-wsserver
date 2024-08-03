import SensorsModel from "../models/SensorsModel.js";
import UserModel from "../models/UserModel.js";

(async () => {
  console.log(await SensorsModel.getAllSensors());
  console.log(await SensorsModel.getSpecifySensor(1));
})();
