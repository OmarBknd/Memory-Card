import { useEffect, useState } from "react";

export default function Card() {
  const [pokemonList, setPokemonList] = useState([]);
const [shuffledItems, setShuffledItems] = useState([...pokemonList])
  const [userSelection, setUserSelection] = useState([])
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      const allPokemons = [];
      for (let id = 1; id <= 12; id++) {
        try {
          const data = "https://pokeapi.co/api/v2/pokemon/";
          const response = await fetch(data + id);
  
          const result = await response.json();
          allPokemons.push(result);
          console.log("pokemon", result);
        } catch (error) {
          console.error("Error", error);
        }
      }
      setPokemonList(allPokemons);
    };
    fetchData();
  }, []);
  useEffect(()=>{
    
  })
  useEffect(()=>{
    setShuffledItems([...pokemonList])
  },[pokemonList])
  //Fisher-Yates algorithm
  const shuffleList = ()=>{
    const shuffled =[...shuffledItems]
    for(let i = shuffled.length -1; i> 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
   setShuffledItems(shuffled)
//console.log('shuffled',shuffled);

  }
  
const handleUserSelection = (selection) =>{
     
      if(userSelection.includes(selection)){
        console.log('clicked card', selection);
        setScore(0)
       
        return
      }
   
      setScore((prevScore)=>{
        const newScore = prevScore + 1

        setBestScore((prevBestScore)=> Math.max(prevBestScore, newScore))
        return newScore
      })

      shuffleList()
      setUserSelection(current =>[...current, selection])
      console.log('user selection',userSelection);
      
}

  
  return (
    <div   className="card">
        <div>
          <p>score: {score}</p>
          <p >best score: {bestScore}</p>
          
        </div>
        {shuffledItems.map((pokemon)=>(
          <div  key={pokemon.id}>
            <div onClick={()=>handleUserSelection(pokemon)}>
            {pokemon.name}
            <img  src={pokemon.sprites.front_shiny} alt="" />
            </div>
           

          </div>
        ))}
     
    </div>
  );
}
