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