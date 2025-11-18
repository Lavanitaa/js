class instructions4 extends Phaser.Scene {
  constructor() {
    super("instructions4");
  }

  preload() {
    this.load.spritesheet("instructionScreen", "assets/instructionSceen.png", {
      frameWidth: 640,
      frameHeight: 640,
    });

    this.load.spritesheet("flourImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("honeyImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("milkImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("eggImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("chiliImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("onionImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("pickleImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("bananaImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    console.log("This is instructions4");

    // centered & scaled instruction screen
    let instruction = this.add.image(319, 319, "instructionScreen");

    // Increase size by exactly 1 px
    instruction.setDisplaySize(instruction.width + 1, instruction.height + 1);

    //good ingrediants

    this.anims.create({
      key: "slowegg",
      frames: this.anims.generateFrameNumbers("eggImg", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowmilk",
      frames: this.anims.generateFrameNumbers("milkImg", {
        start: 9,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowflour",
      frames: this.anims.generateFrameNumbers("flourImg", {
        start: 16,
        end: 19,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowhoney",
      frames: this.anims.generateFrameNumbers("honeyImg", {
        start: 24,
        end: 27,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //bad ingredinats

    this.anims.create({
      key: "slowchili",
      frames: this.anims.generateFrameNumbers("chiliImg", {
        start: 4,
        end: 7,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowonion",
      frames: this.anims.generateFrameNumbers("onionImg", {
        start: 12,
        end: 15,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowpickle",
      frames: this.anims.generateFrameNumbers("pickleImg", {
        start: 20,
        end: 23,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "slowbanana",
      frames: this.anims.generateFrameNumbers("bananaImg", {
        start: 28,
        end: 31,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //good ingrediants
    this.add.sprite(160, 220, "eggImg").play("slowegg").setScale(3);
    this.add.sprite(260, 220, "milkImg").play("slowmilk").setScale(3);
    this.add.sprite(360, 220, "flourImg").play("slowflour").setScale(3);
    this.add.sprite(460, 220, "honeyImg").play("slowhoney").setScale(3);

    // bad ingrediants
    this.add.sprite(160, 360, "eggImg").play("slowchili").setScale(3);
    this.add.sprite(260, 360, "milkImg").play("slowhoney").setScale(3);
    this.add.sprite(360, 360, "flourImg").play("slowonion").setScale(3);
    this.add.sprite(460, 360, "honeyImg").play("slowpickle").setScale(3);

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto home");
        this.scene.start("home", { playerPos: { x: 876, y: 665 } });
      },
      this
    );
  }
}
