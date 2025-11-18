class winningScreen extends Phaser.Scene {
  constructor() {
    super("winningScreen");
  }

  init(data) {
    this.farm = data.farm;
     this.inventory = data.inventory;
    this.playerPos = data.playerPos;
  }

  preload() {

     this.load.spritesheet("winningScreen", "assets/winningScreen-01.png", {
      frameWidth: 640,
      frameHeight: 640,
      
    });
  }

  create() {
   
    console.log("This is winningScreen press spacebar");

     this.add.image(300, 320, "winningScreen");

    //this.input.once('pointerdown', function(){
    let spaceDown = this.input.keyboard.addKey("SPACE");

   spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed");

        // restart your items so player can play again
        window.flour = 0;
        window.milk = 0;
        window.honey = 0;
        window.egg = 0;

        // restart home
        this.scene.start("perloadScreen", {
          playerPos: { x: 663, y: 879 }
        });
      },
      this
    );
  }
}
