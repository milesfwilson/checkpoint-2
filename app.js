// NOTE Fix FPS //

let apples = 0
let statsBox = document.getElementById("stats")
let inventoryBox = document.getElementById("inventory")
let buttons = document.getElementById("buttons")
let badges = document.getElementById("badges")
let totalMod = 0
let inflation = 1.1
let collectionInterval = 0
let FPS = 0
let badgesNum = 0
let unlock = 0

let badgeOptions = {
  trophy: {
    name: "Trophy",
    applesNeeded: 100,
    icon: `<i class="fa fa-trophy fa-3x" aria-hidden="true"></i>`
  },
  star: {
    name: "Star",
    applesNeeded: 1000,
    icon: `<i class="fa fa-star fa-3x" aria-hidden="true"></i>`
  },
  apple: {
    name: "Apple",
    applesNeeded: 100000,
    icon: `<i class="fas fa-apple-alt fa-3x"></i>`
  },
  award: {
    name: "Award",
    applesNeeded: 500000,
    icon: `<i class="fas fa-award fa-3x"></i>`
  },
  wizard: {
    name: "Wizard",
    applesNeeded: 1000000,
    icon: `<i class="fas fa-hat-wizard fa-3x"></i>`
  },
  tractor: {
    name: "Tractor",
    applesNeeded: 5000000,
    icon: `<i class="fas fa-tractor fa-3x"></i>`
  }

}



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
  apples += FPS
  unlock += FPS
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
    FPS = ((workCrew.multiplier * workCrew.quantity) + (tractor.multiplier * tractor.quantity))
  }

  update()
}

// FIXED
// NOTE fix multiplier on time based upgrades so the global multiplier number DOES NOT go up, just the FPS, apples, and quantities

function pick() {

  if (totalMod > 0) {
    apples += (1 * totalMod)
    unlock += (1 * totalMod)
  } else {
    ++apples
    ++unlock
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
      <div class="bg-light shadow radius-25 p-3">
      <h5>${upgrades[key].name}</h5>
      
      <div class="d-flex my-2 justify-content-center">
      <h6 class="mr-2 my-auto">${upgrades[key].multiplier}</h6>
      <i class="fas fa-times mt-1"></i>
      </div>
      
      
      `

      if (apples >= upgrades[key].price) {
        template +=
          `<button class="btn btn-success btn-block shadow" onclick="addMods('${key}')"><div class="d-flex justify-content-center">
        <i class="fas fa-coins text-warning my-2"></i>
        <h6 class="ml-auto my-auto">${Math.floor(upgrades[key].price)}</h6>
        </div></button>
        </div>
        </div>
        `
      } else {
        template += `<button class="btn btn-primary shadow btn-block" onclick="addMods('${key}')" disabled><div class="d-flex justify-content-center">
        <i class="fas fa-coins text-warning my-2"></i>
        <h6 class="ml-auto my-auto">${Math.floor(upgrades[key].price)}</h6>
        </div></button>
        </div>
        </div>

        `
      }
    }
  }
  buttons.innerHTML = template
}

function drawBadges() {


  let template = ""
  for (const key in badgeOptions) {
    if (badgeOptions.hasOwnProperty(key)) {

      if (unlock > badgeOptions[key]['applesNeeded']) {

        template += `<div class="p-2 text-warning text-center">
        ${badgeOptions[key]['icon']}
        <h6 class="mt-1">${badgeOptions[key]['applesNeeded']}</h6>
        </div>
        `
      }

    }
  }

  badges.innerHTML = template
}

function update() {

  statsBox.innerHTML = `
  <div class="d-flex justify-content-center text-center bg-dark radius-25 shadow py-2 px-3 text-light">
  <i class="far fa-chart-bar fa-2x mr-2"></i>
  <h5 class="my-auto">Stats</h5> 
  </div>
          <div class="text-left shadow bg-light radius-25 p-3 mt-3 text-dark">
          <h6>Apples: ${Math.floor(apples)}</h6>
          <h6>APS: ${FPS}</h6>
          <h6>Hands: ${totalMod}</h6>
          </div>
  `
  inventoryBox.innerHTML = `
  <div class="d-flex justify-content-center text-center bg-dark radius-25 shadow py-2 px-3 text-light">
  <i class="fas fa-truck-moving fa-2x mr-2"></i>
  <h5 class="my-auto">Inventory</h5> 

  </div>
          <div class="text-left bg-light shadow radius-25 p-3 mt-3 text-dark">
          <h6>Baskets: ${upgrades.basket.quantity}</h6>
          <h6>Ladders: ${upgrades.ladder.quantity}</h6>
          <h6>Work Crews: ${upgrades.workCrew.quantity}</h6>
          <h6>Tractors: ${upgrades.tractor.quantity}</h6>
          </div>
`
  drawBadges()
  drawButtons()
}

update()
startInterval()