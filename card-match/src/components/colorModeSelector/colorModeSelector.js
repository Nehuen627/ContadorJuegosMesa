import React from 'react'
import './colorModeSelector.css'

const ColorModeSelector = ({setActualMode, actualMode}) => {

    const selectMode = (value) => {
        if(value === 1){
            setActualMode("CM1")
        } else if(value === 2) {
            setActualMode("CM2")
        } else if ( value === 3){
            setActualMode("CM3")
        } 
        
    }
  return (
    <div className={`btnsSelector ${actualMode}-btnsSelector`}>
        <button className='CM1' onClick={(e) => {selectMode(1)}}>ColorMode1</button>
        <button className='CM2' onClick={(e) => {selectMode(2)}}>ColorMode2</button>
        <button className='CM3' onClick={(e) => {selectMode(3)}}>ColorMode3</button>
    </div>
  )
}

export default ColorModeSelector