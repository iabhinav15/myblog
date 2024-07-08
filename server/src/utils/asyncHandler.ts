// Purpost: This file is used to handle async functions in a more cleaner way

import { NextFunction, Request, Response } from "express"

const asyncHandler = (requestHandler: (req: Request, res: Response, next: NextFunction)=>void) => {
  return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}


export { asyncHandler }
