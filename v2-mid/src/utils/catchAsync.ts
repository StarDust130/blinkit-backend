import {Request , Response , NextFunction} from "express"

// This wrapper takes your controller function and protects it
export const catchAsync = (fn:Function) => {
    return(req:Request , res: Response , next: NextFunction) => {
      // Run the controller. If it crashes (.catch), send the error to the Janitor (next)
      Promise.resolve(fn(req, res, next)).catch(next);
    }
}