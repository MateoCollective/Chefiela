$(document).ready(function () {
  // search meals function
  $("#searchBtn").click(function () {
    let query = $("#searchInput").val();
    if (query !== "") {
      let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + query;
      $.getJSON(url, function (data) {
        let meals = data.meals;
        if (meals) {
          $("#meals").empty();
          meals.forEach(function (meal) {
            let mealCard = `
            <div class="search-meal-card" data-id="${meal.idMeal}">
            <div class="search-meal-info">
              <h3>${meal.strMeal}</h3>
              <a>${meal.strInstructions}</a>
              <p> ${meal.strCategory}</p>
            </div>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          </div>
          
            `;
            $("#meals").append(mealCard);
          });
        } else {
          $("#meals").empty();
          $("#meals").append("<p>No meals found.</p>");
        }
      });
    }
  });

  // get meal details function
  $("#meals").on("click", ".search-meal-card", function () {
    let mealId = $(this).data("id");
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
    $.getJSON(url, function (data) {
      let meal = data.meals[0];
      let mealDetails = `
      <div class="header gradient-header">
      <div class="left">
        <a href="#"><i class="fas fa-arrow-left close-btn"></i></a>
      </div>
      <div class="center-text">
      <span>${meal.strMeal}</span>
      </div>
      <div class="right">
        <a href="#"><i class="fas fa-ellipsis-v"></i></a>
      </div>
    </div>
    
    <div class="meal-details">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h2>${meal.strMeal}</h2>
      <h3>Ingredients:</h3>
      <ul>
        ${getIngredients(meal)}
      </ul>
      <h3>Instructions:</h3>
      <a>${meal.strInstructions}</a>
    </div>
      `;
      $("#meals").fadeOut(500, function () {
        $(this).empty().append(mealDetails).fadeIn(500);
      });
    });
  });

  // helper function to get ingredients
  function getIngredients(meal) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients += `
          <li>${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}</li>
        `;
      } else {
        break;
      }
    }
    return ingredients;
  }

  // add event listener to close button
  $("#meals").on("click", ".close-btn", function () {
    $("#meals").fadeOut(500, function () {
      $(this).empty().show();
    });
  });
});


























function getMealData() {
  $.getJSON("https://www.themealdb.com/api/json/v1/1/random.php", function (data) {
    const meal = data.meals[0];
    const imageUrl = meal.strMealThumb;
    const title = meal.strMeal;
    const description = meal.strInstructions;

    $(".slider-image").css("background-image", "url(" + imageUrl + ")");
    $(".slider-title").text(title);
    $(".slider-description").text(description);
  });
}

getMealData();
setInterval(getMealData, 5000);


$(document).ready(function () {
  // get meal details function
  $("#random-meals").on("click", ".meal-card", function () {
    let mealId = $(this).data("id");
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
    $.getJSON(url, function (data) {
      let meal = data.meals[0];
      let mealDetails = `
      <div class="header gradient-header">
            <div class="left">
              <a href="#"><i class="fas fa-arrow-left close-btn"></i></a>
            </div>
            <div class="center-text">
            <span>${meal.strMeal}</span>
            </div>
            <div class="right">
              <a href="#"><i class="fas fa-ellipsis-v"></i></a>
            </div>
          </div>
          
          <div class="meal-details">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
            <ul>
              ${getIngredients(meal)}
            </ul>
            <h3>Instructions:</h3>
            <a>${meal.strInstructions}</a>
          </div>
      `;
      $("#random-meals").fadeOut(500, function () {
        $(this).empty().append(mealDetails).fadeIn(500);
      });
    });
  });

  // helper function to get ingredients
  function getIngredients(meal) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients += `
          <li>${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}</li>
        `;
      } else {
        break;
      }
    }
    return ingredients;
  }

  // add event listener to close button
  $("#random-meals").on("click", ".close-btn", function () {
    $("#random-meals").fadeOut(500, function () {
      $(this).empty().show();
    });
  });

  // get random meals and display them
  let url = "https://www.themealdb.com/api/json/v1/1/random.php";
  let numOfMeals = 6; // set the number of random meals to display
  for (let i = 0; i < numOfMeals; i++) {
    $.getJSON(url, function (data) {
      let meal = data.meals[0];
      let mealCard = `
      
      <div class="meal-container">
        <div class="meal-card" data-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <div class="meal-desk">
          <h3>${meal.strMeal}</h3>
          <p> ${meal.strCategory}</p>
        </div>
        </div>
        </div>
      `;
      $("#random-meals").append(mealCard);
    });
  }
});








