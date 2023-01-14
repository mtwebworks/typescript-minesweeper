import { Ui } from "./Ui";
import { elementsClasses } from "../Types/Enums";

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
  element = this.getElement(this.UiSelectors.alert) as HTMLDivElement;
  /**
   * @property {HTMLDivElement} element - Alerts button element on UI.
   */
  button = this.getElement(this.UiSelectors.alertButton) as HTMLButtonElement;
  /**
   * @property {HTMLDivElement} element - Alerts message element on UI.
   */
  messageElement = this.getElement(this.UiSelectors.alertMessage) as HTMLTitleElement | null;

  /**
   * Method for toggling visibility of alert element on UI.
   */
  toggleAlert = () => {
    this.element.classList.toggle(elementsClasses.ALERT_HIDDEN)
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


