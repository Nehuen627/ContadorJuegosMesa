import React, { useEffect, useState } from 'react'


const PlayerCanasta = ({player, playersGameCanasta ,setPlayersGameCanasta}) => {
  const [actualPlayer, setActualPlayer] = useState({"pointsGained": 0, "corte": false, "pura": 0, "impura": 0, "rojos": 0,"playerName": player.playerName})
  const [isChecked, setIsChecked] = useState(false)


  /* useEffect(() => {
    console.log(actualPlayer);
    
  }, [actualPlayer]) */
  
  const handlePts = (value) => {
    actualPlayer.pointsGained = Number(value)
    setActualPlayer({...actualPlayer})
    updatePlayer()


  }
  const handleCorte = () => {
    let corte = !isChecked
    setIsChecked(corte)
    
    actualPlayer.corte = corte
    
    setActualPlayer(actualPlayer);
    updatePlayer()
  }
  const handlePura = (value) => {
    actualPlayer.pura = Number(value)
    setActualPlayer({...actualPlayer})
    updatePlayer()

  }
  const handleImpura = (value) => {
    actualPlayer.impura = Number(value)
    setActualPlayer({...actualPlayer})
    updatePlayer()

  }
  const handleRojos = (value) => {
    actualPlayer.rojos = Number(value)
    setActualPlayer({...actualPlayer})
    updatePlayer()

  }
  const updatePlayer = () => {
    
    const index = playersGameCanasta.map(function(e) { return e.playerName; }).indexOf(player.playerName);

    let playersRemove = playersGameCanasta
    
    if (index > -1) { 
        playersRemove.splice(index, 1);
    }       

    playersRemove.push(actualPlayer)
    setPlayersGameCanasta(playersRemove)
    return true
  }
  return (
    <div>
        
            <h3>{player.playerName}</h3>
            <h4>Canasta Pura:</h4>
            <input type='number' placeholder='Canastas obtenidas' onChange={(e) => handlePura(e.target.value)}></input>
            <h4>Canasta Impura:</h4>
            <input type='number' placeholder='Canastas obtenidas' onChange={(e) => handleImpura(e.target.value)}></input>
            <h4>Rojos(1/2/3/4):</h4>
            <input type='number' placeholder='Rojos obtenidos' onChange={(e) => handleRojos(e.target.value)}></input>
            <h4>Puntos totales:</h4>
            <input type='number' placeholder='Puntos obtenidos' onChange={(e) => handlePts(e.target.value)}></input>
            <h4>Corte:</h4>
            <input type='checkbox' checked={isChecked} onChange={handleCorte}></input>
        
    </div>
  )
}

export default PlayerCanasta