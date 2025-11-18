class instructions3 extends Phaser.Scene {
  constructor() {
    super("instructions3");
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
    let line1 = this.add.text(120, 430, "", {
      font: "13px Courier",
      fill: "#0b3f66",
    });
     let line2 = this.add.text(70, 460, "", {
      font: "13px Courier",
      fill: "#0b3f66",
    });
     let line3 = this.add.text(100, 490, "", {
      font: "13px Courier",
      fill: "#0b3f66",
    });
    let line4 = this.add.text(100, 520, "", {
      font: "13px Courier",
      fill: "#0b3f66",
    });
    let line5 = this.add.text(150, 550, "", {
      font: "13px Courier",
      fill: "#0b3f66",
    });
   
    // Play typewriter animation
    this.typeText(
      line1,
      "Hello dear! Can you please gather some ingrediants",
      40
    );
  
    this.time.delayedCall(1500, () => {
    this.typeText(
      line2,
      "for the Annual Tata Pie Contest. I completely forgot about it.",
      40
      );
  });


    this.time.delayedCall(3000, () => {
      this.typeText(
        line3,
        "The ingrediants list is on the table! Once you collected",
        40
      );
    });


    this.time.delayedCall(4500, () => {
      this.typeText(
        line4,
        "all the ingrediants come back home so we can make the pie",
        40
      );
    })


    this.time.delayedCall(6000, () => {
      this.typeText(line5, "Press space to pick up ingrediant list", 40);
    });

    //this.input.once('pointerdown', function(){
    var spaceDown = this.input.keyboard.addKey("SPACE");

    spaceDown.on(
      "down",
      function () {
        console.log("Spacebar pressed, goto instructions4");
        this.scene.start("instructions4");
      },
      this
    );
  }
}
