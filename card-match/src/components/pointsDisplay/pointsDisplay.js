import React from 'react'

const pointsDisplay = ({game, players}) => {
  
  if(game === "Roomy"){
    const oldPlayer = players.find((e) => e.pts <= -100)
    if(oldPlayer) {
      const others = players.filter((p) => p.playerName !== oldPlayer.playerName)
      return (
        <div>
          <div>
            <h2>Ha ganado:</h2>
            <h2>{oldPlayer.playerName}</h2>
            <h3>{oldPlayer.points}</h3>
          </div>
          <div>
            <p>Perdedores:</p>

            {others.map((p) => (
              <div>
                <h3>{p.playerName}</h3>
                <h4>{p.pts}</h4>
              </div>
            ))}
          </div>
        </div>
      )
    }
  } else if(game === "Canasta"){
    const oldPlayer = players.find((e) => e.pts >= 5000)
    if(oldPlayer) {
      const others = players.filter((p) => p.playerName !== oldPlayer.playerName)
      return (
        <div>
          <div>
            <h2>Ha ganado:</h2>
            <h2>{oldPlayer.playerName}</h2>
            <h3>{oldPlayer.pts}</h3>
          </div>
          <div>
            <p>Perdedores:</p>

            {others.map((p) => (
              <div>
                <h3>{p.playerName}</h3>
                <h4>{p.pts}</h4>
              </div>
            ))}
          </div>
        </div>
      )
    }
  } else if(game === "10mil") {
    const oldPlayer = players.find((e) => e.pts >= 10000)
    if(oldPlayer) {
      const others = players.filter((p) => p.playerName !== oldPlayer.playerName)
      return (
        <div>
          <div>
            <h2>Ha ganado:</h2>
            <h2>{oldPlayer.playerName}</h2>
            <h3>{oldPlayer.pts}</h3>
          </div>
          <div>
            <p>Perdedores:</p>
            {others.map((p) => (
              <div>
                <h3>{p.playerName}</h3>
                <h4>{p.pts}</h4>
              </div>
            ))}
          </div>
        </div>
      )
    }
  } 

  const display = players.map((p) => (
    <div>
      <h4>{p.playerName}</h4>
      <h5>Puntos: {p.pts}</h5>
    </div>
  ))
  return (
    <div>{display}</div>
  )
}

export default pointsDisplay