class insideHoneyFarm extends Phaser.Scene {
  constructor() {
    super({
      key: "insideHoneyFarm",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
    this.playerPos = data.playerPos;
  }
  preload() {
    //this is the exported JSON map file
    this.load.tilemapTiledJSON("insideHoneyFarm", "assets/insideHoneyFarm.tmj");

    this.load.image(
      "treeImg",
      "assets/vectoraith_tileset_farmingsims_details_spring_32x32.png"
    );

    this.load.image(
      "buildingImg",
      "assets/vectoraith_tileset_farmingsims_buildings_32x32.png"
    );

    this.load.image("natureImg", "assets/nature_32x32.png");

    this.load.spritesheet("charaImg", "assets/charater.png", {
      frameWidth: 32,
      frameHeight: 34,
    });

    this.load.spritesheet("honeyImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("onionImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

     this.load.scenePlugin({
      key: "AnimatedTiles",
      url: "https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js",
      sceneKey: "animatedTiles",
    });
  }

  create() {
    console.log("*** insideHoneyFarm scene");

// launch inventory UI and tell it we're in flour farm
this.scene.launch("showInventory", { farm: "honey" });

    let key6Down = this.input.keyboard.addKey(54);

    key6Down.on(
      "down",
      function () {
        console.log("6 pressed (insideHoneyFarm)");
        this.scene.start("insideHoneyFarm");
      },
      this
    );

    // Create the map from main
    let map = this.make.tilemap({
      key: "insideHoneyFarm",
    });

    // Load the game tiles
    let treeTiles = map.addTilesetImage(
      "vectoraith_tileset_farmingsims_details_spring_32x32",
      "treeImg"
    );

    let buildingTiles = map.addTilesetImage(
      "vectoraith_tileset_farmingsims_buildings_32x32",
      "buildingImg"
    );

    let natureTiles = map.addTilesetImage("nature_32x32", "natureImg");

    let tilesArray = [buildingTiles, treeTiles, natureTiles];

    //Load in layers by layers

    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.fenceLayer = map.createLayer("fenceLayer", tilesArray, 0, 0);

    this.fenceLayer.setCollisionByExclusion(-1, true);

       // Init animations on map
    this.animatedTiles.init(map);

    //main charater
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("charaImg", { start: 4, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("charaImg", {
        start: 8,
        end: 11,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("charaImg", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("charaImg", {
        start: 12,
        end: 15,
      }),
      frameRate: 5,
      repeat: -1,
    });

    var start = map.findObject("objectLayer", (obj) => obj.name === "start");

    this.player = this.physics.add
      .sprite(start.x, start.y, "charaImg")
      .setScale(1.5)
      .play("down");
    this.cursors = this.input.keyboard.createCursorKeys();
    window.player = this.player;

    //honey object
    this.anims.create({
      key: "slowhoney",
      frames: this.anims.generateFrameNumbers("honeyImg", {
        start: 24,
        end: 27,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //onion object
    this.anims.create({
      key: "fastonion",
      frames: this.anims.generateFrameNumbers("honeyImg", {
        start: 12,
        end: 15,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //collect items
    let honey1 = map.findObject("objectLayer", (obj) => obj.name === "honey1");
    this.honey1 = this.physics.add
      .sprite(honey1.x, honey1.y, "honeyImg")
      .play("slowhoney");

    let honey2 = map.findObject("objectLayer", (obj) => obj.name === "honey2");
    this.honey2 = this.physics.add
      .sprite(honey2.x, honey2.y, "honeyImg")
      .play("slowhoney");

    let honey3 = map.findObject("objectLayer", (obj) => obj.name === "honey3");
    this.honey3 = this.physics.add
      .sprite(honey3.x, honey3.y, "honeyImg")
      .play("slowhoney");

    let honey4 = map.findObject("objectLayer", (obj) => obj.name === "honey4");
    this.honey4 = this.physics.add
      .sprite(honey4.x, honey4.y, "honeyImg")
      .play("slowhoney");

    let honey5 = map.findObject("objectLayer", (obj) => obj.name === "honey5");
    this.honey5 = this.physics.add
      .sprite(honey5.x, honey5.y, "honeyImg")
      .play("slowhoney");

    //enemy chili follow the player
    let enemy1 = map.findObject("objectLayer", (obj) => obj.name === "enemy1");
    let enemy2 = map.findObject("objectLayer", (obj) => obj.name === "enemy2");
    let enemy3 = map.findObject("objectLayer", (obj) => obj.name === "enemy3");
    let enemy4 = map.findObject("objectLayer", (obj) => obj.name === "enemy4");
    let enemy5 = map.findObject("objectLayer", (obj) => obj.name === "enemy5");
    let enemy6 = map.findObject("objectLayer", (obj) => obj.name === "enemy6");
    let enemy7 = map.findObject("objectLayer", (obj) => obj.name === "enemy7");
    let enemy8 = map.findObject("objectLayer", (obj) => obj.name === "enemy8");

    this.enemy1 = this.physics.add
      .sprite(enemy1.x, enemy1.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy2 = this.physics.add
      .sprite(enemy2.x, enemy2.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy3 = this.physics.add
      .sprite(enemy3.x, enemy3.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy4 = this.physics.add
      .sprite(enemy4.x, enemy4.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy5 = this.physics.add
      .sprite(enemy5.x, enemy5.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy6 = this.physics.add
      .sprite(enemy6.x, enemy6.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy7 = this.physics.add
      .sprite(enemy7.x, enemy7.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy8 = this.physics.add
      .sprite(enemy8.x, enemy8.y, "onionImg")
      .setScale(1.5)
      .play("fastonion");
    this.cursors = this.input.keyboard.createCursorKeys();

    //signboard
    this.SIGN1 = map.findObject("objectLayer", (obj) => obj.name === "sign1");
    this.SIGN2 = map.findObject("objectLayer", (obj) => obj.name === "sign2");

    this.popUp1Area = new Phaser.Geom.Rectangle(
      this.SIGN1.x,
      this.SIGN1.y,
      this.SIGN1.width,
      this.SIGN1.height
    );

    this.popUp2Area = new Phaser.Geom.Rectangle(
      this.SIGN2.x,
      this.SIGN2.y,
      this.SIGN2.width,
      this.SIGN2.height
    );

    this.dialogText = this.add
      .text(0, 0, "", {
        font: "16px Arial Black",
        fill: "#b54f01ff",
        stroke: "#000000",
        strokeThickness: 4,
      })
      .setOrigin(0.5) // Center the text
      .setDepth(100) // Make sure it's above other elements
      .setVisible(false); // Hide it initially

    // camera follow player
    this.cameras.main.startFollow(this.player);

    // Prevent black area of edge of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.physics.add.overlap(
      this.player,
      [this.honey1, this.honey2, this.honey3, this.honey4, this.honey5],
      this.hitHoney,
      null,
      this
    );

    //enemy onion
    this.physics.add.overlap(
      this.player,
      [
        this.enemy1,
        this.enemy2,
        this.enemy3,
        this.enemy4,
        this.enemy5,
        this.enemy6,
        this.enemy7,
        this.enemy8,
      ],
      this.hitOnion,
      null,
      this
    );
    //player collideral
    this.physics.add.collider(this.player, this.fenceLayer);
  } /////////////////// end of create //////////////////////////////

  update() {
    this.physics.moveToObject(this.enemy1, this.player, 60, 2000);
    this.physics.moveToObject(this.enemy2, this.player, 60, 2000);
    this.physics.moveToObject(this.enemy3, this.player, 60, 2000);
    this.physics.moveToObject(this.enemy4, this.player, 60, 2000);
    this.physics.moveToObject(this.enemy5, this.player, 60, 2000);
    this.physics.moveToObject(this.enemy6, this.player, 60, 2000);
    this.physics.moveToObject(this.enemy7, this.player, 60, 2000);
    this.physics.moveToObject(this.enemy8, this.player, 60, 2000);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
      this.player.anims.play("up", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
      this.player.anims.play("down", true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop();
    }

    if (
      this.player.x > 106 &&
      this.player.x < 175 &&
      this.player.y > 590 &&
      this.player.y < 646 &&
      window.honey > 0
    ) {
      console.log("Go to honeyFarm function");
      this.honeyFarm();
    }

    //sign board
    this.dialogText.setVisible(false);

    // Now handle dialog text display
    if (this.popUp1Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("exit");
      this.dialogText.setVisible(true);
    } else if (this.popUp2Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("enter");
      this.dialogText.setVisible(true);
    }

    // Update the text position to be above the player
    if (this.dialogText.visible) {
      this.dialogText.x = this.player.x;
      this.dialogText.y = this.player.y - 40; // 40 pixels above the player
    }
  } /////////////////// end of update //////////////////////////////

 hitHoney(player, honey) {
    console.log("Player collected honey");

    // Remove honey from the scene
    honey.destroy();

    window.honey++;

    // Only send honey
    this.scene
      .get("showInventory")
      .events.emit("inventory", { honey: window.honey });
}


  hitOnion(player, enemy) {
    console.log("Player get hit by onion");

    // shake screen
    this.cameras.main.shake(300);

    // disable enemy body

    // reset honey count
    window.honey = 0;

    this.scene.start("gameOver", { farm: 2 });

    
  }

  // after exit "inside milk farm" player start rom here when entering honey farm
  honeyFarm(player, tile) {
    console.log("honeyFarm function");

    let playerPos = {};
    playerPos.x = 565;
    playerPos.y = 705;
    this.scene.start("honeyFarm", { playerPos: playerPos });
  }
} //////////// end of class world ////////////////////////
