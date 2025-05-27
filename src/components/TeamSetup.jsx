// src/components/TeamSetup.jsx
import React from "react";

export function TeamSetup({ team, role, setTeam, setRole }) {
  return (
    <div className="team-setup">
      <h2>Choisir une équipe</h2>
      <button onClick={() => setTeam("blue")}>Équipe Bleue</button>
      <button onClick={() => setTeam("red")}>Équipe Rouge</button>

      <h2>Choisir un rôle</h2>
      <button onClick={() => setRole("spymaster")}>Maître espion</button>
      <button onClick={() => setRole("agent")}>Agent</button>

      <p>Équipe sélectionnée : {team}</p>
      <p>Rôle sélectionné : {role}</p>
    </div>
  );
}
