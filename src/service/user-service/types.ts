export interface IUserService {
  token: string;
  createUser(email: string, password: string): Promise<NewUserType | null>;
  loginUser(email: string, password: string): Promise<UserAuthorizationType | null>;
  getUser(id: string): Promise<NewUserType | null>;
  // updateCar(id: number, name: string, color: string): Promise<void | {totalCount: string | null; data: CarType; }>;
  // getCars(page: number, limit: number): Promise<void | {totalCount: string | null; data: CarType[]; }>;
  // deleteCar(id: number): void;
}

export type UserType = {
  email: string;
  password: string;
};

export type NewUserType = {
  id: string;
  email: string;
};

export type UserAuthorizationType = {
  message: string;
  token: string;
  userId: string;
};

export type EmptyBody = {};
