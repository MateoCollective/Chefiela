const recipesContainer = document.getElementById('recipes');
const searchInput = document.getElementById('search');
const popup = document.querySelector('.popup');
const popupContent = document.getElementById('popup-content');

// Fungsi untuk menampilkan popup dan mengisi kontennya dengan detail makanan
function showPopup(meal) {
  popupContent.innerHTML = `
<h2>${meal.strMeal}</h2>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
<h3>Instructions</h3>
<ol>
${meal.strInstructions
.split('\n')
.map((instruction) => `<>${instruction.trim()}</>`)
.join('')}
</ol>
<h3>Ingredients</h3>
<div class="ingred">
<ul>
${Object.keys(meal)
.filter((key) => key.startsWith('strIngredient') && meal[key])
.map((key) => {
  const ingredient = meal[key];
  const ingredientThumb = meal[key.replace('Ingredient', 'IngredientThumb')];
  const ingredientImg = ingredientThumb ? `<img src="${ingredientThumb}" alt="${ingredient}" width="30">` : '';
  return `
    <li>
      ${ingredientImg}
      ${ingredient} - ${meal['strMeasure' + key.slice(13)] || ''}
    </li>
  `;
})
.join('')}
</ul>
</div>`;

  popup.style.display = 'flex';
}

function displayIngredients(meal) {
  let ingredients = '';

  for (let i = 1; i <= 50; i++) {
    const ingredientName = meal['strIngredient' + i];
    const ingredientMeasure = meal['strMeasure' + i];

    // Cek apakah nama bahan tidak kosong dan tidak undefined
    if (ingredientName && ingredientName !== 'undefined') {
      // Cek apakah satuan tidak kosong dan tidak undefined
      const measure = ingredientMeasure && ingredientMeasure !== 'undefined' ? ingredientMeasure : '';

      ingredients += `
            <div class="ing"
<li>
  <img src="https://www.themealdb.com/images/ingredients/${ingredientName}.png" alt="${ingredientName}" width="30">
  ${ingredientName} - ${measure}
</li>
</div>
`;
    }
  }

  return `
<h3>Ingredients</h3>
<ul>${ingredients}</ul>
`;
}

function showPopup(meal) {
  const ingredients = displayIngredients(meal);

  popupContent.innerHTML = `
<h2>${meal.strMeal}</h2>
<img src="${meal.strMealThumb}" alt="${meal.strMeal}">
<h3>Instructions</h3>
<ol>
${meal.strInstructions
.split('\n')
.map((instruction) => `<li>${instruction.trim()}</li>`)
.join('')}
</ol>
${ingredients}
`;
  popup.style.display = 'flex';
}




// Fungsi untuk menyembunyikan popup
function hidePopup() {
  popup.style.display = 'none';
  popupContent.innerHTML = '';
}

// Fungsi untuk menampilkan resep makanan ke dalam halaman
function displayRecipes(meals) {
  const maxRecipes = 4; // jumlah maksimum item yang ingin ditampilkan
  const mealsToShow = meals.slice(0,
    maxRecipes); // potong array meals menjadi array baru yang hanya berisi maksimum 6 item
  recipesContainer.innerHTML = mealsToShow
    .map(
      (meal) => `
<div class="recipe">
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" data-meal-id="${meal.idMeal}">
  <h2 class="teks-singkat">${meal.strMeal}</h2>
</div>
`
    )
    .join('');

  const recipeImgs = document.querySelectorAll('.recipe img');

  // Menambahkan event listener pada gambar resep makanan
  recipeImgs.forEach((img) => {
    img.addEventListener('click', () => {
      const mealId = img.getAttribute('data-meal-id');
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => response.json())
        .then((data) => {
          const meal = data.meals[0];

          // Tambahkan properti strIngredientThumb pada objek meal
          for (let i = 1; i <= 20; i++) {
            const ingredient = meal['strIngredient' + i];
            if (ingredient) {
              meal['strIngredientThumb' + i] =
                `https://www.themealdb.com/images/ingredients/${ingredient}.png`;
            }
          }

          showPopup(meal);
        });
    });
  });
}

// Fungsi untuk melakukan pencarian resep makanan berdasarkan nama
function searchRecipes(searchTerm) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;
      displayRecipes(meals);
    });
}

// Menampilkan resep makanan awal ketika halaman pertama kali dimuat
searchRecipes('fish');

// Menambahkan event listener pada input pencarian
searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    searchRecipes(searchTerm);
  } else {
    displayRecipes([]);
  }
});


const latestMealsDiv = document.querySelector('.latest-meals .meal-list');
const popularIngredientsDiv = document.querySelector('.popular-ingredients .ingredient-list');
const randomMealsDiv = document.querySelector('.random-meals .meal-list');

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
  }, 000); //ganti nilai 3000 menjadi berapa lama Anda ingin splash screen tampil (dalam milidetik)
});








const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");

const defaultTabId = "favorites";
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


const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
const cardsContainer = document.querySelector(".cards-container");

