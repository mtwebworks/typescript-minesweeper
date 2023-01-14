import { UiSelectors } from "../Types/Interfaces"

/**
 * Common class that keeps selector and allows to gets theirs html elements.
 * @class Ui
 * @example
 * const ui = new Ui();
 */
export class Ui {
  /**
   * @property {UiSelectors} UiSelectors - Object with CSS selectors for various elements on the UI.
   */
  UiSelectors: UiSelectors = {
    board: '[data-board]',
    cell: '[data-cell]',
    counter: '[data-counter]',
    timer: '[data-timer]',
    resetButton: '[data-reset-button]',
    resetIcon: '[data-reset-icon]',
    easyButton: '[data-easy-button]',
    normalButton: '[data-normal-button]',
    expertButton: '[data-expert-button]',
    alert: '[data-alert]',
    alertMessage: '[data-alert-message]',
    alertButton: '[data-alert-button]',
  }

  /**
   * Method for getting single html element.
   * @param {string} selector - String with element slecetor.
   * @returns - Returns html element.
   */
  getElement(selector: string) {
    return document.querySelector(selector)
  }

  /**
   * Method for getting multiple html element as static NodeList.
   * @param {string} selector 
   * @returns - Returns NodeList of html elements.
   */
  getElements(selector: string) {
    return document.querySelectorAll(selector)
  }
}