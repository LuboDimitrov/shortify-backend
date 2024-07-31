import {UrlRepository} from "../repository/url-repository";

export class UrlService {
    private urlRepository: UrlRepository;

    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async createShortUrl(originalUrl: string): Promise<string> {
        return await this.urlRepository.createShortUrl(originalUrl);
    }

    async getUrlByCode(code: string): Promise<string | null> {
        return this.urlRepository.getUrlByCode(code);
    }
}
