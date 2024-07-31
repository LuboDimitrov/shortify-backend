import {UrlService} from "../service/url-service";
import express, { Request, Response } from 'express';

const router = express.Router();
const urlService = new UrlService();

router.post('/shorten', async (req: Request, res: Response) => {
    try {
        if (!req.body.url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const { url } = req.body;

        const shortCode = await urlService.createShortUrl(url);

        res.json({ shortCode });
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});


router.get('/:code', async (req: Request, res: Response) => {
    try {
        const url = await urlService.getUrlByCode(req.params.code);
        if (url) {
            res.redirect(url);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

export default router;
