import { Response } from "express";

const Success = (res: Response, _code: number, code: string, message: string, data?: any) => {
  return res.send({
    _code,
    code,
    message,
    data
  });
}

export default Success;