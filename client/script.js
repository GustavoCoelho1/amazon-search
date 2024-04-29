var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var resultsContainer = document.getElementById("results-container");
var blankSlate = document.getElementById("blank-slate");
var searchForm = document.getElementById("search-form");
var errorContainer = document.getElementById("error-container");
var searchInfo = document.getElementById("search-info");
var searchInfoContent = document.querySelector("#search-info b");
var createStarsRatingElement = function (rating) {
    //Stating the elements into variables, to make it easier to handle them later
    var fullStarElement = "<img src=\"assets/full-star.svg\" alt=\"\" />";
    var halfStarElement = "<img src=\"assets/half-star.svg\" alt=\"\" />";
    var emptyStarElement = "<img src=\"assets/empty-star.svg\" alt=\"\" />";
    var starsArr = [];
    //A algorithm that fullfill the stars automatically
    var ratingCounter = rating;
    for (var x = 1; x <= 5; x++) {
        if (ratingCounter >= 1) {
            ratingCounter -= 1;
            starsArr.push(fullStarElement);
        }
        else if (ratingCounter > 0.5 && ratingCounter < 1) {
            ratingCounter = 0;
            starsArr.push(fullStarElement);
        }
        else if (ratingCounter > 0 && ratingCounter <= 0.5) {
            ratingCounter = 0;
            starsArr.push(halfStarElement);
        }
        else if (ratingCounter === 0) {
            starsArr.push(emptyStarElement);
        }
    }
    //Creating a element/string with all the elements that was pushed into the star elements array
    var starRatingElementContent = "";
    starsArr.forEach(function (starElement) {
        starRatingElementContent += starElement;
    });
    var starRatingElement = "\n        <div class=\"rating-stars\">\n            ".concat(starRatingElementContent, "\n        </div>\n    ");
    return starRatingElement;
};
var createProductElement = function (product) {
    var title = product.title, imageUrl = product.imageUrl, link = product.link, rating = product.rating, reviewsNumber = product.reviewsNumber;
    var element = document.createElement("a");
    //Setting the style for the product container
    element.className = "product-container";
    //Getting the ready model of the star ratings
    var starRatingElement = createStarsRatingElement(rating);
    //Setting the inner HTML of the final element by a string, it makes easier to set the elements content and the classes
    var elementInnerHTML = "\n        <img\n            class=\"product-image\"\n            src=".concat(imageUrl, "\n            alt=\"\"\n        />\n\n        <h2 class=\"product-title\">\n            ").concat(title, "\n        </h2>\n\n        <div class=\"product-container-bottom\">\n            <div class=\"product-reviews ").concat(rating === 0 && "hidden", "\">\n                <span class=\"rating-avarage\">").concat(rating, "</span>\n                ").concat(starRatingElement, "\n\n                <span class=\"reviews-number\">(").concat(reviewsNumber, ")</span>\n            </div>\n\n            <img\n                class=\"product-link\"\n                src=\"assets/link.svg\"\n            />\n        </div>\n    ");
    element.innerHTML = elementInnerHTML;
    //Setting the product amazon link for each container
    element.href = link;
    return element;
};
searchForm.addEventListener("submit", function (e) {
    //Preventing the form from submiting and reloading the page
    e.preventDefault();
    var searchKeyword = searchInput.value;
    //Restarting elements to empty state
    resultsContainer.innerHTML = "";
    searchInfo.className = "removed";
    errorContainer.className = "message-container";
    //Making the loading gif appears inside the search button
    searchButton.className = "search-button loading";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        console.log(http);
        if (http.readyState === 4 && http.status === 200) {
            //If the request was successful
            //Hiding the blank slate div
            blankSlate.className = "removed";
            //Setting search keyword information
            searchInfo.className = "search-info show";
            searchInfoContent.innerText = "".concat(searchKeyword);
            var products = JSON.parse(http.response);
            //For each product in the JSON, we generate a new element in the page
            products.forEach(function (product) {
                var newProductElement = createProductElement(product);
                resultsContainer.appendChild(newProductElement);
            });
            //Returning search icon to normal state
            searchButton.className = "search-button";
        }
    };
    //If the request was unsuccessful
    http.onerror = function () {
        console.log(http.response);
        //Hiding the blank slate div
        blankSlate.className = "removed";
        //Returning search icon to normal state
        searchButton.className = "search-button";
        //Display the error message
        errorContainer.className = "message-container show";
    };
    http.open("GET", "http://localhost:3000/api/scrape?keyword=".concat(searchKeyword), true);
    http.send();
});
