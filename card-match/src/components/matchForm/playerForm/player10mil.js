import React, { useEffect,useState } from 'react'

const Player10mil = ({player, playersGame10, setPlayersGame10, actualMode}) => {
  const [actualPlayer, setActualPlayer] = useState({"pointsGained": 0, "playerName": player.playerName})
  
  useEffect(() => {
      console.log(actualPlayer, "entramos a useefect");
      const playerData = playersGame10.find(p => p.playerName === player.playerName);
      
      if (playerData) {
          setActualPlayer({...playerData});
      }
      
    }, [playersGame10])
    


  const handlePts = (value) => {
    actualPlayer.pointsGained = Number(value)
    setActualPlayer(actualPlayer);
    updatePlayer()

  };
  
  const updatePlayer = () => {
    
    const index = playersGame10.map(function(e) { return e.playerName; }).indexOf(player.playerName);

    let playersRemove = playersGame10
    
    if (index > -1) { 
        playersRemove.splice(index, 1);
    }       
    playersRemove.push(actualPlayer)
    setPlayersGame10(playersRemove)
    return true
  }
  return (
    <div>
        
          <h3 className={`${actualMode}-h3Py`}>{player.playerName}</h3> 
            <p className={`${actualMode}-p`}>Puntos:</p>
            <input className={`${actualMode}-input`} value={actualPlayer.pointsGained  || ''} type='number' placeholder='Puntos obtenidos' onChange={(e) => handlePts(e.target.value)}></input>
        
    </div>
  )
}

export default Player10mil