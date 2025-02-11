import React, { useEffect, useState } from 'react'

const PlayerSimple = ({player, playersGameRoomy, setPlayersGameRoomy}) => {
  const [actualPlayer, setActualPlayer] = useState({"pointsGained": 0, "corte": false, "playerName": player.playerName})
  const [isChecked, setIsChecked] = useState(false)


  const handlePts = (value) => {
    actualPlayer.pointsGained = Number(value)
    setActualPlayer(actualPlayer);
    updatePlayer()

  }
  
  const handleCorte = () => {
    let corte = !isChecked
    setIsChecked(corte)
    
    actualPlayer.corte = corte
    
    setActualPlayer(actualPlayer);
    updatePlayer()
  }
  const updatePlayer = () => {
    const index = playersGameRoomy.map(function(e) { return e.playerName; }).indexOf(player.playerName);

    let playersRemove = playersGameRoomy
    
    if (index > -1) { 
        playersRemove.splice(index, 1);
    }       
    playersRemove.push(actualPlayer)
    setPlayersGameRoomy(playersRemove)
    return true
  }
  return (
    <div>
        
            <h3>{player.playerName}</h3>
            <h4>Puntos:</h4>
            <input type='number' placeholder='Puntos obtenidos' onChange={(e) => handlePts(e.target.value)}></input>
            <h4>Corte:</h4>
            <input type='checkbox' checked={isChecked} onChange={handleCorte}></input>
        
    </div>
  )
}

export default PlayerSimple