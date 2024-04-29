const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchButton = document.getElementById(
    "search-button"
) as HTMLButtonElement;
const resultsContainer = document.getElementById(
    "results-container"
) as HTMLDivElement;
const blankSlate = document.getElementById("blank-slate") as HTMLDivElement;

interface Product {
    title: string;
    rating: number;
    reviewsNumber: number;
    imageUrl: string;
    link: string;
}

const searchForm = document.getElementById("search-form") as HTMLFormElement;

const createStarsRatingElement = (rating: number) => {
    const fullStarElement = `<img src="assets/full-star.svg" alt="" />`;
    const halfStarElement = `<img src="assets/half-star.svg" alt="" />`;
    const emptyStarElement = `<img src="assets/empty-star.svg" alt="" />`;

    const starsArr = [] as string[];

    //A algorithm that fullfill the stars automatically
    let ratingCounter = rating;

    for (let x = 1; x <= 5; x++) {
        if (ratingCounter >= 1) {
            ratingCounter -= 1;
            starsArr.push(fullStarElement);
        } else if (ratingCounter > 0.5 && ratingCounter < 1) {
            ratingCounter = 0;
            starsArr.push(fullStarElement);
        } else if (ratingCounter > 0 && ratingCounter <= 0.5) {
            ratingCounter = 0;
            starsArr.push(halfStarElement);
        } else if (ratingCounter === 0) {
            starsArr.push(emptyStarElement);
        }
    }

    let starRatingElementContent = "";

    starsArr.forEach((starElement) => {
        starRatingElementContent += starElement;
    });

    const starRatingElement = `
        <div class="rating-stars">
            ${starRatingElementContent}
        </div>
    `;

    return starRatingElement;
};

const createProductElement = (product: Product) => {
    const { title, imageUrl, link, rating, reviewsNumber } = product;

    const element = document.createElement("a");

    element.className = "product-container";

    const starRatingElement = createStarsRatingElement(rating);

    const elementInnerHTML = `
        <img
            class="product-image"
            src=${imageUrl}
            alt=""
        />

        <h2 class="product-title">
            ${title}
        </h2>

        <div class="product-container-bottom">
            <div class="product-reviews ${rating === 0 && "hidden"}">
                <span class="rating-avarage">${rating}</span>
                ${starRatingElement}

                <span class="reviews-number">(${reviewsNumber})</span>
            </div>

            <img
                class="product-link"
                src="assets/link.svg"
            />
        </div>
    `;

    element.innerHTML = elementInnerHTML;

    element.href = link;

    return element;
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    resultsContainer.innerHTML = "";
    searchButton.className = "search-button loading";

    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if ((http.readyState === 4, http.status === 200)) {
            // Manipula a resposta do servidor aqui
            const products = JSON.parse(http.response) as Product[];

            blankSlate.className = "removed";

            products.forEach((product) => {
                const newProductElement = createProductElement(product);

                resultsContainer.appendChild(newProductElement);
            });

            searchButton.className = "search-button";
        } else {
            console.log(JSON.parse(http.response));
        }
    };

    const searchKeyword = searchInput.value;

    http.open(
        "GET",
        `http://localhost:3000/api/scrape?keyword=${searchKeyword}`,
        true
    );
    http.send();
});
