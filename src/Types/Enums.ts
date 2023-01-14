export enum elementsClasses {
  CELL = 'board__cell',
  CELL_MINE = 'board__cell--mine',
  CELL_FLAG = 'board__cell--flag',
  CELL_MARK = 'board__cell--mark',
  CELL_CLICKED = 'board__cell--clicked',
  CELL_VALUE = 'board__cell--',
  ALERT_HIDDEN = 'alert--hidden'
}

export enum iconUrl {
  NEGATIVE = './assets/negative.svg',
  POSITIVE = './assets/positive.svg',
  SUPRISED = './assets/suprised.svg',
}

export enum alerMessages {
  LOST = 'You lost, try again!',
  WIN_IN_TIME = 'Congratulations! You won in:',
  WIN = 'Congratulations! You won!',
  SECONDS = 'seconds.'
}