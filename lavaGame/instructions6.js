class instructions6 extends Phaser.Scene {
  constructor() {
    super("instructions6");
  }

  preload() {
    this.load.audio("phoneTurnSound", "assets/paperTurn.mp3");

    this.load.spritesheet("scene5", "assets/IngrediantList2.png", {
      frameWidth: 640,
      frameHeight: 640,
    });
  }
  create() {
    console.log("This is instructions4");

    this.bgMusic = this.sound
      .add("phoneTurnSound", { loop: false })
      .setVolume(5);
    this.bgMusic.play();

    this.add.image(320, 320, "scene5").setScale(2);

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto home");
        if (this.bgMusic) this.bgMusic.stop();
        this.scene.start("home", { playerPos: { x: 876, y: 665 } });
      },
      this
    );
  }
}
