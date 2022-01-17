type TColor = 'blue' | 'red' | 'green';

type TDices = Record<TColor, TDicesOfColor>;

type TDicesOfColor = {
  count: number,
  values: Array<number>,
  selected: Array<number>,
  rerolled: Array<number>
};

type TTokens = Record<TColor, number>;