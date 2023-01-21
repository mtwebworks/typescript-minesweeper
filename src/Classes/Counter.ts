// Classes
import { Ui } from "./Ui";

/**
 * Counter class for managing value of mines left.
 * @class Counter
 * @extends Ui
 * @example
 * const counter = new Counter()
 */
export class Counter extends Ui {
  /**
   * @property {number | null} [value = null] - Value of mines.
   */
  value: number | null = null;
  /**
   * @property {HTMLSpanElement | null} [element = null] - DOM element for the counter.
   * @private
   */
  private element: HTMLSpanElement | null = null;

  /**
   * Initializing method that gets DOM's element for counter.
   */
  init() {
    this.element = this.getElement<HTMLSpanElement>(this.UiSelectors.counter);
  }

  /**
   * Method for setting counter value.
   * @param {number | null} [value = 0] - Value of mines to set.
   * @returns - If value is null.
   */
  setValue(value: number | null = 0) {
    if (value === null) return
    this.value = value;
    this.updateValue();
  }

  /**
   * Method for increasing counter value.
   */
  increment() {
    if (this.value !== null) {
      this.value++
    }
    this.updateValue()
  }

  /**
   * Method for decreasing counter value.
   */
  decrement() {
    if (this.value !== null) {
      this.value--
    }
    this.updateValue()
  }

  /**
   * Method for updating value displayed on counter DOM element.
   */
  private updateValue() {
    if (this.element) {
      const valueString = this.value?.toString() as string
      this.element.textContent = valueString.length < 2 ? `0${valueString}` : valueString;
    }
  }

}