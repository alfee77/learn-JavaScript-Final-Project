import FetchWrapper from "./fetch-wrapper.js";
import { capitalize, calculateCalories } from "./helpers.js";

const logFoodAPI = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/alfee77food"
);
const form = document.querySelector("#create-form");
const name = document.querySelector("#create-name");
const carbs = document.querySelector("#create-carbs");
const protein = document.querySelector("#create-protein");
const fat = document.querySelector("#create-fat");
const foodToAdd = { fields: {} };
const foodList = document.querySelector("#food-list");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  foodToAdd.fields.name = { stringValue: name.value };
  foodToAdd.fields.carbs = { integerValue: carbs.value };
  foodToAdd.fields.protein = { integerValue: protein.value };
  foodToAdd.fields.fat = { integerValue: fat.value };

  logFoodAPI.post("/", foodToAdd).then((data) => {
    if (!data.error) {
      foodList.insertAdjacentHTML(
        "afterbegin",
        `
      <li class="card">
        <div>
          <h3 class="name">${capitalize(foodToAdd.fields.name.stringValue)}</h3>
          <div class="calories">${calculateCalories(
            carbs.value,
            protein.value,
            fat.value
          )} calories</div>
          <ul class="macros">
            <li class="carbs"><div>Carbs</div><div class="value">${
              carbs.value
            }g</div></li>
            <li class="protein"><div>Protein</div><div class="value">${
              protein.value
            }g</div></li>
            <li class="fat"><div>Fat</div><div class="value">${
              fat.value
            }g</div></li>
          </ul>
        </div>
      </li>`
      );
      form.reset();
    }
  });
});
