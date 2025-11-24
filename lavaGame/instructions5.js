class instructions5 extends Phaser.Scene {
  constructor() {
    super("instructions5");
  }

 preload() {

  this.load.audio("phoneTurnSound", "assets/paperTurn.mp3");

    this.load.spritesheet("scene4", "assets/IngrediantList1.png", {
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

    
    this.bgMusic = this.sound.add("phoneTurnSound", { loop: false }).setVolume(5);
    this.bgMusic.play();

   this.add.image(320, 320, "scene4").setScale(2);
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
    this.add.sprite(160, 260, "eggImg").play("slowegg").setScale(3);
    this.add.sprite(260, 260, "milkImg").play("slowmilk").setScale(3);
    this.add.sprite(360, 260, "flourImg").play("slowflour").setScale(3);
    this.add.sprite(460, 260, "honeyImg").play("slowhoney").setScale(3);

    // bad ingrediants
    this.add.sprite(160, 420, "eggImg").play("slowchili").setScale(3);
    this.add.sprite(260, 420, "milkImg").play("slowbanana").setScale(3);
    this.add.sprite(360, 420, "flourImg").play("slowonion").setScale(3);
    this.add.sprite(460, 420, "honeyImg").play("slowpickle").setScale(3);

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto instructions6");
        if (this.bgMusic) this.bgMusic.stop();
        this.scene.start("instructions6", { playerPos: { x: 876, y: 665 } });
      },
      this
    );
  }
}
