const searchBtn = () => {
  const searchField = document.getElementById("searchField");
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchField.value}`
  )
    .then((res) => res.json())
    .then((data) => displayDrinks(data.drinks));
};
const displayDrinks = (drinks) => {
  const drinkText = document.getElementById("drink-text");
  const div = document.createElement("div");
  drinkText.innerHTML = `
        <h4 style="border-bottom:1px solid #fe4902" class="text-white text-center d-inline">
          🍸Our <span style="color: #fe4902">Drinks</span>🍸
        </h4>`;
  drinkText.appendChild(div);
  const DrinksContainer = document.getElementById("drinks-container");
  drinks.map((artist) => {
    const { idDrink, strDrink, strDrinkThumb, strInstructions, strCategory } =
      artist;
    const div = document.createElement("div");

    div.innerHTML = `
    <div class="col" >
    <div class="card h-100" style="border:1px solid #fe4902;">
      <img src="${strDrinkThumb}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 style="color: #fe4902"  class="card-title fw-bold">${strDrink}</h5>
        <h6>Category: ${strCategory}</h6>
        <p title="${strInstructions}" class="card-text">
         ${strInstructions.slice(0, 45) + "..."}
        </p>
      </div>
     <button class="drinks-button ">
     <div class="d-flex justify-content-around align-items-center">
     <i style="color:#fe4902" class="fa-solid fa-martini-glass fs-5"></i>
     <p style="color:#fe4902" onclick="console.log('${idDrink}')" class="button-title pt-3">Drinks</p>
     </div>
    </button>
    </div>
  </div>
        `;
    DrinksContainer.appendChild(div);
  });
};
