class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init(data) {
    this.farm = data.farm;
  }

  preload() {

     this.load.spritesheet("gameOver", "assets/gameOver.png", {
      frameWidth: 640,
      frameHeight: 640,
      
    });
  }

  create() {
    console.log("This is gameOver press spacebar");
    this.scene.stop("showInventory");
  
     this.add.image(320, 320, "gameOver");

    //this.input.once('pointerdown', function(){
    let spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed");
        if (this.farm == 1) {
          this.scene.start("insideMilkFarm");
        } else if (this.farm == 2) {
          this.scene.start("insideHoneyFarm");
        } else if (this.farm == 3) {
          this.scene.start("insideFlourFarm");
        } else if (this.farm == 4) {
          this.scene.start("insideEggFarm");
        }
      },
      this
    );
  }
}
