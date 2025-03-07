export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  create() {
    // Adiciona o fundo e o torna estático
    this.add.image(0, 0, "bg1").setOrigin(0).setScrollFactor(0).setScale(2);
    this.add.image(0, 0, "bg2").setOrigin(0).setScrollFactor(0).setScale(2);
    this.add.image(0, 0, "bg3").setOrigin(0).setScrollFactor(0).setScale(2);
    this.add.image(0, 0, "bg4").setOrigin(0).setScrollFactor(0).setScale(2);

    // Código para a criação do mapa
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("tileset-tiles", "tiles");

    // Camada que contém os blocos do mapa
    this.baseLayer = this.map.createLayer("base", this.tileset);
    this.baseLayer.setCollisionByProperty({ collides: true });

    // Camada que contém os detalhes do mapa
    this.map.createLayer("decorations", this.tileset);

    // Código para a criação dos diamantes que o jogador interage
    this.diamonds = this.physics.add.staticGroup();
    this.diamondsPositions = this.map.getObjectLayer("diamonds-position");

    // Criação dos diamantes
    this.diamondsPositions.objects.forEach((diamond) => {
      this.diamonds
        .create(diamond.x, diamond.y, "tiles-spritesheet", 67)
        .setOrigin(0)
        .refreshBody();
    });

    // Código para a criação dos blocos que o jogador interage
    this.blocks = this.physics.add.staticGroup();
    this.blocksPositions = this.map.getObjectLayer("blocks-position");

    // Criação dos blocos
    this.blocksPositions.objects.forEach((block) => {
      this.blocks
        .create(block.x, block.y, "tiles-spritesheet", 10)
        .setOrigin(0)
        .refreshBody();
    });

    // Código para a criação do jogador
    this.player = this.physics.add.sprite(50, 300, "characters", 0);

    // Placar
    this.score = 0;
    this.scoreboard = this.add
      .text(430, 245, `Diamantes: 0/7`, {
        font: "20px Impact",
        fill: "#000000",
      })
      .setOrigin(0)
      .setScrollFactor(0);

    // Coloca zoom na câmera e faz ela seguir o jogador
    this.cameras.main.setZoom(3);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Colisões do jogador
    this.physics.add.collider(this.player, this.baseLayer);
    this.physics.add.collider(this.player, this.blocks);

    // Código para o jogador coletar os diamantes
    this.physics.add.overlap(this.player, this.diamonds, (player, diamond) => {
      // Remove o diamante do jogo
      diamond.destroy();

      // Atualiza o placar
      this.score += 1;
      this.scoreboard.setText(`Diamantes: ${this.score}/7`);

      // Após coletar todos os diamantes, o jogador é levado para o menu principal
      if (this.score === 7) {
        this.scene.start("MainMenu");
      }
    });
  }

  update() {
    // Movimentação do jogador
    const cursors = this.input.keyboard.createCursorKeys();

    let directionX = 0;

    if (cursors.left.isDown) {
      directionX -= 1;
      this.player.setFlipX(false);
    }

    if (cursors.right.isDown) {
      directionX += 1;
      this.player.setFlipX(true);
    }

    // Animação do jogador
    if (directionX === 0) {
      this.player.anims.play("idle", true);
    } else {
      this.player.anims.play("walk", true);
    }

    // Pulo do jogador
    if (cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-300);
    }

    // Move o jogador
    this.player.setVelocityX(directionX * 100);

    // Verifica se o jogador caiu no abismo
    if (this.player.y >= 480) {
      this.scene.start("MainMenu");
    }
  }
}
