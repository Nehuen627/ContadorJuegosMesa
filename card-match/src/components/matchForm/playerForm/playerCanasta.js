import React, { useEffect, useState } from 'react'


const PlayerCanasta = ({player, playersGameCanasta ,setPlayersGameCanasta, actualMode}) => {
  const [actualPlayer, setActualPlayer] = useState({"pointsGained": 0, "corte": false, "pura": 0, "impura": 0, "rojos": 0,"playerName": player.playerName})
  const [isChecked, setIsChecked] = useState(false)


  useEffect(() => {
    console.log(actualPlayer, "entramos a useefect");
    const playerData = playersGameCanasta.find(p => p.playerName === player.playerName);
    
    if (playerData) {
        setActualPlayer({...playerData});
    }
    
  }, [playersGameCanasta])
  
  const handlePts = (value) => {
    actualPlayer.pointsGained = Number(value)
    setActualPlayer({...actualPlayer})
    updatePlayer()


  }
  const handleCorte = () => {
    let corte = !isChecked
    setIsChecked(corte)
    
    actualPlayer.corte = corte
    
    setActualPlayer({...actualPlayer});
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
    <div className={`${actualMode}-divPlayerGame divPlayerGame`}>
        
            <h3 className={`${actualMode}-h3Py`}>{player.playerName}</h3>
            <p className={`${actualMode}-p`}>Canasta Pura:</p>
            <input className={`${actualMode}-input`} value={actualPlayer.pura  || ''} type='number' placeholder='Canastas obtenidas' onChange={(e) => handlePura(e.target.value)}></input>
            <hr className={`${actualMode}-bar bar4`}></hr>

            <p className={`${actualMode}-p`}>Canasta Impura:</p>
            <input className={`${actualMode}-input`} value={actualPlayer.impura  || ''} type='number' placeholder='Canastas obtenidas' onChange={(e) => handleImpura(e.target.value)}></input>
            <hr className={`${actualMode}-bar bar4`}></hr>

            <p className={`${actualMode}-p`}>Rojos(1/2/3/4):</p>
            <input className={`${actualMode}-input`} value={actualPlayer.rojos  || ''} type='number' placeholder='Rojos obtenidos' onChange={(e) => handleRojos(e.target.value)}></input>
            <hr className={`${actualMode}-bar bar4`}></hr>

            <p className={`${actualMode}-p`}>Puntos totales:</p>
            <input className={`${actualMode}-input`} value={actualPlayer.pointsGained  || ''} type='number' placeholder='Puntos obtenidos' onChange={(e) => handlePts(e.target.value)}></input>
            <hr className={`${actualMode}-bar bar4`}></hr>

            <p className={`${actualMode}-p`}>Corte:</p>
            <input className={`${actualMode}-inputCheckbox`} value={actualPlayer.corte } type='checkbox' checked={isChecked} onChange={handleCorte}></input>
        
    </div>
  )
}

export default PlayerCanasta