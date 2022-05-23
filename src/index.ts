import {
  createParkingLot,
  getFreeSlotsPerParkingLot,
  getOccupiedSlotsPerParkingLot,
  parkVehicle,
} from "./parking-lot";

const parkingLot = createParkingLot("abcd_park_lot", "Parking Lot 1", 2, 5);

console.log(parkVehicle(parkingLot, "Truck"));
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
