export interface IResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
