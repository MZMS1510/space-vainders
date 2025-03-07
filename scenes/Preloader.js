export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    this.load.setPath("assets");

    // Carrega a imagem que contém as imagens dos personagens do jogo
    this.load.spritesheet(
      "characters",
      "Tilemap/tilemap-characters_packed.png",
      {
        frameWidth: 24,
        frameHeight: 24,
      }
    );

    // Carrega a imagem que contém os tiles do jogo como spritesheet
    this.load.spritesheet("tiles-spritesheet", "Tilemap/tilemap_packed.png", {
      frameWidth: 18,
      frameHeight: 18,
    });

    // Carregamento do mapa
    this.load.image("tiles", "Tilemap/tilemap_packed.png");
    this.load.tilemapTiledJSON("map", "Tiled/mapa-1.json");

    // Carrega o fundo do jogo
    this.load.image("bg1", "Clouds/1.png");
    this.load.image("bg2", "Clouds/2.png");
    this.load.image("bg3", "Clouds/3.png");
    this.load.image("bg4", "Clouds/4.png");
  }

  create() {
    this.anims.create({
      key: "idle",
      frames: [{ key: "characters", frame: 0 }],
      frameRate: 10,
    });

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("characters", {
        start: 0,
        end: 1,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.scene.start("MainMenu");
  }
}
