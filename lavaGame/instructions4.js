class instructions4 extends Phaser.Scene {
  constructor() {
    super("instructions4");
  }

  preload() {
    this.load.spritesheet("scene3", "assets/scene3.png", {
      frameWidth: 640,
      frameHeight: 640,
    });

    this.load.image("dialogBoxImg", "assets/dialogBox.png");
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
    console.log("This is instructions3");

    this.add.image(320, 320, "scene3");

    this.add.image(320, 500, "dialogBoxImg");

    // Dialog box
    this.add.image(320, 500, "dialogBoxImg");

    // Start with empty text
    let line1 = this.add.text(95, 450, "", {
  fontFamily: "pixelify",
      fontSize: "17px",
      fill: "#6f2e00",
    });
     let line2 = this.add.text(70, 480, "", {
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
      "The ingrediants list is on the table! Once you collected",
      40
    );


    this.time.delayedCall(1500, () => {
      this.typeText(
        line2,
        "all the ingrediants come back home so we can make the pie",
        40
      );
    })


    this.time.delayedCall(3000, () => {
      this.typeText(line3, "Press space to pick up ingrediant list", 40);
    });

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto instructions5");
        this.scene.start("instructions5");
      },
      this
    );
  }
}
