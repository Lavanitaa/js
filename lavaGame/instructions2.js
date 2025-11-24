class instructions2 extends Phaser.Scene {
  constructor() {
    super("instructions2");
  }

  preload() {
    this.load.spritesheet("Scene2", "assets/SCene2 (2).png", {
      frameWidth: 640,
      frameHeight: 640,
    });

    this.load.image("dialogBoxImg", "assets/dialogBox.png");

    this.load.audio("phoneRing", "assets/phone.mp3");
  }

  typeText(textObject, message, speed = 40) {
    let i = 0;
    this.time.addEvent({
      delay: speed, // speed of typing
      repeat: message.length - 1,
      callback: () => {
        textObject.text += message[i];
        i++;
      },
    });
  }

  create() {
    console.log("This is instructions2");

    this.bgMusic = this.sound.add("phoneRing", { loop: true }).setVolume(0.06);
    this.bgMusic.play();

    this.anims.create({
      key: "Scene2Anim",
      frames: this.anims.generateFrameNumbers("Scene2", {
        start: 0,
        end: 65, //
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.add.sprite(320, 320, "Scene2").play("Scene2Anim");

    this.add.image(320, 500, "dialogBoxImg");

    // Dialog box
    this.add.image(320, 500, "dialogBoxImg");

    // Start with empty text
    let line1 = this.add.text(100, 450, "", {
      fontFamily: "pixelify",
      fontSize: "17px",
      fill: "#6f2e00",
    });
    let line2 = this.add.text(130, 480, "", {
      fontFamily: "pixelify",
      fontSize: "17px",
      fill: "#6f2e00",
    });
    let line3 = this.add.text(170, 520, "", {
      fontFamily: "pixelify",
      fontSize: "17px",
      fill: "#6f2e00",
    });

    // Play typewriter animation
    this.typeText(
      line1,
      "You were sleeping pecefully when you suddendly hear",
      40
    );
    this.time.delayedCall(1500, () => {
      this.typeText(line2, "your phone rings. It's a call from Mama Bear!", 40);
    });
    this.time.delayedCall(3000, () => {
      this.typeText(line3, "Press space to pick up the phone", 40);
    });

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto instructions3");
        this.bgMusic.stop();
        this.scene.start("instructions3");
      },
      this
    );
  }
}
