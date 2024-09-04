import { Response } from "express";

const Error = (res: Response, code: number, error_code: string, message: string, errorData?: any) => {
  return res.status(code).send({
      error: {
        error_code,
        message,
        errorData,
        timestamp: new Date().toISOString(),
      }
  });
}

export default Error;