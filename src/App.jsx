import React, { useState } from "react";

const WORDS = [
  "Ahri", "Yasuo", "Garen", "Lux", "Zed", "Teemo", "Jinx", "Thresh",
  "Freljord", "Piltover", "Zaun", "Noxus", "Demacia", "Ionia", "Shurima",
  "Lame d'infini", "Égide solaire", "Bâton du vide", "Saut éclair", "Embrasement",
  "Téléportation", "Baron Nashor", "Dragon", "Faille", "Hérald"
];

const COLORS = [
  ...Array(8).fill("red"),
  ...Array(7).fill("blue"),
  ...Array(9).fill("neutral"),
  "assassin"
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

export function App() {
  const [board, setBoard] = useState(generateBoard());
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  function generateBoard() {
    const shuffledWords = shuffle(WORDS).slice(0, 25);
    const shuffledColors = shuffle(COLORS);
    return shuffledWords.map((word, i) => ({
      word,
      color: shuffledColors[i],
      revealed: false
    }));
  }

  function revealCard(index) {
    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[index].revealed = true;
      return newBoard;
    });
  }

  function handleSendMessage() {
    if (message.trim()) {
      setChat((prev) => [...prev, message]);
      setMessage("");
    }
  }

  return (
    <div className="app">
      <div className="board">
        {board.map((card, i) => (
          <div
            key={i}
            className={`card ${card.revealed ? card.color : ""}`}
            onClick={() => revealCard(i)}
          >
            {card.word}
          </div>
        ))}
      </div>

      <div className="sidebar">
        <div className="teams">
          <h2 className="blue">ÉQUIPE BLEUE</h2>
          <p>{board.filter(c => c.color === "blue" && !c.revealed).length} mots restants</p>
          <h2 className="red">ÉQUIPE ROUGE</h2>
          <p>{board.filter(c => c.color === "red" && !c.revealed).length} mots restants</p>
        </div>

        <div className="chat">
          <h3>💬 Chat</h3>
          <div className="chat-box">
            {chat.map((msg, i) => (
              <div key={i} className="chat-msg">{msg}</div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message..."
            />
            <button onClick={handleSendMessage}>Envoyer</button>
          </div>
        </div>

        <button className="reset" onClick={() => setBoard(generateBoard())}>
          Nouvelle partie
        </button>
      </div>
    </div>
  );
}
