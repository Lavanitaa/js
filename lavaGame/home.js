class home extends Phaser.Scene {
  constructor() {
    super({
      key: "home",
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
    this.load.tilemapTiledJSON("home", "assets/home.tmj");

    this.load.image(
      "buildingImg",
      "assets/vectoraith_tileset_farmingsims_buildings_32x32.png"
    );
    this.load.image(
      "treeImg",
      "assets/vectoraith_tileset_farmingsims_details_spring_32x32.png"
    );
    this.load.image("natureImg", "assets/nature_32x32.png");
    this.load.spritesheet("charaImg", "assets/charater.png", {
      frameWidth: 32,
      frameHeight: 34,
    });

    this.load.scenePlugin({
      key: "AnimatedTiles",
      url: "https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js",
      sceneKey: "animatedTiles",
    });
  }

  create() {
    console.log("*** home scene");

    let key5Down = this.input.keyboard.addKey(53);

    key5Down.on(
      "down",
      function () {
        console.log("5 pressed (home)");
        this.scene.start("home");
      },
      this
    );

    // Create the map from main
    let map = this.make.tilemap({
      key: "home",
    });

    // Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    let buildingTiles = map.addTilesetImage(
      "vectoraith_tileset_farmingsims_buildings_32x32",
      "buildingImg"
    );
    let treeTiles = map.addTilesetImage(
      "vectoraith_tileset_farmingsims_details_spring_32x32",
      "treeImg"
    );
    let natureTiles = map.addTilesetImage("nature_32x32", "natureImg");

    let tilesArray = [buildingTiles, treeTiles, natureTiles];

    //Load in layers by layers

    this.waterLayer = map.createLayer("waterLayer", tilesArray, 0, 0);
    this.water2Layer = map.createLayer("water2Layer", tilesArray, 0, 0);
    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);
    this.tree3Layer = map.createLayer("tree3Layer", tilesArray, 0, 0);
    this.treeLayer = map.createLayer("treeLayer", tilesArray, 0, 0);
    this.tree2Layer = map.createLayer("tree2Layer", tilesArray, 0, 0);

    this.waterLayer.setCollisionByExclusion(-1, true);
    this.water2Layer.setCollisionByExclusion(-1, true);
    this.itemLayer.setCollisionByExclusion(-1, true);
    this.tree3Layer.setCollisionByExclusion(-1, true);
    this.treeLayer.setCollisionByExclusion(-1, true);
    this.tree2Layer.setCollisionByExclusion(-1, true);

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

    let spawnX, spawnY;

    if (this.playerPos) {
      // Coming from another scene → use given coordinates
      spawnX = this.playerPos.x;
      spawnY = this.playerPos.y;
    } else {
      // Default spawn point in Tiled
      let start = map.findObject("objectLayer", (obj) => obj.name === "start");
      spawnX = start.x;
      spawnY = start.y;
    }

    this.player = this.physics.add
      .sprite(spawnX, spawnY, "charaImg")
      .setScale(1.5)
      .play("down");

    this.cursors = this.input.keyboard.createCursorKeys();
    window.player = this.player;

    // camera follow player
    this.cameras.main.startFollow(this.player);

    // Prevent black area of edge of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //player collider

    this.physics.add.collider(this.player, this.waterLayer);
    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.treeLayer);
    this.physics.add.collider(this.player, this.tree2Layer);
    this.physics.add.collider(this.player, this.tree3Layer);

    //sign board
    this.SIGN1 = map.findObject("objectLayer", (obj) => obj.name === "sign1");
    this.SIGN2 = map.findObject("objectLayer", (obj) => obj.name === "sign2");
    this.SIGN3 = map.findObject("objectLayer", (obj) => obj.name === "sign3");
    this.SIGN4 = map.findObject("objectLayer", (obj) => obj.name === "sign4");
    this.SIGN5 = map.findObject("objectLayer", (obj) => obj.name === "sign5");

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

    this.popUp3Area = new Phaser.Geom.Rectangle(
      this.SIGN3.x,
      this.SIGN3.y,
      this.SIGN3.width,
      this.SIGN3.height
    );

    this.popUp4Area = new Phaser.Geom.Rectangle(
      this.SIGN4.x,
      this.SIGN4.y,
      this.SIGN4.width,
      this.SIGN4.height
    );

    this.popUp5Area = new Phaser.Geom.Rectangle(
      this.SIGN5.x,
      this.SIGN5.y,
      this.SIGN5.width,
      this.SIGN5.height
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
  } /////////////////// end of create //////////////////////////////

  update() {
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

    // go to flour farm
    if (
      this.player.x > 178 &&
      this.player.x < 240 &&
      this.player.y > 244 &&
      this.player.y < 294
    ) {
      console.log("Go to world function");
      this.world();
    }

    // go to honey farm
    if (
      this.player.x > 1610 &&
      this.player.x < 1640 &&
      this.player.y > 345 &&
      this.player.y < 348
    ) {
      console.log("Go to honeyFarm function");
      this.honeyFarm();
    }

    // go to milk farm
    if (
      this.player.x > 1573 &&
      this.player.x < 1650 &&
      this.player.y > 793 &&
      this.player.y < 838
    ) {
      console.log("Go to milkFarm function");
      this.milkFarm();
    }

    // go to egg farm
    if (
      this.player.x > 135 &&
      this.player.x < 168 &&
      this.player.y > 761 &&
      this.player.y < 809
    ) {
      console.log("Go to eggFarm function");
      this.eggFarm();
    }
    //winning screen
    if (
      window.flour == 5 &&
      window.milk == 5 &&
      window.honey == 5 &&
      window.egg == 5 &&
      this.player.x > 865 &&
      this.player.x < 905 &&
      this.player.y > 665 &&
      this.player.y < 676
    ) {
      console.log("Go to winningScreen function");
      this.winningScreen();
    }

    this.dialogText.setVisible(false);

    // Now handle dialog text display
    if (this.popUp1Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Go to Flour Farm!");
      this.dialogText.setVisible(true);
    } else if (this.popUp2Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Go to Egg Farm!");
      this.dialogText.setVisible(true);
    } else if (this.popUp3Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Go to Milk Farm!");
      this.dialogText.setVisible(true);
    } else if (this.popUp4Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Go to Honey Farm!");
      this.dialogText.setVisible(true);
    } else if (this.popUp5Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Follow the paths to each farm!");
      this.dialogText.setVisible(true);
    }

    // Update the text position to be above the player
    if (this.dialogText.visible) {
      this.dialogText.x = this.player.x;
      this.dialogText.y = this.player.y - 40; // 40 pixels above the player
    }
  } /////////////////// end of update //////////////////////////////

  // Function to jump to world which is flour farm
  world(player, tile) {
    console.log("world function");

    let playerPos = {};
    playerPos.x = 1704;
    playerPos.y = 598;
    this.scene.start("world", { playerPos: playerPos });
  }

  // Function to jump to world which is honey farm
  honeyFarm(player, tile) {
    console.log("honeyFarm function");

    let playerPos = {};
    playerPos.x = 160;
    playerPos.y = 437;
    this.scene.start("honeyFarm", { playerPos: playerPos });
  }

  // Function to jump to world which is milk farm
  milkFarm(player, tile) {
    console.log("milkFarm function");

    let playerPos = {};
    playerPos.x = 90;
    playerPos.y = 1017;
    this.scene.start("milkFarm", { playerPos: playerPos });
  }

  // Function to jump to world which is flour farm
  eggFarm(player, tile) {
    console.log("eggFarm function");

    let playerPos = {};
    playerPos.x = 1514;
    playerPos.y = 633;
    this.scene.start("eggFarm", { playerPos: playerPos });
  }

  winningScreen() {
    console.log("winningScreen function");
    this.scene.start("winningScreen");
  }
} //////////// end of class world ////////////////////////
