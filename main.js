import Preloader from "./scenes/Preloader.js";
import MainMenu from "./scenes/MainMenu.js";
import Game from "./scenes/Game.js";

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: "#000000", // Define a cor de fundo do jogo como preto
  parent: "app", // Define o elemento pai do jogo
  scene: [Preloader, MainMenu, Game], // Carrega as cenas do jogo
  physics: {
    // Adiciona o sistema de física
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  pixelArt: true, // Desativa o anti-aliasing
  scale: {
    mode: Phaser.Scale.FIT, // Ajusta o jogo para caber na tela
    autoCenter: Phaser.Scale.CENTER_BOTH, // Centraliza o jogo horizontal e verticalmente
  },
};

const game = new Phaser.Game(config);
