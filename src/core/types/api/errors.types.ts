export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export class BibleApiError extends Error {
  status: number;
  code?: string;
  details?: Record<string, any>;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "BibleApiError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}
