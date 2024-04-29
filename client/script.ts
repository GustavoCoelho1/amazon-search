const searchInput = document.getElementById("search-input") as HTMLInputElement;
const searchButton = document.getElementById(
    "search-button"
) as HTMLButtonElement;
const resultsContainer = document.getElementById(
    "results-container"
) as HTMLDivElement;
const blankSlate = document.getElementById("blank-slate") as HTMLDivElement;
const searchForm = document.getElementById("search-form") as HTMLFormElement;
const errorContainer = document.getElementById(
    "error-container"
) as HTMLDivElement;
const searchInfo = document.getElementById("search-info") as HTMLSpanElement;
const searchInfoContent = document.querySelector(
    "#search-info b"
) as HTMLSpanElement;

interface Product {
    title: string;
    rating: number;
    reviewsNumber: number;
    imageUrl: string;
    link: string;
}

const createStarsRatingElement = (rating: number) => {
    //Stating the elements into variables, to make it easier to handle them later
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

    //Creating a element/string with all the elements that was pushed into the star elements array
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

    //Setting the style for the product container
    element.className = "product-container";

    //Getting the ready model of the star ratings
    const starRatingElement = createStarsRatingElement(rating);

    //Setting the inner HTML of the final element by a string, it makes easier to set the elements content and the classes
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

    //Setting the product amazon link for each container
    element.href = link;

    return element;
};

searchForm.addEventListener("submit", (e) => {
    //Preventing the form from submiting and reloading the page
    e.preventDefault();

    const searchKeyword = searchInput.value;

    //Restarting elements to empty state
    resultsContainer.innerHTML = "";
    searchInfo.className = "removed";
    errorContainer.className = "message-container";

    //Making the loading gif appears inside the search button
    searchButton.className = "search-button loading";

    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        console.log(http);

        if (http.readyState === 4 && http.status === 200) {
            //If the request was successful

            //Hiding the blank slate div
            blankSlate.className = "removed";

            //Setting search keyword information
            searchInfo.className = "search-info show";
            searchInfoContent.innerText = `${searchKeyword}`;

            const products = JSON.parse(http.response) as Product[];

            //For each product in the JSON, we generate a new element in the page
            products.forEach((product) => {
                const newProductElement = createProductElement(product);

                resultsContainer.appendChild(newProductElement);
            });

            //Returning search icon to normal state
            searchButton.className = "search-button";
        }
    };

    //If the request was unsuccessful
    http.onerror = () => {
        console.log(http.response);

        //Hiding the blank slate div
        blankSlate.className = "removed";

        //Returning search icon to normal state
        searchButton.className = "search-button";

        //Display the error message
        errorContainer.className = "message-container show";
    };

    http.open(
        "GET",
        `http://localhost:3000/api/scrape?keyword=${searchKeyword}`,
        true
    );
    http.send();
});
