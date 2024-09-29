// slot type

export interface ISlot {
  id: number;
  type: string;
  floor_id: number;
  is_occupied: boolean;
}

export interface IFloor {
  id: number;
  floor_number: number;
  slots: ISlot[];
}

// parking lot
export interface IParkingLot {
  id: string;
  name: string;
  floors: IFloor[];
}

export interface IMatchingCriteria {
  ageGroup: string;
  educationLevel: string;
  salaryRange: string;
  caste: string;
  religion: string;
}

// user profile
export interface IUserProfile {
  id: string;
  name: string;
  gender: string;
  age: number;
  education: string;
  salary: string;
  caste: string;
  religion: string;
  matchingCriteria: IMatchingCriteria;
}
