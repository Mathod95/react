// src/components/Board.jsx
import React from "react";

export function Board({ board, onReveal, role }) {
  return (
    <div className="board">
      {board.map((card, i) => (
        <div
          key={i}
          className={`card ${card.revealed || role === "spymaster" ? card.color : ""}`}
          onClick={() => {
            if (role !== "spymaster") onReveal(i);
          }}
        >
          {card.word}
        </div>
      ))}
    </div>
  );
}
