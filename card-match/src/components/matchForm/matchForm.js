import React, { useEffect , useState} from 'react'
import Selector from '../selector/selector.js';
import PlayerCanasta from './playerForm/playerCanasta.js';
import PlayerSimple from './playerForm/playerSimple.js';
import Player10mil from './playerForm/player10mil.js';
import PointsDisplay from '../pointsDisplay/pointsDisplay.js';
import './matchForm.css'

const MatchForm = ({actualMode}) => {
    const [activeTab, setActiveTab] = useState('');
    const [players, setPlayers] = useState([]);
    const [players10mil, setPlayers10mil] = useState([])
    const [playersCanasta, setPlayersCanasta] = useState([])
    const [playersRoomy, setPlayersRoomy] = useState([])
    const [ playerName, setPlayerName] = useState('')
    const [playersGame10, setPlayersGame10] = useState([]) 
    const [playersGameRoomy, setPlayersGameRoomy] = useState([]) 
    const [playersGameCanasta, setPlayersGameCanasta] = useState([]) 


    useEffect(() => {        
        try {
            const playersLS = JSON.parse(localStorage.getItem("players"))
            setPlayers(playersLS)
            
            if(!playersLS){
                    let playersBase = []
                localStorage.setItem("players", JSON.stringify(playersBase))
            }
            const result = localStorage.getItem("game")
            if (!result) {
                setActiveTab("Roomy")
                localStorage.setItem("game", "Roomy")
            } else {
                setActiveTab(result)
            }
        } catch (error) {
            console.log(error);
            
        }
    }, [])
   useEffect(() => {
    if (players.length > 0) {
        separatePlayers();
    }
   }, [players])
    const separatePlayers = (() => {
        let roomy = []
        let canasta = []
        let mil = []
        players.forEach((p) => {
            if(p.game === "Roomy"){
                roomy.push(p)
            } else if(p.game === "Canasta") {
                canasta.push(p)
            } else if (p.game === "10mil") {
                mil.push(p)
            }
            setPlayersRoomy(roomy)
            setPlayersCanasta(canasta)
            setPlayers10mil(mil)


        })
        return true
    })
    //add player
    const addPlayer = ((event) => {
        event.preventDefault();
        let newPlayer = {
            playerName,
            game: activeTab,
            pts: 0
        }
        let playersLS = JSON.parse(localStorage.getItem("players"))
        playersLS.push(newPlayer)
        setPlayers(playersLS)

        localStorage.setItem("players", JSON.stringify(playersLS))
        setPlayerName('')
    })

    //delete player
    const handleDelete = async (playerName, game) => {
        const updatedPlayers = players.filter((player) => player.playerName !== playerName);
        setPlayers([...updatedPlayers]);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
        if(game === "Roomy"){
            const updatedPlayersGame = playersGameRoomy.filter((player) => player.playerName !== playerName);
            setPlayersGameRoomy([...updatedPlayersGame])
        } else if(game === "Canasta") {
            const updatedPlayersGame = playersGameCanasta.filter((player) => player.playerName !== playerName);
            setPlayersGameCanasta([...updatedPlayersGame])
        } else if (game === "10mil") {
            const updatedPlayersGame = playersGame10.filter((player) => player.playerName !== playerName);
            setPlayersGame10([...updatedPlayersGame])
        }
        
    };



    let round10mil = (<h></h>)
    let roundRoomy = (<h></h>)
    let roundCanasta = (<h></h>)

    //map form players
    if(players ){
        if(activeTab === "Roomy" ){
            const playersFiltered = players.filter(e => e.game === "Roomy" )
            roundRoomy = playersFiltered.map((p) => (
                <PlayerSimple
                    key={p.playerName}
                    player={p}
                    playersGameRoomy={playersGameRoomy}
                    setPlayersGameRoomy={setPlayersGameRoomy}
                    actualMode={actualMode}
                />
            ))
        } else if (activeTab === "10mil" ) {
            const playersFiltered = players.filter(e => e.game === "10mil" )

            round10mil = playersFiltered.map((p) => (
                <Player10mil
                    key={p.playerName}
                    player={p}
                    playersGame10={playersGame10}
                    setPlayersGame10={setPlayersGame10}
                    actualMode={actualMode}
                />
            ))
        } else if ( activeTab === "Canasta" ){
            const playersFiltered = players.filter(e => e.game === "Canasta" )

            roundCanasta = playersFiltered.map((p) => (
                <PlayerCanasta
                    key={p.playerName}
                    player={p}
                    playersGameCanasta={playersGameCanasta}
                    setPlayersGameCanasta={setPlayersGameCanasta}
                    actualMode={actualMode}
                />
            ))
        }
    
    }


    
    // calculate process
    const calculate10 = (e) => {
        e.preventDefault()  


        let playersCalculated = [...players]
    
        playersGame10.forEach((p)=> {
            const playersCalculated1 = playersCalculated.filter((player) => player.playerName !== p.playerName)
            playersCalculated = playersCalculated1
            const oldPlayer = players.find((e) => e.playerName === p.playerName)
            

            let points = oldPlayer.pts
            //base
            points += p.pointsGained

            let ply = {
                playerName: p.playerName,
                game: activeTab,
                pts: points
            }
            playersCalculated.push(ply)
            setPlayers10mil([...players10mil, ply])

        })


        setPlayers(playersCalculated)
        localStorage.setItem("players", JSON.stringify(playersCalculated))
        
        const resetPlayersGame10 = playersGame10.map(p => ({
            playerName: p.playerName,
            pointsGained: 0
        }));
        
        setPlayersGame10(resetPlayersGame10);
    }

        
        const calculateRoomy = (e) => {
            e.preventDefault()  
            
            let playersCalculated = [...players]

            
            playersGameRoomy.forEach((p)=> {
                
                const playersCalculated1 = playersCalculated.filter((player) => player.playerName !== p.playerName)
                playersCalculated = playersCalculated1
                const oldPlayer = players.find((e) => e.playerName === p.playerName)
                

                let points = oldPlayer.pts
                console.log(points);
                
                //base
                console.log(points, p.pointsGained);

                points += p.pointsGained
                console.log(points);

                //corte
                if(p.corte){
                    points -= 10
                }
                console.log(points);
                
                let ply = {
                    playerName: p.playerName,
                    game: activeTab,
                    pts: points
                }
                playersCalculated.push(ply)
                setPlayersRoomy([...playersRoomy, ply])
            })
            

            setPlayers(playersCalculated)
            localStorage.setItem("players", JSON.stringify(playersCalculated))

            const resetPlayersGameRoomy = playersGameRoomy.map(p => ({
                playerName: p.playerName,
                pointsGained: 0
            }));
            
            setPlayersGameRoomy(resetPlayersGameRoomy);
        }

    const calculateCanasta = (e) => {
        e.preventDefault()  

        let playersCalculated = [...players]
        
        playersGameCanasta.forEach((p)=> {

            const playersCalculated1 = playersCalculated.filter((player) => player.playerName !== p.playerName)
            playersCalculated = playersCalculated1
            
            
            const oldPlayer = players.find((e) => e.playerName === p.playerName)
            

            let points = oldPlayer.pts
            
            //pras
            points += p.pura * 500
            
            //impuras
            points += p.impura * 300

            //Rojos
            if(p.rojos < 4){
                points += p.rojos * 100
            } else if(p.rojos === 4){
                points += 800
            }

            //corte
            if(p.corte){
                points += 100
            }

            //totales
            points += p.pointsGained


            let ply = {
                playerName: p.playerName,
                game: activeTab,
                pts: points
            }
            playersCalculated.push(ply)
            setPlayersCanasta([...playersCanasta, ply])
            
        })
        
        setPlayers(playersCalculated)
        localStorage.setItem("players", JSON.stringify(playersCalculated))


        const resetPlayersGameCanasta = playersGameCanasta.map(p => ({
            playerName: p.playerName,
            pointsGained: 0,
            corte: false,
            pura: 0,
            impura: 0,
            rojos: 0
        }));
        
        setPlayersGameCanasta(resetPlayersGameCanasta);
    }

    return (
    <div className='matchFormContent'>
        <hr className={`${actualMode}-bar bar3`}></hr>
        <Selector setActiveTab={setActiveTab} actualMode={actualMode}/>
        <div className={`formDiv ${actualMode}-formDiv`}>
            <form onSubmit={addPlayer}>
                <input className={`${actualMode}-inputAdd`} type='text' value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder='Nombre del jugador'></input>
                <button className={`${actualMode}-btnAdd`} type='submit'>AGREGAR</button>
            </form>
        </div>
        <hr className={`${actualMode}-bar bar3`}></hr>
        <div className='divPlayers'>
            <h5 className={`${actualMode}-h5`}>Jugadores:</h5>

            {players.map((p) => (
                <div className={`${actualMode}-divPlayers`}>
                    <h5 className={`${actualMode}-h5Py`}>{p.playerName}</h5>
                    <button className={`${actualMode}-btnDelete`} onClick={() => handleDelete(p.playerName, p.game)}>Borrar</button>
                </div>
            ))}
        </div>
        <hr className={`${actualMode}-bar bar2`}></hr>
        {activeTab === "Roomy" && (
            <div className={`divGame ${actualMode}-divGame`}>
                <h2 className={`${actualMode}-h2`}>Roomy</h2>
                <form onSubmit={calculateRoomy} className={`gameForm ${actualMode}-gameForm`}>
                    <div className='gameDiv'>{roundRoomy}</div>
                    <button className={`${actualMode}-btnCalculate`} type='submit'>CALCULAR</button>
                </form>
            </div>
        )}
        {activeTab === "Canasta" && (
            <div className={`divGame ${actualMode}-divGame`}>
                <h2 className={`${actualMode}-h2`}>Canasta</h2>
                <form onSubmit={calculateCanasta} className={`gameForm ${actualMode}-gameForm`}>
                    <div className='gameDiv'>{roundCanasta}</div>
                    <button className={`${actualMode}-btnCalculate`} type='submit'>CALCULAR</button>
                </form>
            </div>
        )}
        {activeTab === "10mil" && (
            <div className={`divGame ${actualMode}-divGame`}>
                <h2 className={`${actualMode}-h2`}>10Mil</h2>
                <form onSubmit={calculate10} className={`gameForm ${actualMode}-gameForm`}>
                    <div className='gameDiv'>{round10mil}</div>
                    <button className={`${actualMode}-btnCalculate`} type='submit'>CALCULAR</button>
                </form>
            </div>
            
        )}



        <hr className={`${actualMode}-bar bar`}></hr>
        <div className={`${actualMode}-pointDisplay pointDisplay`}>
            <h2 className={`${actualMode}-h2`}>Puntuación</h2>
            {activeTab === "Roomy" && (
                <PointsDisplay
                game={activeTab}
                players={playersRoomy}
                actualMode={actualMode}
                />
            )}
            {activeTab === "Canasta" && (
                <PointsDisplay
                game={activeTab}
                players={playersCanasta}
                actualMode={actualMode}
                />
            )}
            {activeTab === "10mil" && (
                <PointsDisplay
                game={activeTab}
                players={players10mil}
                actualMode={actualMode}
                />
            )}
        </div>
    </div>
  )
}

export default MatchForm