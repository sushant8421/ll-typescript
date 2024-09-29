// create parking lot

import { IFloor, IParkingLot, ISlot } from "./types";

const createFloor = (id: number, numberOfSlots: number) => {
  const floor: IFloor = {
    id,
    floor_number: id,
    slots: [],
  };
  for (let i = 0; i < numberOfSlots; i++) {
    if (i === 0) {
      floor.slots.push({
        id: i,
        floor_id: id,
        type: "Truck",
        is_occupied: false,
      });
    } else if (i === 1 || i === 2) {
      floor.slots.push({
        id: i,
        floor_id: id,
        type: "Byke",
        is_occupied: false,
      });
    } else {
      floor.slots.push({
        id: i,
        floor_id: id,
        type: "Car",
        is_occupied: false,
      });
    }
  }
  return floor;
};

export const createParkingLot = (
  id: string,
  name: string,
  numberOfFloors: number,
  numberOfSlotsInEachFlorr: number
): IParkingLot => {
  const floors: IFloor[] = [];
  for (let i = 0; i < numberOfFloors; i++) {
    const floor = createFloor(i, numberOfSlotsInEachFlorr);
    floors.push(floor);
  }
  return {
    id,
    name,
    floors,
  };
};

export const getFreeSlotsPerFloor = (floor: IFloor) => {
  const freeSlots: ISlot[] = [];
  floor.slots.forEach((slot) => {
    if (!slot.is_occupied) {
      freeSlots.push(slot);
    }
  });
  return freeSlots;
};

export const getFreeSlotsPerParkingLot = (parkingLot: IParkingLot) => {
  const freeSlots: ISlot[] = [];
  parkingLot.floors.forEach((floor) => {
    const freeSlotsPerFloor = getFreeSlotsPerFloor(floor);
    freeSlots.push(...freeSlotsPerFloor);
  });
  return freeSlots;
};

export const getOccupiedSlotsPerFloor = (floor: IFloor) => {
  const occupiedSlots: ISlot[] = [];
  floor.slots.forEach((slot) => {
    if (slot.is_occupied) {
      occupiedSlots.push(slot);
    }
  });
  return occupiedSlots;
};

export const getOccupiedSlotsPerParkingLot = (parkingLot: IParkingLot) => {
  const occupiedSlots: ISlot[] = [];
  parkingLot.floors.forEach((floor) => {
    const occupiedSlotsPerFloor = getOccupiedSlotsPerFloor(floor);
    occupiedSlots.push(...occupiedSlotsPerFloor);
  });
  return occupiedSlots;
};

export const parkVehicle = (parkingLot: IParkingLot, vehicleType: string) => {
  for (let i = 0; i < parkingLot.floors.length; i++) {
    const freeSlots = getFreeSlotsPerFloor(parkingLot.floors[i]);
    const slot = freeSlots.find((slot) => slot.type === vehicleType);
    if (slot) {
      slot.is_occupied = true;
      return `${parkingLot.id}_${parkingLot.floors[i].id}_${slot.id}`;
    }
  }
  return `No slot available for ${vehicleType}`;
};

// export default { createParkingLot, getFreeSlotsPerParkingLot, parkVehicle };
