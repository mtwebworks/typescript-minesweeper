// Classes
import { Ui } from "./Ui";

// Types
import { elementsClasses } from "../types/Enums";


/**
 * Class for creating and managing cells.
 * @class Cell
 * @extends Ui
 * @example
 * const cell = new Cell(1,2)
 */
export class Cell extends Ui {
  x: number;
  y: number;
  value: number;
  isMine: boolean;
  isFlaged: boolean;
  isMarked: boolean;
  isReveal: boolean;
  selector: string;
  element: HTMLDivElement | null;

  /**
   * constructor
   * @param {number} x - Cell X coordinate.
   * @param {number} y - Cell Y coordinate.
   * @property {number} x - Cell X coordinate.
   * @property {number} y - Cell Y coordinate.
   * @property {boolean} [value = 0] - Value of cell(amount of mines in surrounding cells).
   * @property {boolean} [isMine = false] - Whether cell is a mine or not.
   * @property {boolean} [isFlaged = false] - Whether cell is flaged or not.
   * @property {boolean} [isMarked = false] - Whether cell is marked or not.
   * @property {boolean} [isReveal = false] - Whether cell is revealed or not.
   * @property {string} [isReveal = `[data-x="${this.x}"][data-y="${this.y}"]`] - Selector for the cell's DOM element.
   * @property {HTMLDivElement | null} [element = null] - DOM element for the cell.
   */
  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.value = 0;
    this.isMine = false;
    this.isFlaged = false;
    this.isMarked = false;
    this.isReveal = false;
    this.selector = `[data-x="${this.x}"][data-y="${this.y}"]`;
    this.element = null;
  }

  /**
   * Method for creating new DOM element for cell.
   * @returns - New DOM element for cell.
   */
  createElement(): HTMLDivElement {
    const cell: HTMLDivElement = document.createElement('div');
    cell.classList.add(elementsClasses.CELL);
    cell.dataset.cell = '';
    cell.dataset.x = `${this.x}`;
    cell.dataset.y = `${this.y}`;
    return cell
  }

  /**
   * Method for toggling cell state on click.
   */
  toogleCellState() {
    if (this.element) {
      if (!this.isFlaged && !this.isMarked) {
        this.isFlaged = true;
        this.element.classList.add(elementsClasses.CELL_FLAG);
        this.element.style.cursor = 'auto'
      } else if (this.isFlaged && !this.isMarked) {
        this.isFlaged = false;
        this.isMarked = true;
        this.element.classList.remove(elementsClasses.CELL_FLAG);
        this.element.classList.add(elementsClasses.CELL_MARK);
      } else {
        this.isMarked = false;
        this.element.classList.remove(elementsClasses.CELL_MARK);
        this.element.style.cursor = ''
      }
    }
  }

  /**
   * Method for reavealing cell on click.
   * @returns - If cell is mine.
   */
  revealCell() {
    this.isReveal = true;
    this.element?.classList.add(elementsClasses.CELL_CLICKED);
    if (this.isMine) {
      this.element?.classList.add(elementsClasses.CELL_MINE);
      return
    }
    if (this.value !== 0) {
      if (this.element) {
        this.element.innerText = (this.value.toString())
        this.element.classList.add(`${elementsClasses.CELL_VALUE}${this.value}`)
      }
    }
  }

  /**
   * Method for adding mine to cell.
   */
  addMine() {
    this.isMine = true;
  }

  /**
   * Method for seting cursor to default.
   */
  toggleCursor() {
    if (this.element) {
      this.element.style.cursor = 'default'
    }
  }
}