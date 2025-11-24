class gameOver extends Phaser.Scene {
  constructor() {
    super("gameOver");
  }

  init(data) {
    this.farm = data.farm;
  }

  preload() {
    this.load.audio("gameOverMusic", "assets/gameOver.mp3");

    this.load.spritesheet("gameOver", "assets/gameOver.png", {
      frameWidth: 640,
      frameHeight: 640,
    });
  }

  create() {
    console.log("This is gameOver press spacebar");
    this.scene.stop("showInventory");

    // Stop the normal bg music
    if (this.sys.game.bgMusic) {
      this.sys.game.bgMusic.stop();
    }

    // Play Game Over music
    this.gameOverMusic = this.sound.add("gameOverMusic", {
      loop: true,
      volume: 3.0,
    });
    this.gameOverMusic.play();

    this.add.image(320, 320, "gameOver");

    //this.input.once('pointerdown', function(){
    let spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed");

        if (this.gameOverMusic) this.gameOverMusic.stop();

        // Resume normal bg music
        if (this.sys.game.bgMusic) this.sys.game.bgMusic.play();

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
