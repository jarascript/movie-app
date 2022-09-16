//Para reemplazar el document.queryselector por '$' 
const $ = (id) => document.querySelector(id);

//Sections
const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const categoriesPreviewSection = $('#categoriesPreview');
const genericListSection = $('#genericList');
const movieDetailSection = $(`#movieDetail`);
const likedMoviesSection = $(`#liked`);

//List & Containers

const searchForm = $('#searchForm');
const trendingMoviesPreviewList = $('.trendingPreview-movieList')
const categoriesPreviewList = $('.categoriesPreview-list');
const movieDetailCategoriesList = $('#movieDetail .categories-list');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');
const likedMoviesListArticle = $('.liked-movieList');

// Elements
const headerTitle = $('.header-title');
const arrowBtn = $('.header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');

const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');

const trendingBtn = $('.trendingPreview-btn');

    // Movie Detail
const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');
