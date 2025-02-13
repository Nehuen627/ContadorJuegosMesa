import React from 'react'
import './footer.css'

const Footer = ({actualMode}) => {
  return (
    <div className={`footer ${actualMode}-footer`}>
        <p className={`${actualMode}-p`}>Diseñado por: <a href='https://github.com/Nehuen627' className={`${actualMode}-a`}><strong>Nehuen</strong></a></p>
    </div>
  )
}

export default Footer