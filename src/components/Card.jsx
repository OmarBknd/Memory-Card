import { useEffect, useState } from "react";
import Difficulty from "./Difficulty";

export default function Card() {
  const [pokemonList, setPokemonList] = useState([]);
  const [shuffledItems, setShuffledItems] = useState([...pokemonList]);
  const [userSelection, setUserSelection] = useState([]);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(15);
  const [cardsLeft, setCardsLeft] = useState(total);

  const [difficulty, setDifficulty] = useState("easy");
  


  function handleDifficulty(e) {
    const { name } = e.target;

    if (name === "easy") {
      setDifficulty("easy");
      setTotal(15);
    } else if (name === "medium") {
      setDifficulty("medium");
      setTotal(25);
    } else if (name === "hard") {
      setDifficulty("hard");
      setTotal(50);
    }

    

    console.log("difficulty: ", difficulty);
  }

  useEffect(() => {
    const fetchData = async () => {
      const allPokemons = [];
      for (let id = 1; id <= total; id++) {
        console.log("total", total);

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
    if (total > pokemonList.length) {
      fetchData();
    }
  }, [total, pokemonList.length, difficulty]);

  useEffect(() => {
    setShuffledItems([...pokemonList]);
  
  }, [pokemonList]);

 
  
  //Fisher-Yates algorithm
  const shuffleList = () => {
    const shuffled = [...pokemonList];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setShuffledItems(shuffled);

    //console.log('shuffled',shuffled);
  };
 function handleWin(){
  if(cardsLeft == 0){
    alert('You win!')
  }
 }

 

  const handleUserSelection = (selection) => {
    

  
    if (userSelection.includes(selection)) {
      console.log("clicked card", selection);
      setScore(0);
      setUserSelection([]); // empty array after selection
      setCardsLeft(total)
      alert('You lose !')
      return;
    }

    setScore((current) => {
      const newScore = current + 1;
      
     return newScore;
    });
    setCardsLeft((current)=>{
      const maxScore = current - 1
      handleWin()
      return maxScore
    })
    
   
    setUserSelection((current) => [...current, selection]);
    console.log("user selection", userSelection);
    
    
    shuffleList()
  
   
  };

  return (
    <div>
      <Difficulty mode={handleDifficulty} />
      <div>
        <p>Score: {score}</p>
        <p>Cards left: {cardsLeft}</p>
      </div>
      <div className={`cards-container`}>
        {shuffledItems.map((pokemon) => (
          <div key={pokemon.id}>
            <div className="card" onClick={() => handleUserSelection(pokemon)}>
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt=""
              />
              <p> {pokemon.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}