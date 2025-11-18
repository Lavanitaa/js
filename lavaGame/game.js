var config = {
    type: Phaser.AUTO,
    // pixel size * tile map size * zoom 
    width: 32 * 20,
    height: 32 * 20,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {
       mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000',
    pixelArt: true,
    scene: [preload, world, eggFarm, honeyFarm, milkFarm, home, insideEggFarm, insideMilkFarm, insideFlourFarm, insideHoneyFarm, gameOver,winningScreen,showInventory, instructions2,instructions3, instructions4,]

   
    
    
};





var game = new Phaser.Game(config);

window.flour=0
window.honey=0
window.milk=0
window.egg=0