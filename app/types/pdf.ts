export interface GeneratePdfRequest {
  url: string;
}

export interface ValidationError {
  message: string;
  property?: string;
}
