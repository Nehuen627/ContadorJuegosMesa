import React from 'react'
import GameBtn from './btn/gameBtn.js'

const Selector = ({ setActiveTab}) => {
    const games = [{title: "Roomy" , id: 1}, {title: "Canasta" , id: 2},{title: "10mil" , id: 3}]
    
    const gameSelector = games.map((g) => (
        <GameBtn
            key={g.id}
            title={g.title}
            id={g.id}
            setActiveTab={setActiveTab}
        />
        
    ))
  return (
    <div className='selector'>
        Seleciona el juego
        {gameSelector}
    </div>
  )
}

export default Selector