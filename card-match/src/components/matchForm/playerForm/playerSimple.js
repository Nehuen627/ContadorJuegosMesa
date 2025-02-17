import React, { useEffect ,useState } from 'react'

const PlayerSimple = ({player, playersGameRoomy, setPlayersGameRoomy, actualMode}) => {
  const [actualPlayer, setActualPlayer] = useState({"pointsGained": 0, "corte": false, "playerName": player.playerName})
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
      console.log(actualPlayer, "entramos a useefect");
      const playerData = playersGameRoomy.find(p => p.playerName === player.playerName);
      
      if (playerData) {
          setActualPlayer({...playerData});
      }
      
    }, [playersGameRoomy])
    

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
        
            <h3 className={`${actualMode}-h3Py`}>{player.playerName}</h3>
            <p className={`${actualMode}-p`}>Puntos:</p>
            <input className={`${actualMode}-input`}  value={actualPlayer.pointsGained  || ''} type='number' placeholder='Puntos obtenidos' onChange={(e) => handlePts(e.target.value)}></input>
            <hr className={`${actualMode}-bar bar4`}></hr>
            <p className={`${actualMode}-p`}>Corte:</p>
            <input className={`${actualMode}-inputCheckbox`}  value={actualPlayer.corte }  type='checkbox' checked={isChecked} onChange={handleCorte}></input>
        
    </div>
  )
}

export default PlayerSimple