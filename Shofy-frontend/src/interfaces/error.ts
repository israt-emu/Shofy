//type defining for error'
export interface IErrorProps {
  message: string;
}
export interface IError {
  data: {
    errorMessages?: string[];
    message?: string;
  };
}
