import React from 'react'
import GameBtn from './btn/gameBtn.js'
import './scss/selector.css'

const Selector = ({ setActiveTab, actualMode}) => {
    const games = [{title: "Roomy" , id: 1}, {title: "Canasta" , id: 2},{title: "10mil" , id: 3}]
    
    const gameSelector = games.map((g) => (
        <GameBtn
            key={g.id}
            title={g.title}
            id={g.id}
            setActiveTab={setActiveTab}
            actualMode={actualMode}
        />
        
    ))
  return (
    <div className={`${actualMode}-selector selector`}>
        <h5 className={`${actualMode}-h5`}>Seleciona el juego:</h5>
        {gameSelector}
    </div>
  )
}

export default Selector