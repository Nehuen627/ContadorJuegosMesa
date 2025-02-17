import React from 'react'
import './pointDisplay.css'

const pointsDisplay = ({ game, players, actualMode }) => {
  console.log(players);
  
  const result = (winner, others) => {
    return (
      <div className={`${actualMode}-pointsDiv2 pointsDiv2`}>
        <div className={`${actualMode}-winnerDiv winnerDiv`}>
          <p className={`${actualMode}-p`}>Ha ganado:</p>
          <h2 className={`${actualMode}-h2Winner`}>{winner.playerName}</h2>
          <h3 className={`${actualMode}-h3Winner`}>Pts: {winner.pts}</h3>
        </div>
        <div className={`${actualMode}-loosersDiv loosersDiv`}>
          <p className={`${actualMode}-p`}>Perdedores:</p>
          {others.map((p) => (
            <div className={`${actualMode}-loosersDiv1 loosersDiv1`} key={p.playerName}>
              <h3 className={`${actualMode}-h3Loosers`}>{p.playerName}</h3>
              <h4 className={`${actualMode}-h4Loosers`}>Pts: {p.pts}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  };

  let winner = null;

  if (game === "Roomy") {
    const eligiblePlayers = players.filter((e) => e.pts <= -100);
    if (eligiblePlayers.length > 0) {
      winner = eligiblePlayers.sort((a, b) => a.pts - b.pts)[0]; 
    }
  } else if (game === "Canasta") {
    const eligiblePlayers = players.filter((e) => e.pts >= 5000);
    if (eligiblePlayers.length > 0) {
      winner = eligiblePlayers.sort((a, b) => b.pts - a.pts)[0]; 
    }
  } else if (game === "10mil") {
    const eligiblePlayers = players.filter((e) => e.pts >= 10000);
    if (eligiblePlayers.length > 0) {
      winner = eligiblePlayers.sort((a, b) => b.pts - a.pts)[0];
    }
  }

  if (winner) {
    const others = players.filter((p) => p.playerName !== winner.playerName);
    return result(winner, others);
  }

  const display = players.map((p) => (
    <div className={`${actualMode}-pointsDiv`} key={p.playerName}>
      <h4 className={`${actualMode}-h4`}>{p.playerName}</h4>
      <h5 className={`${actualMode}-h5`}>Puntos: {p.pts}</h5>
    </div>
  ));
  return <div className="pointDisplayContent" key={JSON.stringify(players)}>{display}</div>;
};

export default pointsDisplay;
