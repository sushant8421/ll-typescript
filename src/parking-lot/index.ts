import {
  createParkingLot,
  getFreeSlotsPerParkingLot,
  getOccupiedSlotsPerParkingLot,
  parkVehicle,
} from "./parking-lot";

const parkingLot = (vehicle: string) => {
  const parkingLot = createParkingLot("abcd_park_lot", "Parking Lot 1", 2, 5);

  console.log(
    `your parking lot ticket is : ${parkVehicle(parkingLot, vehicle)}`
  );
  console.log(parkVehicle(parkingLot, "Truck"));
  console.log(parkVehicle(parkingLot, "Byke"));
  console.log(parkVehicle(parkingLot, "Car"));
  console.log(parkVehicle(parkingLot, "Truck"));
  console.log(parkVehicle(parkingLot, "Byke"));
  console.log(parkVehicle(parkingLot, "Byke"));

  console.log(
    `free slots: ${JSON.stringify(
      getFreeSlotsPerParkingLot(parkingLot),
      null,
      2
    )}`
  );

  console.log(
    `occupied slots: ${JSON.stringify(
      getOccupiedSlotsPerParkingLot(parkingLot),
      null,
      2
    )}`
  );
};

export default parkingLot;

parkingLot("Truck");
