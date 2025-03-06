import { Book, Versicle, Version } from "../entities";
import { UserData } from "../entities/user.types";
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export type UserResponse =  ApiResponse<UserData>
export type BooksResponse = ApiResponse<Book[]>;
export type VersicleResponse = ApiResponse<Versicle>;
export type VersionsResponse = ApiResponse<Version[]>;
export type ExplanationResponse = ApiResponse<string>;
