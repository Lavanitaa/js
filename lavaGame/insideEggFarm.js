class insideEggFarm extends Phaser.Scene {
  constructor() {
    super({
      key: "insideEggFarm",
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
    this.load.tilemapTiledJSON("insideEggFarm", "assets/insideEggFarm.tmj");

    this.load.image(
      "treeImg",
      "assets/vectoraith_tileset_farmingsims_details_spring_32x32.png"
    );
    this.load.image(
      "signImg",
      "assets/vectoraith_tileset_farmingsims_buildings_32x32.png"
    );

    this.load.image("natureImg", "assets/nature_32x32.png");
    this.load.spritesheet("charaImg", "assets/charater.png", {
      frameWidth: 32,
      frameHeight: 34,
    });

    this.load.spritesheet("eggImg", "assets/items.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("pickleImg", "assets/items.png", {
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
    console.log("*** insideEggFarm scene");
    // launch inventory UI and tell it we're in flour farm
this.scene.launch("showInventory", { farm: "egg" });

    let key7Down = this.input.keyboard.addKey(55);

    key7Down.on(
      "down",
      function () {
        console.log("7 pressed (insideEggFarm)");
        this.scene.start("insideEggFarm");
      },
      this
    );

    // Create the map from main
    let map = this.make.tilemap({
      key: "insideEggFarm",
    });

    // Load the game tiles

    let treeTiles = map.addTilesetImage(
      "vectoraith_tileset_farmingsims_details_spring_32x32",
      "treeImg"
    );
    let natureTiles = map.addTilesetImage("nature_32x32", "natureImg");

    let signTiles = map.addTilesetImage(
      "vectoraith_tileset_farmingsims_buildings_32x32",
      "signImg"
    );

    let tilesArray = [treeTiles, natureTiles, signTiles];

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
    var end = map.findObject("objectLayer", (obj) => obj.name === "end");

    this.player = this.physics.add
      .sprite(start.x, start.y, "charaImg")
      .setScale(1.5)
      .play("down");
    this.cursors = this.input.keyboard.createCursorKeys();
    window.player = this.player;

    //egg object
    this.anims.create({
      key: "slowegg",
      frames: this.anims.generateFrameNumbers("eggImg", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    //enemy object pickle
    this.anims.create({
      key: "fastpickle",
      frames: this.anims.generateFrameNumbers("pickleImg", {
        start: 20,
        end: 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    //collect items - flour
    let egg1 = map.findObject("objectLayer", (obj) => obj.name === "egg1");
    this.egg1 = this.physics.add
      .sprite(egg1.x, egg1.y, "eggImg")
      .play("slowegg");

    let egg2 = map.findObject("objectLayer", (obj) => obj.name === "egg2");
    this.egg2 = this.physics.add
      .sprite(egg2.x, egg2.y, "eggImg")
      .play("slowegg");

    let egg3 = map.findObject("objectLayer", (obj) => obj.name === "egg3");
    this.egg3 = this.physics.add
      .sprite(egg3.x, egg3.y, "eggImg")
      .play("slowegg");

    let egg4 = map.findObject("objectLayer", (obj) => obj.name === "egg4");
    this.egg4 = this.physics.add
      .sprite(egg4.x, egg4.y, "eggImg")
      .play("slowegg");

    let egg5 = map.findObject("objectLayer", (obj) => obj.name === "egg5");
    this.egg5 = this.physics.add
      .sprite(egg5.x, egg5.y, "eggImg")
      .play("slowegg");

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
      .sprite(enemy1.x, enemy1.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy2 = this.physics.add
      .sprite(enemy2.x, enemy2.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy3 = this.physics.add
      .sprite(enemy3.x, enemy3.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy4 = this.physics.add
      .sprite(enemy4.x, enemy4.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy5 = this.physics.add
      .sprite(enemy5.x, enemy5.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy6 = this.physics.add
      .sprite(enemy6.x, enemy6.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy7 = this.physics.add
      .sprite(enemy7.x, enemy7.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.enemy8 = this.physics.add
      .sprite(enemy8.x, enemy8.y, "pickleImg")
      .setScale(1.5)
      .play("fastpickle");
    this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    // Prevent black area of edge of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //collect flour item
    this.physics.add.overlap(
      this.player,
      [this.egg1, this.egg2, this.egg3, this.egg4, this.egg5],
      this.hitEgg,
      null,
      this
    );

    //enemy chili
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
      this.hitPickle,
      null,
      this
    );

    //player collider

    this.physics.add.collider(this.player, this.fenceLayer);
  } /////////////////// end of create //////////////////////////////

  update() {
    //enemy flying towards the player
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

    //after player collect all 5 egg they exit to outside from the farm
    if (
      this.player.x > 1693 &&
      this.player.x < 1750 &&
      this.player.y > 574 &&
      this.player.y < 614 &&
      window.egg > 0
    ) {
      console.log("Go to eggFarm function");
      this.eggFarm();
    }
  } /////////////////// end of update //////////////////////////////

 hitEgg(player, egg) {
    console.log("Player collected egg");

    // Remove egg from the scene
    egg.destroy();

    window.egg++;

    // Send correct event to update egg UI
    this.scene
      .get("showInventory")
      .events.emit("inventory", { egg: window.egg });
}


  hitPickle(player, enemy) {
    console.log("Player get hit by chili");

    // shake screen
    this.cameras.main.shake(300);

    // disable enemy body
    enemy.disableBody(true, true);

    // reset egg count
    window.egg = 0;

    this.scene.start("gameOver", { farm: 4 });

    // Add to inventory
  }

  // Function to jump to egg farm
  eggFarm(player, tile) {
    console.log("eggFarm function");

    //after exit inside the egg farm player start from here
    let playerPos = {};
    playerPos.x = 810;
    playerPos.y = 786;
    this.scene.start("eggFarm", { playerPos: playerPos });
  }
} //////////// end of class world ////////////////////////
