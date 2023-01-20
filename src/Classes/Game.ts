// Classes
import { Alert } from "./Alert";
import { Cell } from "./Cell";
import { Counter } from "./Counter";
import { ResetButton } from "./ResetButton";
import { Timer } from "./Timer";
import { Ui } from "./Ui";

// Types
import { Buttons, gameConfig } from "../types/Interfaces";
import { alerMessages, iconUrl } from "../types/Enums";

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
    this.handleElements();
    this.counter.init();
    this.timer.init();
    this.addEventListeners();
    this.newGame();
  }

  /**
   * Method for starting new game.
   * @private
   * @param {number} rows - Number of board rows.
   * @param {number} cols - Number of board cols.
   * @param {number} mines - Number of board mines. 
   */
  private newGame(
    rows: number | null = this.config.easy.rows,
    cols: number | null = this.config.easy.cols,
    mines: number | null = this.config.easy.mines) {

    this.numberOfRows = rows;
    this.numberOfCols = cols;
    this.numberOfMines = mines;

    if (this.numberOfRows && this.numberOfCols && this.numberOfMines) {
      this.cellsToReveal = this.numberOfRows * this.numberOfCols - this.numberOfMines
    }

    if (this.cells.length !== 0) {
      this.removeCellsEventListeners()
      this.cells = [];
      this.cellElements = null;
    }
    this.counter.setValue(this.numberOfMines);
    this.timer.resetTimer();

    this.generateCells();
    this.placeMines();
    this.generateBoard();

    this.cellElements = this.getElements(this.UiSelectors.cell)
    this.buttons.reset.setIcon(iconUrl.POSITIVE)

    this.isGameFinished = false;
    this.revealedCells = 0;

    this.addCellsEventListeners();
  }

  /**
   * Method for game ending.
   * @private
   * @param {boolean} isWin - Value represents whether game is won or lost.
   */
  private endGame(isWin: boolean) {
    this.isGameFinished = true;
    this.timer.stopTimer();
    this.revealMines();

    if (!isWin) {
      this.buttons.reset.setIcon(iconUrl.NEGATIVE)
      this.alert.setText(alerMessages.LOST);
      this.alert.toggleAlert();
      this.removeCellsEventListeners;
      this.cells.forEach(cell => cell.toggleCursor())
      return
    }

    let message: string
    if (this.timer.numberOfSeconds < this.timer.maxNumberOfSeconds) {
      message = `${alerMessages.WIN_IN_TIME} ${this.timer.numberOfSeconds}&nbsp;${alerMessages.SECONDS}`
    } else {
      message = alerMessages.WIN
    }
    this.alert.setText(message);
    this.alert.toggleAlert();

    this.removeCellsEventListeners;
    this.cells.forEach(cell => cell.toggleCursor())
  }

  /**
   * Method for adding event listeners to UI elements.
   * @private
   */
  private addEventListeners() {
    this.buttons.alert?.addEventListener('click', () => this.alert.toggleAlert());
    this.buttons.easy?.addEventListener('click', () => this.newGame(this.config.easy.rows, this.config.easy.cols, this.config.easy.mines))
    this.buttons.normal?.addEventListener('click', () => this.newGame(this.config.normal.rows, this.config.normal.cols, this.config.normal.mines));
    this.buttons.expert?.addEventListener('click', () => this.newGame(this.config.expert.rows, this.config.expert.cols, this.config.expert.mines));
    this.buttons.reset.element?.addEventListener('click', () => this.handleNewGameClick());
  }

  /**
   * Method for adding event listeners to generated cell elements.
   * @private
   */
  private addCellsEventListeners() {
    if (this.cellElements) {
      this.cellElements.forEach(element => {
        element.addEventListener('click', this.handleCellClick)
        element.addEventListener('contextmenu', this.handleCellContextMenu)
      })
    }
  }

  /**
   * Method for removing event listeners from cell elements.
   * @private
   */
  private removeCellsEventListeners() {
    if (this.cellElements) {
      this.cellElements.forEach(element => {
        element.removeEventListener('click', this.handleCellClick)
        element.removeEventListener('contextmenu', this.handleCellContextMenu)
      })
    }
  }

  /**
   * Method for getting UI elements.
   * @private
   */
  private handleElements() {
    this.board = this.getElement(this.UiSelectors.board) as HTMLDivElement;
    this.buttons.alert = this.getElement(this.UiSelectors.alert) as HTMLButtonElement;
    this.buttons.easy = this.getElement(this.UiSelectors.easyButton) as HTMLButtonElement;
    this.buttons.normal = this.getElement(this.UiSelectors.normalButton) as HTMLButtonElement;
    this.buttons.expert = this.getElement(this.UiSelectors.expertButton) as HTMLButtonElement;
  }

  /**
   * Method for handling reset button click.
   * @private
   */
  private handleNewGameClick(
    rows: number | null = this.numberOfRows,
    cols: number | null = this.numberOfCols,
    mines: number | null = this.numberOfMines) {
    this.removeCellsEventListeners();
    this.newGame(rows, cols, mines)
  }

  /**
   * Method for handling cell click.
   * @private
   */
  private handleCellClick = (e: Event) => {
    const clickedElement: HTMLDivElement = e.target as HTMLDivElement;
    const currentCell = this.cells.find(cell => cell.x === Number(clickedElement.dataset.x) && cell.y === Number(clickedElement.dataset.y)) as Cell;

    if (!currentCell.isReveal) {
      this.cellClick(currentCell);
    }
  }

  /**
   * Method for handling cell context menu.
   * @private
   */
  private handleCellContextMenu = (e: Event) => {
    e.preventDefault();
    const clickedElement: HTMLDivElement = e.target as HTMLDivElement;
    const currentCell: Cell | undefined = this.cells.find(cell => cell.x === Number(clickedElement.dataset.x) && cell.y === Number(clickedElement.dataset.y));

    if (currentCell?.isReveal || this.isGameFinished) return;

    if (!currentCell?.isFlaged && !currentCell?.isMarked) {
      if (this.counter.value) {
        this.counter.decrement()
        currentCell?.toogleCellState();
      }
    } else if (currentCell?.isFlaged && !currentCell?.isMarked) {
      currentCell?.toogleCellState();
    } else {
      this.counter.increment()
      currentCell?.toogleCellState();
    }
  }

  /**
   * Method for manage actions after handling cell click.
   * @private
   */
  private cellClick(cell: Cell) {
    if (this.isGameFinished || cell.isFlaged || cell.isMarked) return;
    this.buttons.reset.setIconOnClick(iconUrl.SUPRISED);
    if (cell.isMine) this.endGame(false);

    this.setCellValue(cell);
    if (this.revealedCells === this.cellsToReveal && !this.isGameFinished) {
      this.endGame(true)
    }
  }

  /**
   * Method for reveal all mines on the board.
   * @private
   */
  private revealMines() {
    this.cells.filter(cell => cell.isMine).forEach(cell => cell.revealCell())
  }

  /**
   * Method for generating board cells.
   * @private
   */
  private generateCells() {
    if (this.numberOfRows && this.numberOfCols) {
      for (let y = 1; y <= this.numberOfRows; y++) {
        for (let x = 1; x <= this.numberOfCols; x++)
          this.cells.push(new Cell(x, y))
      }
    }
  }

  /**
   * Method for setting cell value based on isMine value of surrounding cells and calling next surrounding cells.
   * @private
   */
  private setCellValue(cell: Cell) {
    let minesCount: number = 0;
    if (this.numberOfRows && this.numberOfCols) {

      for (let rowIndex = Math.max(cell.y - 1, 0); rowIndex <= Math.min(cell.y + 1, this.numberOfRows); rowIndex++) {
        for (let colIndex = Math.max(cell.x - 1, 0); colIndex <= Math.min(cell.x + 1, this.numberOfCols); colIndex++) {
          const currentCell = this.cells.find(cell => cell.x === colIndex && cell.y === rowIndex) as Cell | null;
          if (currentCell != null && currentCell.isMine) minesCount++
        }
      }
    }
    cell.value = minesCount;
    cell.revealCell();
    this.revealedCells++;

    if (!cell.value) {
      if (this.numberOfRows && this.numberOfCols) {
        for (let rowIndex = Math.max(cell.y - 1, 0); rowIndex <= Math.min(cell.y + 1, this.numberOfRows); rowIndex++) {
          if (this.numberOfRows && this.numberOfCols) {
            for (let colIndex = Math.max(cell.x - 1, 0); colIndex <= Math.min(cell.x + 1, this.numberOfCols); colIndex++) {
              const currentCell = this.cells.find(cell => cell.x === colIndex && cell.y === rowIndex) as Cell | null;
              if (currentCell) {
                if (!currentCell.isReveal) {
                  this.cellClick(currentCell)
                }
              }
            }
          }
        }
      }
    }
  }

  /**
   * Method for board generation.
   * @private
   */
  private generateBoard() {
    while (this.board?.firstChild) {
      this.board?.firstChild.remove();
    }
    if (this.board) {
      this.board.style.gridTemplateColumns = `repeat(${this.numberOfCols}, 1fr)`;
      this.board.style.gridTemplateRows = `repeat(${this.numberOfRows}, 1fr)`;
    }
    this.cells.forEach(cell => {
      this.board?.append(cell.createElement())
      cell.element = this.getElement(cell.selector) as HTMLDivElement;
    })
  }

  /**
   * Method for placing mines on the board.
   * @private
   */
  private placeMines() {
    if (this.numberOfMines) {
      let minesToplace: number = this.numberOfMines

      while (minesToplace) {
        let randomIndex: number = Math.floor(this.getRandomNumber() * (this.cells.length - 1));

        if (!this.cells[randomIndex].isMine) {
          this.cells[randomIndex].addMine();
          minesToplace--
        }
      }
    }
  }

  /**
   * Method for generating random number.
   * @private
   */
  private getRandomNumber() {
    return Math.random();
  }
}