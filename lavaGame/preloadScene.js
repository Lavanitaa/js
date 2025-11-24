class preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.spritesheet("Cover", "assets/CoverSprite.png", {
      frameWidth: 640,
      frameHeight: 640,
    });

    this.load.audio("bgmusic", "assets/bg.mp3");
  }
  create() {
    console.log("This is preloadPage");

     if (!this.sys.game.bgMusic) {
        this.sys.game.bgMusic = this.sound.add("bgmusic", { loop: true, volume: 2.0 });
        this.sys.game.bgMusic.play();
    }

    this.anims.create({
      key: "coverAnim",
      frames: this.anims.generateFrameNumbers("Cover", {
        start: 0,
        end: 65, //
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.add.sprite(320, 320, "Cover").play("coverAnim");

    //this.input.once('pointerdown', function(){
    let key5Down = this.input.keyboard.addKey(53);
    key5Down.on(
      "down",
      function () {
        console.log("5 pressed (home)");
        this.scene.start("home");
      },
      this
    );

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto instructions2");
        this.scene.start("instructions2");
      },
      this
    );
  }
}
