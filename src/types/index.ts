export type DevelopmentCardLevel = 1 | 2 | 3;

export type CardValue = 'blue' | 'black' | 'white' | 'red' | 'green';

export type TokenColors = CardValue | 'yellow';

export type Cost = {
  [key in CardValue]?: number;
};

export type Condition = {
  [key in CardValue]?: number;
};

export interface DevelopmentCard {
  level: DevelopmentCardLevel;
  id: string;
  value: CardValue;
  valueAmount: number;
  victoryPoint: number;
  cost: Cost;
  set: 'original';
}

export interface NobleTile {
  id: string;
  victoryPoint: number;
  condition: Condition;
}

export type Tokens = {
  [key in TokenColors]: number;
};