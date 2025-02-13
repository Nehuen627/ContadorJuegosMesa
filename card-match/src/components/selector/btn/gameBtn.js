import React from 'react'
import './gameBtn.css'

const GameBtn = ({title, id, setActiveTab, actualMode}) => {
    const selectGame = (() => {
        console.log(`juego seleccionado: ${title}`);

        localStorage.setItem("game", title)
        setActiveTab(title)
    })
  return (
    <button className={`btnGame ${actualMode}-btnGame`} id={id} onClick={selectGame}>{title}</button>
  )
}

export default GameBtn