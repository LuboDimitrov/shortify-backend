import { Request, Response } from 'express';
import app from "../index";

export default (req: Request, res: Response): void => {
    app(req, res);
}
