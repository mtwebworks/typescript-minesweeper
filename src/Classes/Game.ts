// Classes
import { Ui } from "./Ui";

// Types
import { gameConfig } from "../Types/Interfaces";

/**
 * Main class that's manage the game.
 * @class Game
 * @extends Ui
 * @example 
 * const game = new Game();
 */
export class Game extends Ui {
  private config: gameConfig = {
    easy: {
      rows: 8,
      cols: 8,
      mines: 9
    },
    normal: {
      rows: 16,
      cols: 16,
      mines: 40
    },
    expert: {
      rows: 16,
      cols: 32,
      mines: 99
    },
  }

  /**
 * Method for game initialization. 
 */
  initializeGame() {
  }
}