////////////////////////////////////////////////////////
// globalFunctions.js
////////////////////////////////////////////////////////

function updateInventory() {
  console.log("*** updateInventory()");
  // build payload
  this.inventory = {};
  this.inventory.flour = window.flour;
  this.inventory.honey = window.honey;
  this.inventory.egg = window.egg;


  // emit event to showInventory scene
  this.scene.get('showInventory').events.emit('inventory', this.inventory);
}

function globalHitFlour(player, item) {
  console.log("*** player overlap key");

  window.flour++;
  item.disableBody(true, true);

  updateInventory.call(this);
}
