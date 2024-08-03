import SensorsModel from "../models/SensorsModel.js";
(async () => {
    console.log(await SensorsModel.getAllSensors());
    console.log(await SensorsModel.getSpecifySensor(1));
})();
