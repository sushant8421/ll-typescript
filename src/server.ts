// create express server listening on port 2700
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import parkingLot from "./index";

const app = express();
app.use(bodyParser.json());
const port = 2700;

app.post("/parking-lot", (req: Request, res: Response) => {
  console.log("request body is : ", req.body);
  res.send(parkingLot(req.body.vehicle));
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
