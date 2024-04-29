import { Router } from "express";
import ScrapeController from "../controller/scrapeController";
import HttpService from "../service/httpService";
import ScrapeService from "../service/scrapeService";

const router = Router();

const httpService = new HttpService();
const scrapeService = new ScrapeService(httpService);
const scrapeController = new ScrapeController(scrapeService);

router.get("/scrape", scrapeController.handle);

export default router;
