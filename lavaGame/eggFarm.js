class eggFarm extends Phaser.Scene {
  constructor() {
    super({
      key: "eggFarm",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
    this.playerPos = data.playerPos;
     this.playGateSound = data.playGateSound || false;
  }
  preload() {
    //this is the exported JSON map file
    this.load.tilemapTiledJSON("eggFarm", "assets/eggFarm.tmj");

      this.load.audio("gateOpenClose", "assets/gate.mp3");

    this.load.audio("walkingOnWood", "assets/walkingWood.mp3");

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

    this.load.spritesheet("eggFarmerImg", "assets/eggFarmer.png", {
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
    console.log("*** eggFarm scene");
    this.scene.stop("showInventory");

       
    if (this.playGateSound) {
        this.gateSound = this.sound.add("gateOpenClose", { volume: 2 });
        this.gateSound.play();
        this.playGateSound = false; // prevent replaying
    }


    if (!this.walkingSoundPlayed) {
        this.woodSound = this.sound.add("walkingOnWood", { loop: false, volume: 2 });
        this.woodSound.play();
        this.walkingSoundPlayed = true; // mark as played
    }

    let key2Down = this.input.keyboard.addKey(50);

    key2Down.on(
      "down",
      function () {
        console.log("2 pressed (eggFarm)");
        this.scene.start("eggFarm");
      },
      this
    );

    // Create the map from main
    let map = this.make.tilemap({
      key: "eggFarm",
    });

    // Load the game tiles
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
    this.tree2Layer = map.createLayer("tree2Layer", tilesArray, 0, 0);
    this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);
    this.treeLayer = map.createLayer("treeLayer", tilesArray, 0, 0);
    this.tree3Layer = map.createLayer("tree3Layer", tilesArray, 0, 0);

    this.waterLayer.setCollisionByExclusion(-1, true);
    this.water2Layer.setCollisionByExclusion(-1, true);
    this.itemLayer.setCollisionByExclusion(-1, true);
    this.treeLayer.setCollisionByExclusion(-1, true);
    this.tree2Layer.setCollisionByExclusion(-1, true);
    this.tree3Layer.setCollisionByExclusion(-1, true);

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

    this.player = this.physics.add
      .sprite(this.playerPos.x, this.playerPos.y, "charaImg")
      .setScale(1.5)
      .play("down");
    this.cursors = this.input.keyboard.createCursorKeys();
    window.player = this.player;

    //egg farmer npc
    this.anims.create({
      key: "farmer4",
      frames: this.anims.generateFrameNumbers("eggFarmerImg", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // egg farmer npc
    let eggFarmer = map.findObject(
      "objectLayer",
      (obj) => obj.name === "eggFarmer"
    );

    this.eggFarmer = this.physics.add
      .sprite(eggFarmer.x, eggFarmer.y, "eggFarmerImg")
      .setScale(2)
      .play("farmer4");

    this.eggFarmer.setImmovable(true);
    this.eggFarmer.body.setSize(20, 20);
    this.eggFarmer.body.setOffset(6, 12);

    // create a front interaction zone (invisible)
    this.eggFarmerFront = new Phaser.Geom.Rectangle(
      this.eggFarmer.x - 40, // left width
      this.eggFarmer.y + 20, // BELOW farmer
      80, // width
      60 // height
    );

    //sign board
    this.SIGN1 = map.findObject("objectLayer", (obj) => obj.name === "sign1");
    this.SIGN2 = map.findObject("objectLayer", (obj) => obj.name === "sign2");
    this.SIGN3 = map.findObject("objectLayer", (obj) => obj.name === "sign3");
    this.EGGFARMER = map.findObject(
      "objectLayer",
      (obj) => obj.name === "eggFarmer"
    );

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

    //player collider

    this.physics.add.collider(this.player, this.waterLayer);
    this.physics.add.collider(this.player, this.itemLayer);
    this.physics.add.collider(this.player, this.treeLayer);
    this.physics.add.collider(this.player, this.tree2Layer);
    this.physics.add.collider(this.player, this.tree3Layer);
    this.physics.add.collider(this.player, this.eggFarmer);
  } /////////////////// end of create //////////////////////////////

  update() {
    // go to home
    if (
      this.player.x > 1571 &&
      this.player.x < 1584 &&
      this.player.y > 761 &&
      this.player.y < 785
    ) {
      console.log("Go to home function");
      this.home();
    }

    // go to "inside egg farm"
    if (
      this.player.x > 685 &&
      this.player.x < 770 &&
      this.player.y > 761 &&
      this.player.y < 806
    ) {
      console.log("Go to insideEggFarm function");
      this.insideEggFarm();
    }

    //sign board
    this.dialogText.setVisible(false);

    if (this.popUp1Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Entered from home");
      this.dialogText.setVisible(true);
    } else if (this.popUp2Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Exit to home");
      this.dialogText.setVisible(true);
    } else if (this.popUp3Area.contains(this.player.x, this.player.y + 20)) {
      this.dialogText.setText("Enter to collect the Eggs");
      this.dialogText.setVisible(true);
    } else if (
      Phaser.Geom.Rectangle.Contains(
        this.eggFarmerFront,
        this.player.x,
        this.player.y
      )
    ) {
      this.dialogText.setText("Collect all 5 Eggs! Avoid the Pickles!!");
      this.dialogText.setVisible(true);
    }

    // Update the text position to be above the player
    if (this.dialogText.visible) {
      this.dialogText.x = this.player.x;
      this.dialogText.y = this.player.y - 40; // 40 pixels above the player
    }

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
  } /////////////////// end of update //////////////////////////////

  // Function to jump to home
  home(player, tile) {
    console.log("home function");
    this.walkingSoundPlayed = false;

    //after exit flour farm, player start from here
    let playerPos = {};
    playerPos.x = 189;
    playerPos.y = 793;
    this.scene.start("home", { playerPos: playerPos });
  }



   insideEggFarm(player, tile) {
    console.log("insideEggFarm function");
    this.scene.start("insideEggFarm", {
      player: player,
      inventory: this.inventory,
      playGateSound: true, //
    });
  }
} //////////// end of class world ////////////////////////
