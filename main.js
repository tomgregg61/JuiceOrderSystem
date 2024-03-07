const optSizes = document.getElementsByName("drinkSize");
const optsTypes = document.getElementsByName("drinkType");
const optsIngredients = document.getElementsByName("ingredients");
const optsSmoothieBase = document.getElementsByName("smoothieBases");
const optsMilkBase = document.getElementsByName("milkBases");
const optsExtras = document.getElementsByName("extras");
const optsMilkshake = document.getElementById("milkshakeOpts");
const optsSmoothie = document.getElementById("smoothieOpts");

const btnAdd = document.getElementById("add");
const btnSaveFav = document.getElementById("saveFav");
const btnPlace = document.getElementById("place");
const btnOrderFav = document.getElementById("orderFav");

let extrasCost;
let extras;
let malt;
let wc;
let flake;
let marshmallows;
let banana;
let raspberry;
let cranberry;
let strawberry;
let chocolate;
let drink;
let size;
let type;
let ingredients;
let milkBase;
let smoothieBase;
let drinkCost;
let orderCost;
let favourite;
let favouriteCost;
let TypeSelected;
let ingredientCount;

initialise();
getData();

btnAdd.addEventListener("click", addOrder);
btnSaveFav.addEventListener("click", saveFavourite);
btnOrderFav.addEventListener("click", orderFavourite);
btnPlace.addEventListener("click", placeOrder);

optSizes.forEach((item) => item.addEventListener("change", checkSize));
optsTypes.forEach((item) => item.addEventListener("change", checkType));
optsIngredients.forEach((item) =>
  item.addEventListener("change", checkIngredients)
);
optsIngredients.forEach((item) =>
  item.addEventListener("change", checkIngredients)
);
optsExtras.forEach((item) => item.addEventListener("change", checkExtras));
optsSmoothieBase.forEach((item) =>
  item.addEventListener("change", checkSmoothieBase)
);
optsMilkBase.forEach((item) => item.addEventListener("change", checkMilkBase));

