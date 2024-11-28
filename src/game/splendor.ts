import { Game } from 'boardgame.io';

export const TicTacToe: Game = {
  setup: () => ({
    cells: Array(9).fill(null),
  }),

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] === null) {
        G.cells[id] = ctx.currentPlayer;
      }
    },
  },

  turn: {
    moveLimit: 1,
  },

  endIf: ({ G, ctx }) => {
    // 승리 조건을 체크 (예: 세 줄이 같으면 승리)
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        G.cells[a] &&
        G.cells[a] === G.cells[b] &&
        G.cells[a] === G.cells[c]
      ) {
        return { winner: ctx.currentPlayer };
      }
    }
  },
};
