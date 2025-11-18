class insideHome extends Phaser.Scene {
  constructor() {
    super({
      key: "insideHome",
    });

    // Put global variable here
  }

  // incoming data from scene below
  init(data) {
    this.player = data.player;
    this.inventory = data.inventory;
  }
  preload() {
    //this is the exported JSON map file
    this.load.tilemapTiledJSON("insideHome", "assets/insideHome.tmj");

    this.load.image("interiorImg", "assets/InteriorTilesLITE.png");
    this.load.spritesheet("charaImg", "assets/charater.png", {
      frameWidth: 32,
      frameHeight: 34,
    });
  }

  create() {
    console.log("*** insideHome scene");

    //this.input.once('pointerdown', function(){
    let key1Down = this.input.keyboard.addKey(54);

    key1Down.on(
      "down",
      function () {
        console.log("6 pressed (insideHome)");
        this.scene.start("insideHome");
      },
      this
    );

    // Create the map from main
    let map = this.make.tilemap({
      key: "insideHome",
    });

   
    let insideHome = map.addTilesetImage("InteriorTilesLITE", "interiorImg");

    let tilesArray = [insideHome];

    //Load in layers by layers

    this.groundLayer = map.createLayer("groundLayer", tilesArray, 0, 0);
    this.item3Layer = map.createLayer("item3Layer", tilesArray, 0, 0);
    this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);
    this.item2Layer = map.createLayer("item2Layer", tilesArray, 0, 0);
    this.item4Layer = map.createLayer("item4Layer", tilesArray, 0, 0);
    this.item5Layer = map.createLayer("item5Layer", tilesArray, 0, 0);
    this.sideWallLayerLayer = map.createLayer(
      "sideWallLayer",
      tilesArray,
      0,
      0
    );

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

    // Add any text to the game
    this.add.text(10, 10, "Add any text here", {
      font: "30px Courier",
      fill: "#00FFFF",
    });

    // Add main player here with physics.add.sprite

    // Add time event / movement here

    // get the tileIndex number in json, +1
    //mapLayer.setTileIndexCallback(11, this.room1, this);

    // Add custom properties in Tiled called "mouintain" as bool

    // What will collider witg what layers
    //this.physics.add.collider(mapLayer, this.player);

    // create the arrow keys
    //this.cursors = this.input.keyboard.createCursorKeys();

    // camera follow player
    this.cameras.main.startFollow(this.player);

    // Prevent black area of edge of the map
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
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
  } /////////////////// end of update //////////////////////////////

  // Function to jump to room1
  room1(player, tile) {
    console.log("room1 function");
    this.scene.start("room1", {
      player: player,
      inventory: this.inventory,
    });
  }
} //////////// end of class world ////////////////////////
