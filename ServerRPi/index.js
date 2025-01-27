import express from "express";
const app = express();
import fs from "fs";
const PORT = 3000;

const TEMP_SENSOR_PATH = "/sys/bus/w1/devices/<sensor-folder>/w1_slave";

async function parseSensorDataToTemperature(data) {
  const lines = data.split("\n");

  if (!lines[0].includes("YES") || !lines[1] || !lines[1].includes("t=")) {
    throw new Error("Sensor check failed or invalid temperature data");
    return;
  }

  const sensorTemperatureString = lines[1].split("t=")[1];
  const sensorTemperature = parseInt(sensorTemperatureString, 10) / 1000;

  console.log(sensorTemperature);
  return sensorTemperature;
}

async function readSensorTemperature(req, res, next) {
  fs.promises
    .readFile(TEMP_SENSOR_PATH, "utf8")
    .then((data) => {
      return parseSensorDataToTemperature(data);
    })
    .then((sensorTemperature) => {
      req.temperature = sensorTemperature;

      next();
    })
    .catch((err) => {
      next(err);
    });
}

app.get("/", (req, res, next) => {
  res.send("Message from RPi server");
});

app.get("/temperature-data", readSensorTemperature, (req, res) => {
  res.json({ temperature: `${req.temperature}°C` });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`ServerRPi is listening on port ${PORT}`);
});
