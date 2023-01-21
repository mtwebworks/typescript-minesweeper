import { Ui } from "./Ui";
import { elementsClasses } from "../types/Enums";

/**
 * Alert class for displaying end game \
 * @class Alert
 * @extends Ui
 * @example
 * const alert = new Alert()
 */
export class Alert extends Ui {
  /**
   * @property {HTMLDivElement} element - Alert element on UI.
   */
  element = this.getElement<HTMLDivElement>(this.UiSelectors.alert);
  /**
   * @property {HTMLDivElement} element - Alerts button element on UI.
   */
  button = this.getElement<HTMLButtonElement>(this.UiSelectors.alertButton);
  /**
   * @property {HTMLDivElement} element - Alerts message element on UI.
   */
  messageElement = this.getElement<HTMLButtonElement>(this.UiSelectors.alertMessage);

  /**
   * Method for toggling visibility of alert element on UI.
   */
  toggleAlert = () => {
    if (this.element) {
      this.element.classList.toggle(elementsClasses.ALERT_HIDDEN)
    }
  }

  /**
   * Method for seting value of message.
   */
  setText(textContent: string) {
    if (this.messageElement !== null) {
      this.messageElement.innerHTML = textContent;
    }
  }
}