function initialise() {
  orderCost = 0;
  extrasCost = 0;
  sizeCost = 3.2;
  drinkCost = (extrasCost + sizeCost).toFixed(2);
  extras = "";
  malt = "";
  wc = "";
  flake = "";
  banana = "";
  marshmallows = "";
  raspberry = "";
  cranberry = "";
  strawberry = "";
  chocolate = "";
  drink = "";
  size = "Medium";
  type = "";
  ingredients = "";
  milkBase = " semi-skimmed milk";
  smoothieBase = " orange juice";
  favourite = "";
  favouriteCost = 0;
  TypeSelected = false;
  ingredientCount = 0;
}
function getData() {
  //fetch data from directory.json on server
  fetch("ingredients.json")
    //convert retrieved data to json
    .then((res) => res.json())

    //process data
    .then((data) => processData(data))

    //if anything goes wrong, output error message
    .catch((error) => console.log(`Error - ${error}`));
}
function processData(responseText) {
  ingredientList = {};
  ingredients = responseText;
  for (entry in ingredients) {
    ingredientList += ingredients[entry].ingredient;
  }
  console.log(ingredientList[2]);
}
function checkSize() {
  if (this.value == "small") {
    sizeCost = 2.7;
    size = "Small";
  } else if (this.value == "medium") {
    sizeCost = 3.2;
    size = "Medium";
  } else if (this.value == "large") {
    sizeCost = 3.7;
    size = "Large";
  } else {
    sizeCost = 4.5;
    size = "X-Large";
  }
  updateTotal();
}
function checkType() {
  if (this.value == "smoothie") {
    optsMilkshake.style.display = "none";
    optsSmoothie.style.display = "block";
    type = " smoothie:";
    TypeSelected = true;
  } else if (this.value == "milkshake") {
    optsMilkshake.style.display = "block";
    optsSmoothie.style.display = "none";
    type = " milkshake:";
    TypeSelected = true;
  } else {
    optsMilkshake.style.display = "none";
    optsSmoothie.style.display = "none";
  }
  checkValidDrink();
}
function checkIngredients() {
  if (this.value == "banana") {
    if (this.checked) {
      banana = " banana";
      ingredientCount++;
    } else {
      banana = "";
      ingredientCount--;
    }
  } else if (this.value == "raspberry") {
    if (this.checked) {
      raspberry = " raspberry";
      ingredientCount++;
    } else {
      raspberry = "";
      ingredientCount--;
    }
  } else if (this.value == "cranberry") {
    if (this.checked) {
      cranberry = " cranberry";
      ingredientCount++;
    } else {
      cranberry = "";
      ingredientCount--;
    }
  } else if (this.value == "strawberry") {
    if (this.checked) {
      strawberry = " strawberry";
      ingredientCount++;
    } else {
      strawberry = "";
      ingredientCount--;
    }
  } else {
    if (this.checked) {
      chocolate = " chocolate";
      ingredientCount++;
    } else {
      chocolate = "";
      ingredientCount--;
    }
  }
  ingredients = banana + raspberry + cranberry + strawberry + chocolate;
  checkValidDrink();
}
function checkExtras() {
  if (this.value == "malt") {
    if (this.checked) {
      extrasCost += 0.85;
      malt = " and extra malt";
    } else {
      extrasCost -= 0.85;
      malt = "";
    }
  } else if (this.value == "marshmallows") {
    if (this.checked) {
      extrasCost += 0.85;
      marshmallows = " and marshmallows";
    } else {
      extrasCost -= 0.85;
      marshmallows = "";
    }
  } else if (this.value == "w/c") {
    if (this.checked) {
      extrasCost += 0.85;
      wc = " and whipped cream";
    } else {
      extrasCost -= 0.85;
      wc = "";
    }
  } else {
    if (this.checked) {
      extrasCost += 0.85;
      flake = " and a flake";
    } else {
      extrasCost -= 0.85;
      flake = "";
    }
  }
  extras = malt + marshmallows + wc + flake;
  updateTotal();
}
function updateTotal() {
  drinkCost = parseFloat(sizeCost + extrasCost).toFixed(2);
  document.getElementById("drinkTotal").innerHTML = drinkCost;
}
function updateOrder() {
  document.getElementById("orderDrinks").innerHTML += drink + "<br>";
  orderCost = (parseFloat(drinkCost) + parseFloat(orderCost)).toFixed(2);
  console.log(orderCost);
  document.getElementById("orderTotal").innerHTML = orderCost;
}
function checkSmoothieBase() {
  if (this.value == "appleJuice") {
    smoothieBase = " apple juice";
  } else {
    smoothieBase = " orange juice";
  }
}
function checkMilkBase() {
  if (this.value == "wholeMilk") {
    milkBase = " whole milk";
  } else if (this.value == "ssMilk") {
    milkBase = " semi-skimmed milk";
  } else if (this.value == "cocoMilk") {
    milkBase = " coconut milk";
  } else {
    milkBase = " oat milk";
  }
}
function addOrder() {
  if (checkValidDrink()) {
    drink = size + type + ingredients + " with";
    if (type == " milkshake:") {
      drink += milkBase;
    } else if (type == " smoothie:") {
      drink += smoothieBase;
    }
    drink += extras + " £" + drinkCost;
    updateOrder();
    drink = "";
  }
}
function orderFavourite() {
  drink = favourite;
  if (favourite == "") {
  } else {
    updateOrder();
    drink = "";
  }
}
function saveFavourite() {
  if (checkValidDrink()) {
    favourite = size + type + ingredients + " with";
    if (type == " milkshake:") {
      favourite += milkBase;
    } else if (type == " smoothie:") {
      favourite += smoothieBase;
    }
    favourite += extras + " £" + drinkCost;
    document.getElementById("orderFav").disabled = false;
  }
}
function checkValidDrink() {
  if (ingredientCount >= 1 && TypeSelected == true) {
    document.getElementById("add").disabled = false;
    document.getElementById("saveFav").disabled = false;
    return true;
  } else {
    document.getElementById("add").disabled = true;
    document.getElementById("saveFav").disabled = true;
    return false;
  }
}
function placeOrder() {
  window.alert("Order placed. Total is £" + orderCost);
  location.reload();
}
