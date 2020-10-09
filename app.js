let apples = 0
let statsBox = document.getElementById("stats")
let inventoryBox = document.getElementById("inventory")
let buttons = document.getElementById("buttons")
let totalMod = 0
let inflation = 1

let player = {
  name: "Steve",
  totalMod: totalMod,
  inventory: 0,
  appleCount: apples
}

let upgrades = {
  basket: {
    name: "Basket",
    price: 3,
    quantity: 0,
    multiplier: 1
  },
  ladder: {
    name: "Ladder",
    price: 5,
    quantity: 0,
    multiplier: 3
  },
  workCrew: {
    name: "Workers",
    price: 10,
    quantity: 0,
    multiplier: 20
  },
  tractor: {
    name: "Tractor",
    price: 15,
    quantity: 0,
    multiplier: 50
  }
}




function addMods(itemName) {
  if (apples >= (upgrades[itemName]['price'] * inflation)) {
    totalMod += upgrades[itemName]['multiplier']
    apples -= upgrades[itemName]['price']
    ++upgrades[itemName]['quantity']
    inflation *= 1.05
  }

  update()
}

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
      <h5 class="ml-2 my-auto">${Math.floor((upgrades[key].price * inflation))}</h5>
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
          <h6>Apples: ${apples}</h6>
          <h6>FPS: </h6>
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