$(document).ready(function () {

  // get meal details function
  $("#jepang-meals").on("click", ".meal-card", function () {
    let mealId = $(this).data("id");
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;
    $.getJSON(url, function (data) {
      let meal = data.meals[0];
      let mealDetails = `
      <div class="header gradient-header">
            <div class="left">
              <a href="#"><i class="fas fa-arrow-left close-btn"></i></a>
            </div>
            <div class="center-text">
            <span>${meal.strMeal}</span>
            </div>
            <div class="right">
              <a href="#"><i class="fas fa-ellipsis-v"></i></a>
            </div>
          </div>
          
          <div class="meal-details">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
            <ul>
              ${getIngredients(meal)}
            </ul>
            <h3>Instructions:</h3>
            <a>${meal.strInstructions}</a>
          </div>
      `;
      $("#jepang-meals").fadeOut(500, function () {
        $(this).empty().append(mealDetails).fadeIn(500);
      });
    });
  });

  // helper function to get ingredients
  function getIngredients(meal) {
    let ingredients = "";
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients += `
          <li>${meal["strIngredient" + i]} - ${meal["strMeasure" + i]}</li>
        `;
      } else {
        break;
      }
    }
    return ingredients;
  }

  // add event listener to close button
  $("#jepang-meals").on("click", ".close-btn", function () {
    $("#jepang-meals").fadeOut(500, function () {
      $(this).empty().show();
    });
  });

  // get random Japanese meals and display them
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese";
  let numOfMeals = 6; // set the number of random meals to display
  $.getJSON(url, function (data) {
    let meals = data.meals;
    for (let i = 0; i < numOfMeals; i++) {
      let randomIndex = Math.floor(Math.random() * meals.length);
      let meal = meals[randomIndex];
      let mealCard = `
        <div class="meal-container">
          <div class="meal-card" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-desk">
              <h3>${meal.strMeal}</h3>y
            </div>
          </div>
        </div>
      `;
      $("#jepang-meals").append(mealCard);
      meals.splice(randomIndex, 1); // remove the chosen meal from the array
    }
  });
});



























const popularIngredientsDiv = document.querySelector('.popular-ingredients .ingredient-list');

fetch('https://www.themealdb.com/api/json/v1/1/latest.php')
  .then(response => response.json())
  .then(data => {
    data.meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meal');
      mealDiv.innerHTML = `
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
  <h3>${meal.strMeal}</h3>
`;
      latestMealsDiv.appendChild(mealDiv);
    });
  });

// Popular Ingredients
fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
  .then(response => response.json())
  .then(data => {
    let count = 0; // tambahkan variabel count
    data.meals.forEach(ingredient => {
      if (count < 8) { // tambahkan statement if
        const ingredientDiv = document.createElement('div');
        ingredientDiv.classList.add('ingredient');
        ingredientDiv.innerHTML = `
<img style="width: 50px; height: 50px; object-fit: cover;" src="https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}.png" alt="${ingredient.strIngredient}">
<h3>${ingredient.strIngredient}</h3>
`;
        popularIngredientsDiv.appendChild(ingredientDiv);

        popularIngredientsDiv.appendChild(ingredientDiv);
        count++; // tambahkan count setiap item ditampilkan
      }
    });
  });






// dark mode
function toggleDarkMode() {
  // Ambil elemen body
  const body = document.querySelector('body');

  // Toggle class "dark-mode" pada elemen body
  body.classList.toggle('dark-mode');

  // Ambil elemen stylesheet untuk dark mode
  const darkModeStylesheet = document.querySelector('link[href="dark.css"]');

  // Toggle attribute "disabled" pada elemen stylesheet untuk dark mode
  darkModeStylesheet.toggleAttribute('disabled');
}

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.getElementById('splash-screen').style.display = 'none';
  }, 3000); //ganti nilai 3000 menjadi berapa lama Anda ingin splash screen tampil (dalam milidetik)
});








const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

const defaultTabId = "recipes";
const defaultTab = document.querySelector(`.tab[data-tab="${defaultTabId}"]`);
const defaultTabContent = document.querySelector(`#${defaultTabId}`);

defaultTab.classList.add("active");
defaultTabContent.style.display = "block";

tabContents.forEach((tabContent) => {
  if (tabContent.getAttribute("id") !== defaultTabId) {
    tabContent.style.display = "none";
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabId = tab.getAttribute("data-tab");

    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    tab.classList.add("active");

    tabContents.forEach((tabContent) => {
      if (tabContent.getAttribute("id") === tabId) {
        tabContent.style.display = "block";
      } else {
        tabContent.style.display = "none";
      }
    });
  });
});


// Fungsi untuk menampilkan ucapan selamat berdasarkan waktu
function showGreeting() {
  const date = new Date();
  const hour = date.getHours();
  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = "Good morning!";
  } else if (hour >= 12 && hour < 15) {
    greeting = "Good afternoon!";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Good evening!";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Good night!";
  } else {
    greeting = "Good night!";
  }


  document.getElementById("greeting").innerHTML = greeting;
}

// Panggil fungsi showGreeting() setiap 1 detik
setInterval(showGreeting, 1000);


window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.pageYOffset > 0) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }
});

window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.pageYOffset > 0) {
    header.classList.add('header-scroll');
  } else {
    header.classList.remove('header-scroll');
  }
});