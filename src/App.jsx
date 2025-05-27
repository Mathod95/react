// src/App.jsx
import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  doc, onSnapshot, updateDoc, setDoc, arrayUnion
} from "firebase/firestore";

import { Board } from "./components/Board";
import { Chat } from "./components/Chat";
import { TeamSetup } from "./components/TeamSetup";

const WORDS = [ "Ahri", "Yasuo", "Garen", "Lux", "Zed", "Teemo", "Jinx", "Thresh",
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

function generateBoard() {
  const shuffledWords = shuffle(WORDS).slice(0, 25);
  const shuffledColors = shuffle(COLORS);
  return shuffledWords.map((word, i) => ({
    word,
    color: shuffledColors[i],
    revealed: false
  }));
}

const GAME_ID = "partie1"; // clé statique ou dynamique selon besoin

export function App() {
  const [board, setBoard] = useState([]);
  const [chat, setChat] = useState([]);
  const [team, setTeam] = useState("");
  const [role, setRole] = useState("");
  const gameRef = doc(db, "games", GAME_ID);

  useEffect(() => {
    const unsub = onSnapshot(gameRef, (docSnap) => {
      const data = docSnap.data();
      if (data?.board) setBoard(data.board);
      if (data?.chat) setChat(data.chat);
    });
    return () => unsub();
  }, []);

  const revealCard = async (index) => {
    const newBoard = [...board];
    newBoard[index].revealed = true;
    await updateDoc(gameRef, { board: newBoard });
  };

  const sendMessage = async (msg) => {
    await updateDoc(gameRef, {
      chat: arrayUnion(`${team}-${role}: ${msg}`)
    });
  };

  const startNewGame = async () => {
    const newBoard = generateBoard();
    await setDoc(gameRef, {
      board: newBoard,
      chat: []
    });
  };

  return (
    <div className="app">
      <Board board={board} onReveal={revealCard} role={role} />

      <div className="sidebar">
        <TeamSetup team={team} role={role} setTeam={setTeam} setRole={setRole} />

        <div className="teams">
          <h2 className="blue">ÉQUIPE BLEUE</h2>
          <p>{board.filter(c => c.color === "blue" && !c.revealed).length} mots restants</p>
          <h2 className="red">ÉQUIPE ROUGE</h2>
          <p>{board.filter(c => c.color === "red" && !c.revealed).length} mots restants</p>
        </div>

        <Chat chat={chat} sendMessage={sendMessage} />

        <button className="reset" onClick={startNewGame}>
          Nouvelle partie
        </button>
      </div>
    </div>
  );
}
