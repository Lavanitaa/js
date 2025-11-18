class showInventory extends Phaser.Scene {
  constructor() {
    super({ key: "showInventory", active: false });
  }

  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
    this.farm = data.farm; // "flour" or "honey"
  }

  preload() {
    //Load heart image

    this.load.image("flourUI", "assets/flour.png");
    this.load.image("honeyUI", "assets/honey.png");
    this.load.image("eggUI", "assets/egg.png");
    this.load.image("milkUI", "assets/milk.png");
  }
  create() {
    console.log("***showInventory");
    this.scene.bringToTop("showInventory");

    // Setup flour
    this.flourNum = this.add
      .text(100, 30, window.flour, {
        font: "50px Futura PT Medium",
        fill: "#272e66",
      })
      .setScrollFactor(0);

    this.flour = this.add
      .image(70, 50, "flourUI")
      .setScrollFactor(0)
      .setVisible(true)
      .setScale(1.5);

    // Setup honey
    this.honeyNum = this.add
      .text(100, 30, window.honey, {
        font: "50px Futura PT Medium",
        fill: "#272e66",
      })
      .setScrollFactor(0);

    this.honey = this.add
      .image(70, 50, "honeyUI")
      .setScrollFactor(0)
      .setVisible(true)
      .setScale(1.5);

    // Setup egg
    this.eggNum = this.add
      .text(100, 30, window.egg, {
        font: "50px Futura PT Medium",
        fill: "#272e66",
      })
      .setScrollFactor(0);

    this.egg = this.add
      .image(70, 50, "eggUI")
      .setScrollFactor(0)
      .setVisible(true)
      .setScale(1.5);

    // Setup milk
    this.milkNum = this.add
      .text(100, 30, window.milk, {
        font: "50px Futura PT Medium",
        fill: "#272e66",
      })
      .setScrollFactor(0);

    this.milk = this.add
      .image(70, 50, "milkUI")
      .setScrollFactor(0)
      .setVisible(true)
      .setScale(1.5);

    // ✅ Hide irrelevant UI based on farm
    if (this.farm === "flour") {
      this.honeyNum.setVisible(false);
      this.honey.setVisible(false);
      this.eggNum.setVisible(false);
      this.egg.setVisible(false);
      this.milkNum.setVisible(false);
      this.milk.setVisible(false);
    } else if (this.farm === "honey") {
      this.flourNum.setVisible(false);
      this.flour.setVisible(false);
      this.eggNum.setVisible(false);
      this.egg.setVisible(false);
      this.milkNum.setVisible(false);
      this.milk.setVisible(false);
    } else if (this.farm === "egg") {
      this.flourNum.setVisible(false);
      this.flour.setVisible(false);
      this.honeyNum.setVisible(false);
      this.honey.setVisible(false);
      this.milkNum.setVisible(false);
      this.milk.setVisible(false);
    } else if (this.farm === "milk") {
      this.flourNum.setVisible(false);
      this.flour.setVisible(false);
      this.honeyNum.setVisible(false);
      this.honey.setVisible(false);
      this.eggNum.setVisible(false);
      this.egg.setVisible(false);
    }

    // Recv an event, call the method
    this.events.on("inventory", this.updateScreen, this);
  } // end of create

  updateScreen(data) {
    // Only update the resource that is passed in the event
    if (data.flour !== undefined) {
      this.flourNum.setText(data.flour);
    }

    if (data.honey !== undefined) {
      this.honeyNum.setText(data.honey);
    }

    if (data.egg !== undefined) {
      this.eggNum.setText(data.egg);
    }

    if (data.milk !== undefined) {
      this.milkNum.setText(data.milk);
    }

    // Optional: log current counts for debugging
    console.log(
      "flour:",
      window.flour,
      "honey:",
      window.honey,
      "egg:",
      window.egg,
       "milk:",
      window.milk
    );
  }
} // end of class
