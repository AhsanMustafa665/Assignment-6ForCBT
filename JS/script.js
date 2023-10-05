const searchBtn = () => {
  const searchField = document.getElementById("searchField");

  if (searchField.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please type your drinks in input box!",
      confirmButtonColor: " #fe4902",
    });
  } else {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchField.value}`
    )
      .then((res) => res.json())
      .then((data) => displayDrinks(data.drinks));
  }
  searchField.value = "";
};
const displayDrinks = (drinks) => {
  const drinkText = document.getElementById("drink-text");
  const div = document.createElement("div");
  drinkText.innerHTML = `
        <h4 style="border-bottom:1px solid #fe4902" class="text-white text-center d-inline">
          🍸Our <span style="color: #fe4902">Drinks</span>🍸
        </h4>`;
  drinkText.appendChild(div);
  const drinksContainer = document.getElementById("drinks-container");
  drinksContainer.textContent = "";
  drinks.map((artist) => {
    const { idDrink, strDrink, strDrinkThumb, strInstructions, strCategory } =
      artist;
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="col">
    <div class="card h-100" style="border:1px solid #fe4902;">
      <img src="${strDrinkThumb}" class="card-img-top p-2" alt="..." />
      <div class="card-body b">
        <h5 style="color: #fe4902" class="card-title fw-bold">${strDrink}</h5>
        <h6>Category: ${strCategory}</h6>
        <p title="${strInstructions}"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" class="card-text">
         ${strInstructions.slice(0, 45) + "..."}
        </p>
      </div>
     <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="detailsBtn('${idDrink}')" class="drinks-button">
     <div class="d-flex justify-content-around align-items-center">
     <i style="color:#fe4902" class="fa-solid fa-martini-glass fs-5"></i>
     <p style="color:#fe4902" class="button-title pt-3">Drinks</p>
     </div>
    </button>
    </div>
  </div>
        `;
    drinksContainer.appendChild(div);
  });
};
const detailsBtn = (id) => {
  const convertNumber = Number(id);
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${convertNumber}`
  )
    .then((res) => res.json())
    .then((data) => detailsDrink(data.drinks));
};
const detailsDrink = (drink) => {
  const drinksDetailsContainer = document.getElementById(
    "drinksDetailsContainer"
  );
  const singleDrink = drink[0];
  const {
    strDrink,
    strDrinkThumb,
    strInstructions,
    strIngredient1,
    strIngredient2,
  } = singleDrink;
  Swal.fire({
    title: ` ${strDrink}`,
    text: `${strInstructions}`,
    imageUrl: `${strDrinkThumb}`,
    imageWidth: 400,
    imageHeight: 400,
    imageAlt: "Custom image",
    showDenyButton: true,
    confirmButtonText: `${strIngredient1}`,
    denyButtonText: `${strIngredient2}`,
    confirmButtonColor: " #fe4902",
    denyButtonColor: "#fe4902",
  });
};
