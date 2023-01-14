export interface UiSelectors {
  board: string;
  cell: string;
  counter: string;
  timer: string;
  resetButton: string;
  resetIcon: string;
  easyButton: string;
  normalButton: string;
  expertButton: string;
  alert: string;
  alertMessage: string;
  alertButton: string;
}

export interface Buttons {
  alert: HTMLButtonElement | null;
  easy: HTMLButtonElement | null;
  normal: HTMLButtonElement | null;
  expert: HTMLButtonElement | null;
  reset: HTMLButtonElement | null;
}

interface boardCofig {
  rows: number;
  cols: number;
  mines: number
}

export interface gameConfig {
  easy: boardCofig;
  normal: boardCofig;
  expert: boardCofig;
}