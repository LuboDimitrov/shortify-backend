import pool from '../database';
import {generateShortCode} from "../utils/shortenURL";

export class UrlRepository {
    async createShortUrl(originalUrl: string): Promise<string> {
        const existingShortCode = await this.findShortCodeByUrl(originalUrl);
        if (existingShortCode) {
            return existingShortCode;
        }

        const shortCode = generateShortCode();
        await pool.query('INSERT INTO urls(short_code, original_url) VALUES($1, $2)', [shortCode, originalUrl]);
        return shortCode;
    }

    async getUrlByCode(code: string): Promise<string | null> {
        const result = await pool.query('SELECT original_url FROM urls WHERE short_code = $1', [code]);
        return result.rows.length ? result.rows[0].original_url : null;
    }

    async findShortCodeByUrl(originalUrl: string): Promise<string | null> {
        const result = await pool.query('SELECT short_code FROM urls WHERE original_url = $1', [originalUrl]);
        return result.rows.length ? result.rows[0].short_code : null;
    }
}
