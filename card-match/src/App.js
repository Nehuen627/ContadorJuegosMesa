import {  useEffect, useState } from 'react';
import './styles/app.css';
import MatchForm from './components/matchForm/matchForm.js';
import ColorModeSelector from './components/colorModeSelector/colorModeSelector.js';
import Footer from './components/footer/footer.js';

function App() {
  const [actualMode, setActualMode] = useState("")
  
  useEffect(() => {
    const mode = localStorage.getItem("actualMode")
    
    if(!mode) {
      setActualMode("CM1")
    } else {
      setActualMode(mode)
    }
  }, [])

  useEffect(() => {
    if(actualMode) {
      updateActualModeLS()
    } 
  }, [actualMode])
  const updateActualModeLS = () => {
    localStorage.setItem("actualMode", actualMode)
  }
  return (
    <div className={`App ${actualMode}-App`}>
      <header className="App-header">
        <ColorModeSelector
        setActualMode={setActualMode}
        actualMode={actualMode}
        />
        <h1 className={`${actualMode}-h1`}>Contador de puntos</h1>
        <MatchForm
        actualMode={actualMode}
        />

      </header>
      <footer>
        <Footer actualMode={actualMode}/>
      </footer>
    </div>
  );
}

export default App;