function createCard(meal) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundImage = `url(${meal.strMealThumb})`;

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");

  const title = document.createElement("h2");
  title.textContent = meal.strMeal;

  const category = document.createElement("p");
  category.textContent = meal.strCategory;

  overlay.appendChild(title);
  overlay.appendChild(category);
  card.appendChild(overlay);

  card.addEventListener("click", () => {
    const info = document.createElement("div");
    info.classList.add("info");
    const infoTitle = document.createElement("h2");
    infoTitle.textContent = meal.strMeal;
    const infoCategory = document.createElement("p");
    infoCategory.textContent = `Category: ${meal.strCategory}`;

    const infoInstructions = document.createElement("p");
    infoInstructions.textContent = meal.strInstructions;
    info.appendChild(infoTitle);
    info.appendChild(infoCategory);
  
    info.appendChild(infoInstructions);
    document.body.appendChild(info);
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.addEventListener("click", () => {
      info.remove();
    });
    info.appendChild(closeButton);
  });

  return card;
}

async function getMeals() {
  try {
    for (let i = 0; i < 6; i++) {
      const response = await fetch(API_URL);
      const data = await response.json();

      const meal = data.meals[0];
      const card = createCard(meal);
      cardsContainer.appendChild(card);
    }
  } catch (error) {
    console.log(error);
  }
}

getMeals();

// Fungsi untuk mengambil resep berdasarkan kategori
function getMealsByCategory(category) {
  // Reset konten pada container
  document.getElementById("mealContainer").innerHTML = "";

  // Mengambil data resep dari API
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then(response => response.json())
    .then(data => {
      // Membuat elemen HTML untuk setiap resep
      data.meals.forEach(meal => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
          .then(response => response.json())
          .then(data => {
            const mealData = data.meals[0];
            const mealElem = document.createElement("div");
            mealElem.classList.add("meal-item");
            mealElem.innerHTML = `
            <img onclick="showMealpipip(${meal.idMeal})" src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-details">
              <h2 onclick="showMealpipip(${meal.idMeal})"> ${meal.strMeal}</h2>
              <p> ${mealData.strArea}</p>
            </div>
          `;
            document.getElementById("mealContainer").appendChild(mealElem);
          })
          .catch(error => console.error(error));
      });
    })
    .catch(error => console.error(error));


}

// Fungsi untuk menampilkan pipip berisi informasi makanan dan resep
function showMealpipip(mealId) {
  // Mengambil data detail resep dari API
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      // Membuat elemen HTML untuk pipip
      const pipip = document.createElement("div");
      pipip.classList.add("meal-pipip");

      const pipipContent = document.createElement("div");
      pipipContent.classList.add("meal-pipip-content");

      const pipipTitle = document.createElement("h2");
      pipipTitle.innerText = data.meals[0].strMeal;

      const pipipImage = document.createElement("img");
      pipipImage.src = data.meals[0].strMealThumb;
      pipipImage.alt = data.meals[0].strMeal;

      const pipipInstructions = document.createElement("p");
      pipipInstructions.innerText = data.meals[0].strInstructions;

      const closeButton = document.createElement("button");
      closeButton.innerText = "Close";
      closeButton.classList.add("close-button");
      closeButton.onclick = function () {
        pipip.remove();
      };

      pipipContent.appendChild(pipipTitle);
      pipipContent.appendChild(pipipImage);
      pipipContent.appendChild(pipipInstructions);
      pipipContent.appendChild(closeButton);

      pipip.appendChild(pipipContent);

      // Menampilkan pipip dalam dokumen
      document.body.appendChild(pipip);
    })
    .catch(error => console.error(error));
}

// Fungsi untuk menambahkan tombol kategori
function addCategoryButton(category) {
  const button = document.createElement("button");
  button.innerText = category;
  button.onclick = function () {
    getMealsByCategory(category);
  };
  document.getElementById("categoryButtons").appendChild(button);
}

// Memanggil fungsi getMealsByCategory() dengan kategori default saat halaman dimuat dan menambahkan tombol kategori
window.onload = function () {
  getMealsByCategory("Seafood");

  // Menambahkan tombol kategori
  addCategoryButton("Beef");
  addCategoryButton("Chicken");
  addCategoryButton("Dessert");
  addCategoryButton("Lamb");
  addCategoryButton("Pasta");
  addCategoryButton("Pork");
  addCategoryButton("Seafood");
  addCategoryButton("Vegetarian");
};
// Fungsi untuk menampilkan ucapan selamat berdasarkan waktu
function showGreeting() {
  const date = new Date();
  const hour = date.getHours();
  let greeting;

  if (hour >= 5 && hour < 12) {
    greeting = "Good Morning!";
  } else if (hour >= 12 && hour < 15) {
    greeting = "Good Afternoon!";
  } else if (hour >= 15 && hour < 18) {
    greeting = "Selamat sore!";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Selamat malam!";
  } else {
    greeting = "Selamat tidur!";
  }

  document.getElementById("greeting").innerHTML = greeting;
}

// Panggil fungsi showGreeting() setiap 1 detik
setInterval(showGreeting, 1000);