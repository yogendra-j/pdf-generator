export interface GeneratePdfRequest {
  url: string;
}

export interface ErrorResponse {
  error: string;
}

export interface ValidationError {
  message: string;
  property?: string;
}
