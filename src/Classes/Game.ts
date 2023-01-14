// Classes
import { Alert } from "./Alert";
import { Cell } from "./Cell";
import { Counter } from "./Counter";
import { ResetButton } from "./ResetButton";
import { Timer } from "./Timer";
import { Ui } from "./Ui";

// Types
import { Buttons, gameConfig } from "../Types/Interfaces";

/**
 * Main class that's manage the game.
 * @class Game
 * @extends Ui
 * @example 
 * const game = new Game();
 */
export class Game extends Ui {

  /**
   * @property {gameConfig} config - Object containing the configurations setting for the game, separated by difficulty level.
   * @private
   */
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
   * @property {Alert} alert - Alert for game.
   * @private
   */
  private alert = new Alert();
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
   * @property {Cell[]} cells - Array of generated cells.
   * @private
   */
  private cells: Cell[] = [];
  /**
   * @property {NodeList} cells - NodeList of cells UI elements.
   * @private
   */
  private cellElements: NodeList | null = null;
  /**
   * @property {HTMLDivElement | null} board - Board UI elements.
   * @private
   */
  private board: HTMLDivElement | null = null;

  /**
   * @property {number} cellsToReveal - Number of cells to reveal.
   * @private
   */
  private cellsToReveal: number = 0;
  /**
   * @property {number} cellsToReveal - Number of revealed cells.
   * @private
   */
  private revealedCells: number = 0;
  /**
   * @property {boolean} isGameFinished - State of game.
   * @private
   */
  private isGameFinished: boolean = false;

  /**
   * @property {Buttons} buttons - Object containing UI button elements.
   * @private
   */
  private buttons: Buttons = {
    alert: null,
    easy: null,
    normal: null,
    expert: null,
    reset: new ResetButton()
  }

  /**
   * Method for game initialization. 
   */
  initializeGame() {
  }
}