import React, { useEffect , useState} from 'react'
import Selector from '../selector/selector.js';
import PlayerCanasta from './playerForm/playerCanasta.js';
import PlayerSimple from './playerForm/playerSimple.js';
import Player10mil from './playerForm/player10mil.js';
import PointsDisplay from '../pointsDisplay/pointsDisplay.js';

const MatchForm = () => {
    const [activeTab, setActiveTab] = useState('');
    const [players, setPlayers] = useState([]);
/*     const [playersActiveTab, setPlayersActiveTab] = useState([]) */
    const [players10mil, setPlayers10mil] = useState([])
    const [playersCanasta, setPlayersCanasta] = useState([])
    const [playersRoomy, setPlayersRoomy] = useState([])
    const [ playerName, setPlayerName] = useState('')
  /*   const [points10, setPoints10] = useState({})
    const [pointsRoomy, setPointsRoomy] = useState({})
    const [pointsCanasta, setPointsCanasta] = useState({}) */

    const [playersGame10, setPlayersGame10] = useState([]) 
    const [playersGameRoomy, setPlayersGameRoomy] = useState([]) 
    const [playersGameCanasta, setPlayersGameCanasta] = useState([]) 
    
    /* const [ corteRoomy, setCorteRoomy] = useState('no')
    const [ ptsRoomy, setPtsRoomy] = useState(0)
    const [ ptsRoomyTotal, setPtsRoomyTotal] = useState(0)
    const [ corte10, setCorte10] = useState('no')
    const [ pts10, setPts10] = useState(0)
    const [ pts10Total, setPts10Total] = useState(0)
    const [ corteCanasta, setCorteCanasta] = useState('no')
    const [ puras, setPuras] = useState(0)
    const [ impuras, setImpuras] = useState(0)
    const [ rojos, setRojos] = useState(0)
    const [ ptsCanastaTotal, setPtsCanastaTotal] = useState(0)
    const [ ptsCanasta, setPtsCanasta] = useState(0)
    const [ronda, setRonda] = useState(0) */


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
            console.log(p);
            
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
        setPlayerName(playerName)
        let newPlayer = {
            playerName,
            game: activeTab,
            pts: 0
        }
        let playersLS = JSON.parse(localStorage.getItem("players"))
        playersLS.push(newPlayer)
        setPlayers(playersLS)

        localStorage.setItem("players", JSON.stringify(playersLS))

/* 
        if(newPlayer.game === "Roomy"){
            setPlayersRoomy([...playersRoomy, newPlayer])
        } else if(newPlayer.game === "Canasta") {
            setPlayersCanasta([...playersCanasta, newPlayer])
        } else if (newPlayer.game === "10mil") {
            setPlayers10mil([...players10mil, newPlayer])
        } */
    })
    //delete player
    const handleDelete = async (playerName, game) => {
        const updatedPlayers = players.filter((player) => player.playerName !== playerName);
        setPlayers([...updatedPlayers]);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));
        /* if(game === "Roomy"){
            const updatedPlayersGame = playersGameRoomy.filter((player) => player.playerName !== playerName);
            setPlayersGameRoomy([...updatedPlayersGame])
            setPlayersRoomy([...updatedPlayersGame])
        } else if(game === "Canasta") {
            const updatedPlayersGame = playersGameCanasta.filter((player) => player.playerName !== playerName);
            setPlayersGameCanasta([...updatedPlayersGame])
            setPlayersCanasta([...updatedPlayersGame])
        } else if (game === "10mil") {
            const updatedPlayersGame = playersGame10.filter((player) => player.playerName !== playerName);
            setPlayersGame10([...updatedPlayersGame])
            setPlayers10mil([...updatedPlayersGame])
        } */
        
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
        }

    const calculateCanasta = (e) => {
        e.preventDefault()  
        let playersCalculated = [...players]
        console.log(playersCalculated);
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
    }

    return (
    <div>
        {players.map((p) => (
        <div>
            <h5>{p.playerName}</h5>
            <button onClick={() => handleDelete(p.playerName, p.game)}>Borrar</button>
        </div>
    ))}
        <form onSubmit={addPlayer}>
            <input type='text' value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder='Nombre del jugador'></input>
            <button type='submit'>AGREGAR JUGADOR</button>
        </form>
        <Selector setActiveTab={setActiveTab}/>
        {activeTab === "Roomy" && (
            <div>
                <h2>Roomy</h2>
                <form onSubmit={calculateRoomy}>
                    {roundRoomy}
                    <button type='submit'>CALCULAR</button>
                </form>
            </div>
        )}
        {activeTab === "Canasta" && (
            <div>
                <h2>Canasta</h2>
                <form onSubmit={calculateCanasta}>
                    {roundCanasta}
                    <button type='submit'>CALCULAR</button>
                </form>
            </div>
        )}
        {activeTab === "10mil" && (
            <div>
                <h2>10Mil</h2>
                <form onSubmit={calculate10}>
                    {round10mil}
                    <button type='submit'>CALCULAR</button>
                </form>
            </div>
            
        )}




        <div>
            {activeTab === "Roomy" && (
                <PointsDisplay
                game={activeTab}
                players={playersRoomy}
                />
            )}
            {activeTab === "Canasta" && (
                <PointsDisplay
                game={activeTab}
                players={playersCanasta}
                />
            )}
            {activeTab === "10mil" && (
                <PointsDisplay
                game={activeTab}
                players={players10mil}
                />
            )}
        </div>
    </div>
  )
}

export default MatchForm