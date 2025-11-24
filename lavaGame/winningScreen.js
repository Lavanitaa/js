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
    this.load.audio("winningMusic", "assets/winning.mp3");

    this.load.spritesheet("winningScreen", "assets/winningScreen.png", {
      frameWidth: 640,
      frameHeight: 640,
    });
  }

  create() {
    console.log("This is winningScreen press spacebar");

    // Stop the normal bg music
    if (this.sys.game.bgMusic) {
      this.sys.game.bgMusic.stop();
    }

     // Play Game Over music
    this.winningMusic = this.sound.add("winningMusic", {
      loop: true,
      volume: 2.0,
    });
    this.winningMusic.play();

    this.add.image(320, 320, "winningScreen").setScale(2);

    //this.input.once('pointerdown', function(){
    let spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed");

        if (this.winningMusic) this.winningMusic.stop();

        // Resume normal bg music
        if (this.sys.game.bgMusic) this.sys.game.bgMusic.play();

        // restart your items so player can play again
        window.flour = 0;
        window.milk = 0;
        window.honey = 0;
        window.egg = 0;

        // restart home
        this.scene.start("preload", {
          playerPos: { x: 663, y: 879 },
        });
      },
      this
    );
  }
}
