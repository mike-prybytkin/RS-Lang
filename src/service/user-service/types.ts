import { WordType } from '../words-service/types';

export interface IUserService {
  token: string;
  userId: string;
  refreshToken: string;
  createUser(email: string, password: string, name: string): Promise<NewUserType | null>;
  loginUser(email: string, password: string): Promise<UserAuthorizationType | null>;
  getUser(): Promise<NewUserType | null>;
  updateUser(email: string, password: string, name: string): Promise<UpdateUserType | null>;
  deleteUser(): Promise<void>;
  getNewUserTokens(): Promise<NewTokenType | null>;
  createDifficultUserWord(wordId: string): Promise<UserWordType | null>;
  createLearnedUserWord(wordId: string): Promise<UserWordType | null>;
  getUserWord(wordId: string): Promise<UserWordType | null>;
  getAllUserWords(): Promise<UserWordType[] | null>;
  updateUserWord(wordId: string, difficulty: string, optional: OptionalType): Promise<UserWordType | null>;
  deleteUserWord(wordId: string): Promise<void>;
  getAggregatedWords(group: number, wordsPerPage: number, filter?: string): Promise<AggregatedWordsType[] | null>;
  getAggregatedWord(wordId: string): Promise<WordType[] | null>;
}

export type UserType = {
  email: string;
  password: string;
  name: string;
};

export type NewUserType = {
  id: string;
  email: string;
  name: string;
};

export type LoginBodyType = {
  email: string;
  password: string;
};

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
  difficulty: string;
  optional: OptionalType;
};

export type OptionalType = {
  learned: boolean;
  successAnswersSequence: number;
  successAttempt: number;
  wrongAttempt: number;
};

export type UserWordType = {
  id: string;
  difficulty: string;
  optional: OptionalType;
  wordId: string;
};

export type AggregatedWordsType = {
  paginatedResults: WordType[];
  totalCount: { count: number }[];
};
