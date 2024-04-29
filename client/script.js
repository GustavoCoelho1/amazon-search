var searchInput = document.getElementById("search-input");
var searchButton = document.getElementById("search-button");
var resultsContainer = document.getElementById("results-container");
var blankSlate = document.getElementById("blank-slate");
var searchForm = document.getElementById("search-form");
var createStarsRatingElement = function (rating) {
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
    element.className = "product-container";
    var starRatingElement = createStarsRatingElement(rating);
    var elementInnerHTML = "\n        <img\n            class=\"product-image\"\n            src=".concat(imageUrl, "\n            alt=\"\"\n        />\n\n        <h2 class=\"product-title\">\n            ").concat(title, "\n        </h2>\n\n        <div class=\"product-container-bottom\">\n            <div class=\"product-reviews ").concat(rating === 0 && "hidden", "\">\n                <span class=\"rating-avarage\">").concat(rating, "</span>\n                ").concat(starRatingElement, "\n\n                <span class=\"reviews-number\">(").concat(reviewsNumber, ")</span>\n            </div>\n\n            <img\n                class=\"product-link\"\n                src=\"assets/link.svg\"\n            />\n        </div>\n    ");
    element.innerHTML = elementInnerHTML;
    element.href = link;
    return element;
};
searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    resultsContainer.innerHTML = "";
    searchButton.className = "search-button loading";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if ((http.readyState === 4, http.status === 200)) {
            // Manipula a resposta do servidor aqui
            var products = JSON.parse(http.response);
            blankSlate.className = "removed";
            products.forEach(function (product) {
                var newProductElement = createProductElement(product);
                resultsContainer.appendChild(newProductElement);
            });
            searchButton.className = "search-button";
        }
        else {
            console.log(JSON.parse(http.response));
        }
    };
    var searchKeyword = searchInput.value;
    http.open("GET", "http://localhost:3000/api/scrape?keyword=".concat(searchKeyword), true);
    http.send();
});
