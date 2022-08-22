export interface IUserService {
  createUser(email: string, password: string, name: string): Promise<NewUserType | null>;
  loginUser(email: string, password: string): Promise<UserAuthorizationType | null>;
  getUser(): Promise<NewUserType | null>;
  updateUser(email: string, password: string, name: string): Promise<UpdateUserType | null>;
  deleteUser(): Promise<void>;
  getNewUserTokens(): Promise<NewTokenType | null>;
  // updateCar(id: number, name: string, color: string): Promise<void | {totalCount: string | null; data: CarType; }>;
  // getCars(page: number, limit: number): Promise<void | {totalCount: string | null; data: CarType[]; }>;
  // deleteCar(id: number): void;
}

export type UserType = {
  email: string;
  password: string;
  name: string;
};

export type NewUserType = {
  id: string;
  email: string;
};

export type LoginBodyType = {
  email: string;
  password: string;
}

export type UserAuthorizationType = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};

export type UpdateUserType = {
  id: string;
  email: string;
  name: string;
};

export type NewTokenType = {
  token: string;
  refreshToken: string;
};

export type UserWordBodyType = {
  difficulty: string,
      optional: {
        learned: boolean,
        correctAnswersSuccessively: number,
        attempts: number
      }
};

export type optionalType = {
  learned: boolean,
  correctAnswersSuccessively: number,
  attempts: number
}

export type UserWordType = {
    id: string,
    difficulty: string,
    optional: optionalType,
    wordId: string
}
