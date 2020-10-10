let apples = 0
let statsBox = document.getElementById("stats")
let inventoryBox = document.getElementById("inventory")
let buttons = document.getElementById("buttons")
let totalMod = 0
let inflation = 1.5
let collectionInterval = 0
let FPS = 0

let player = {
  name: "Steve",
  totalMod: totalMod,
  inventory: 0,
  appleCount: apples
}

let upgrades = {
  basket: {
    name: "Basket",
    price: 50,
    quantity: 0,
    multiplier: 2,
    regular: true
  },
  ladder: {
    name: "Ladder",
    price: 200,
    quantity: 0,
    multiplier: 5,
    regular: true

  },
  workCrew: {
    name: "Workers",
    price: 1000,
    quantity: 0,
    multiplier: 100,
    regular: false

  },
  tractor: {
    name: "Tractor",
    price: 10000,
    quantity: 0,
    multiplier: 1000,
    regular: false
  }
}
let workCrew = upgrades.workCrew
let tractor = upgrades.tractor



function startInterval() {
  collectionInterval = setInterval(collectAutoUpgrades, 1000);
}

function collectAutoUpgrades() {
  console.log(apples += FPS)
  update()
}

function addMods(itemName) {
  if (apples >= (upgrades[itemName]['price'])) {

    if (upgrades[itemName]['regular']) {
      totalMod += upgrades[itemName]['multiplier']
    }

    apples -= upgrades[itemName]['price']
    ++upgrades[itemName]['quantity']
    upgrades[itemName]['price'] *= inflation
    FPS += ((workCrew.multiplier * workCrew.quantity) + (tractor.multiplier * tractor.quantity))
  }

  update()
}

// FIXED
// NOTE fix multiplier on time based upgrades so the global multiplier number DOES NOT go up, just the FPS, apples, and quantities

function pick() {

  if (totalMod > 0) {
    apples += (1 * totalMod)
  } else {
    ++apples
  }

  upgradeAdd()
  update()
}

function upgradeAdd() {

}

function drawButtons() {
  let template = ""
  for (const key in upgrades) {
    if (upgrades.hasOwnProperty(key)) {

      template += `
      <div class="col-3 text-center">
      <h5>${upgrades[key].name}</h5>

      <div class="d-flex my-2 mx-auto">
      <i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
      <h5 class="ml-2 my-auto">${upgrades[key].multiplier}</h5>
      </div>


      <div class="d-flex my-2 mx-auto">
      <i class="fa fa-money fa-2x" aria-hidden="true"></i>
      <h5 class="ml-2 my-auto">${Math.floor(upgrades[key].price)}</h5>
      </div>

      <button class="btn btn-success shadow" onclick="addMods('${key}')">Buy</button>
      </div>
      `
    }
  }
  buttons.innerHTML = template
}

function update() {
  statsBox.innerHTML = `
  <div class="d-flex justify-content-around">
  <h5>Stats</h5> 
  <i class="fa fa-user-circle-o fa-2x" aria-hidden="true"></i>
  </div>
          <div class="text-left">
          <h6>Apples: ${Math.floor(apples)}</h6>
          <h6>FPS: ${FPS}</h6>
          <h6>Multiplier: ${totalMod}</h6>
          </div>
  `
  inventoryBox.innerHTML = `
  <div class="d-flex justify-content-around">
  <h5>Inventory</h5> 
  <i class="fa fa-info fa-2x" aria-hidden="true"></i>

  </div>
          <div class="text-left">
          <h6>Baskets: ${upgrades.basket.quantity}</h6>
          <h6>Ladders: ${upgrades.ladder.quantity}</h6>
          <h6>Work Crews: ${upgrades.workCrew.quantity}</h6>
          <h6>Tractors: ${upgrades.tractor.quantity}</h6>
          </div>
`

  drawButtons()
}

update()
startInterval()