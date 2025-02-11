import React from 'react'

const GameBtn = ({title, id, setActiveTab}) => {
    const selectGame = (() => {
        console.log(`juego seleccionado: ${title}`);

        localStorage.setItem("game", title)
        setActiveTab(title)
    })
  return (
    <button id={id} onClick={selectGame}>{title}</button>
  )
}

export default GameBtn