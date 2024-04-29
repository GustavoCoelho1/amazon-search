import { Request, Response } from "express";
import ScrapeService from "../service/scrapeService";
import ValidationException from "../exception/ValidationException";

export default class ScrapeController {
    constructor(private scrapeService: ScrapeService) {}

    handle = async (req: Request, res: Response) => {
        try {
            const keyword = req.query.keyword as string;
            const response =
                await this.scrapeService.getProductsDataFromKeyword(keyword);

            return res.status(200).json(response);
        } catch (err) {
            if (err instanceof ValidationException) {
                return res.status(500).json({ error: err.message });
            } else {
                return res.status(500).json({ error: "Internal server error" });
            }
        }
    };
}
