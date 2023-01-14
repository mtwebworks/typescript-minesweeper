// Classes
import { Counter } from "./Counter";
import { Timer } from "./Timer";
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
   * @property {Counter} counter - Mines counter for game.
   * @private
   */
  private counter = new Counter();
  /**
   * @property {Timer} timer - Game duration timer.
   * @private
   */
  private timer: Timer = new Timer();

  /**
   * @property {number} numberOfRows - Numbers of rows on the board.
   * @private
   */
  private numberOfRows: number | null = null;
  /**
   * @property {number} numberOfCols - Numbers of columns on the board.
   * @private
   */
  private numberOfCols: number | null = null;
  /**
   * @property {number} numberOfMines - Numbers of mines on the board.
   * @private
   */
  private numberOfMines: number | null = null;



  /**
 * Method for game initialization. 
 */
  initializeGame() {
  }
}