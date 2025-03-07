export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    // Adiciona as imagens de fundo
    this.add.image(0, 0, "bg1").setOrigin(0).setScrollFactor(0).setScale(2.3);
    this.add.image(0, 0, "bg2").setOrigin(0).setScrollFactor(0).setScale(2.3);
    this.add.image(0, 0, "bg3").setOrigin(0).setScrollFactor(0).setScale(2.3);
    this.add.image(0, 0, "bg4").setOrigin(0).setScrollFactor(0).setScale(2.3);

    // Adiciona o texto do título
    this.add
      .text(640, 360, "Space Vainders", {
        font: "120px Impact",
        fill: "#000000",
      })
      .setOrigin(0.5);

    // Adiciona o texto de instruções
    this.add
      .text(640, 500, "Press SPACE to start", {
        font: "20px Impact",
        fill: "#000000",
      })
      .setOrigin(0.5);

    this.add
      .text(
        1000,
        100,
        "Use as setas laterais para se mover e a de cima para pular",
        {
          font: "20px Impact",
          fill: "#000000",
        }
      )
      .setOrigin(0.5);

    // Adiciona um evento de tecla para iniciar o jogo
    this.input.keyboard.addKey("SPACE").on("down", () => {
      this.scene.start("Game");
    });
  }
}
