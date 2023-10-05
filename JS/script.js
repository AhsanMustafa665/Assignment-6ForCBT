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
      <img src="${strDrinkThumb}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 style="color: #fe4902"  class="card-title fw-bold">${strDrink}</h5>
        <h6>Category: ${strCategory}</h6>
        <p title="${strInstructions}"  data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" class="card-text">
         ${strInstructions.slice(0, 45) + "..."}
        </p>
      </div>
     <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="detailsBtn('${idDrink}')" class="drinks-button ">
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
  const ddddd = document.getElementById("staticBackdrop");
  const singleDrink = drink[0];
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
</div>`;
  ddddd.appendChild(newDiv);
};
