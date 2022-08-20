window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else {
        homePage();
    }
}

function homePage() {
    console.log("HOME!");
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function searchPage() {
    console.log('Search!');
}

function categoriesPage() {
    console.log('Categories!');
}

function movieDetailsPage() {
    console.log("Movie!");
}

function trendsPage() {
    console.log('TRENDS'); 
}

