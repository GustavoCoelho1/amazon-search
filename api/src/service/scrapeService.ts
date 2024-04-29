import ValidationException from "../exception/ValidationException";
import HttpService from "./httpService";
import { JSDOM } from "jsdom";
import dotenv from "dotenv";

dotenv.config();

export default class ScrapeService {
    amazonUrl = process.env.AMAZON_URL;

    constructor(private httpService: HttpService) {}

    getProductsDataFromKeyword = async (keyword: string) => {
        if (!keyword) throw new ValidationException("Keyword can not be null!");

        //Fetching data
        const url = `${this.amazonUrl}/s?k=${keyword}`;
        const searchResponse = await this.httpService.fetch(url);

        const dom = new JSDOM(searchResponse.data);

        //Transforming product data into objects
        const rawProducts = this.getProductElementsList(dom);
        const products = this.formatProductElementsList(rawProducts);

        return products;
    };

    getProductElementsList = (dom: JSDOM) => {
        const productElementsList = dom.window.document.querySelectorAll(
            `[data-component-type=s-search-result]`
        )!;

        if (productElementsList.length === 0)
            throw new ValidationException("No results for entered search");

        return productElementsList;
    };

    formatProductElementsList = (productElementsList: NodeListOf<Element>) => {
        const products: Product[] = [];

        productElementsList.forEach((product, idx) => {
            try {
                const title = this.getAmazonProductTitle(product);
                const rating = this.getAmagetAmazonProductRating(product);
                const imageUrl = this.getAmazonProductImageUrl(product);
                const link = this.getAmazonProductLink(product);
                const reviewsNumber =
                    this.getAmazonProductReviewsNumber(product);

                const data = {
                    title,
                    rating,
                    reviewsNumber,
                    imageUrl,
                    link,
                } as Product;

                products.push(data);
            } catch (err) {
                if (err instanceof ValidationException) {
                    throw new ValidationException(
                        `Error validating product ${idx + 1}: ${err.message}`
                    );
                }

                throw new Error(`Unknown error at product ${idx + 1}: ${err}`);
            }
        });

        return products;
    };

    getAmazonProductTitle = (productElement: Element) => {
        const title = productElement.querySelector(
            "[data-cy=title-recipe] h2 span"
        );

        if (!title)
            throw new ValidationException("The product title can not be null!");

        return title?.textContent;
    };

    getAmagetAmazonProductRating = (productElement: Element) => {
        const rawRatingElement = productElement.querySelector("i .a-icon-alt"); //Expected: 4,5 out of 5 stars

        if (!rawRatingElement) return 0; //Some products doesnt has rating

        const rawRating = rawRatingElement.textContent;

        //Formatting string for number conversion
        const rawRatingArr = rawRating?.split(" ")!;
        const rating = rawRatingArr[0].replace(",", "."); //The real rating will aways be displayed first, and with a ",". For converting the string to a number, the rating must have a "." in place of the ",", otherwise we will get a NaN.

        const ratingNumber = Number(rating);

        return ratingNumber;
    };

    getAmazonProductReviewsNumber = (productElement: Element) => {
        const reviewsNumberElement = productElement.querySelector(
            "span.a-size-base.s-underline-text"
        );

        if (!reviewsNumberElement) return 0; //Some products doesnt has reviews

        const reviewsNumberStr = reviewsNumberElement.textContent;

        const reviewsNumber = Number(reviewsNumberStr?.replace(",", "."));

        return reviewsNumber;
    };

    getAmazonProductImageUrl = (productElement: Element) => {
        const image = productElement.querySelector(
            "[data-component-type=s-product-image] img"
        );

        if (!image)
            throw new ValidationException("The product image can not be null!");

        const url = image?.getAttribute("src");

        return url;
    };

    getAmazonProductLink = (productElement: Element) => {
        const linkElement = productElement.querySelector(
            "[data-cy=title-recipe] h2 a"
        );

        if (!linkElement)
            throw new ValidationException("The product link can not be null");

        const productRoute = linkElement?.getAttribute("href");

        const link = `${this.amazonUrl}${productRoute}`;

        return link;
    };
}
