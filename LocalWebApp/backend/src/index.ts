import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch";

dotenv.config();

const app: Express = express();

const PORT = process.env.BACK_PORT;
const HOST = process.env.BACK_HOST;
const R_PI_PORT = process.env.RPI_PORT;
const R_PI_HOST = process.env.RPI_HOST;

app.use(cors());

interface ExtendedRequest extends Request {
  pondData?: any;
}

function fetchPondData(req: ExtendedRequest, res: Response, next: NextFunction): any {
  fetch(`http://${R_PI_HOST}:${R_PI_PORT}/temperature-data`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      req.pondData = data;
      next();
    })
    .catch((err) => {
      next(err);
    });
}

app.get("/", (req: Request, resp: Response) => {
  resp.json({ backendMessage: "Hello there from backend server!" });
});

app.get("/pond-data", fetchPondData, (req: ExtendedRequest, res: Response) => {
  res.json(req.pondData);
});

//Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is up & running at http://${HOST}:${PORT}`);
});
function next(err: unknown) {
  throw new Error("Function not implemented.");
}
