// Classes
import { Ui } from "./Ui"

// Types
import { iconUrl } from "../types/Enums";

/**
 * Class for game resetting button.
 * @class ResetButton
 * @extends Ui
 * @example
 * const resetButton = new ResetButton()
 */
export class ResetButton extends Ui {
  /**
   * @property {HTMLButtonElement | null} element - DOM element for the button.
   */
  element = this.getElement(this.UiSelectors.resetButton) as HTMLButtonElement | null;
  /**
   * @property {HTMLImageElement | null} icon - DOM element for the icon.
   * @private
   */
  private icon = this.getElement(this.UiSelectors.resetIcon) as HTMLImageElement | null;

  /**
   * Method for temporarily setting button icon.
   * @param {iconUrl} iconType - Icon type based on enum iconUrl.
   */
  setIconOnClick(iconType: iconUrl) {
    this.setIcon(iconType)
    setTimeout(() => {
      this.setIcon(iconUrl.POSITIVE)
    }, 250)
  }

  /**
   * Method for seting button icon
   * @param {iconUrl} iconType - Icon type based on enum iconUrl.
   */
  setIcon(iconType: iconUrl) {
    if (this.icon) {
      this.icon.src = iconType;
    }
  }
}