import { Ui } from "./Ui";

/**
 * Timer class for counting duration of game.
 * @class Timer
 * @extends Ui
 * @example 
 * const timer = new Timer()
 */
export class Timer extends Ui {
  /**
   * @property {HTMLSpanElement | null} [element = null] - DOM element for the timer.
   * @private
   */
  private element: HTMLSpanElement | null = null;
  /**
   * @property {NodeJS.Timer | null} [interval = null] - Interval of timer.
   * @private
   */
  private interval: NodeJS.Timer | null = null;
  /**
   * @property {HTMLSpanElement | null} [_numberOfSeconds = null] - Current value of the timer.
   *  @private
   */
  private _numberOfSeconds: number = 0;
  /**
   *  @property {HTMLSpanElement | null} [_maxNumberOfSeconds = null] - Max value of the timer.
   *  @private
   */
  private _maxNumberOfSeconds: number = 999;

  // Getters 
  get numberOfSeconds() {
    return this._numberOfSeconds
  }

  get maxNumberOfSeconds() {
    return this._maxNumberOfSeconds
  }

  /**
   * Initializing method that gets DOM's element for timer.
   */
  init() {
    this.element = this.getElement(this.UiSelectors.timer) as HTMLSpanElement
  }

  /**
   * Method for starting the timer.
   */
  startTimer() {
    this.interval = setInterval(() => this.updateTimer(), 1000
    )
  }

  /**
   * Method for stoping the timer.
   */
  stopTimer() {
    clearInterval(Number(this.interval))
  }

  /**
   * Method for reset the timer.
   */
  resetTimer() {
    this._numberOfSeconds = 0;
    this.setTimerValue(this._numberOfSeconds);
    this.stopTimer();
    this.startTimer();
  }

  /**
   * Method for updating timer value.
   */
  updateTimer() {
    this._numberOfSeconds++;
    this._numberOfSeconds <= this._maxNumberOfSeconds ? this.setTimerValue(this._numberOfSeconds) : this.stopTimer()
  }

  /**
   * Method for updating displayed value on timer DOM element.
   * @param {number} value - Timers vlaue.
   * @private
   */
  private setTimerValue(value: number) {
    if (this.element) {
      this.element.textContent = this.formatSecondsValue(value);
    }
  }

  /**
   * Method for formating the number value of timer.
   * @param {number} value - Unformated timer value.
   * @returns - Formated timer value.
   * @private
   */
  private formatSecondsValue(value: number) {
    if (value.toString().length === 1) {
      return `00${value}`
    } else if (value.toString().length === 2) {
      return `0${value}`
    } else {
      return `${value}`
    }
  }
}