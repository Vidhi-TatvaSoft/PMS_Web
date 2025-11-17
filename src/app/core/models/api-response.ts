export interface ApiResponse<T> {
  isSuccess: boolean,
  message: string,
  token:string|null,
  data: T
}
