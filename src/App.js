import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { PokemonThumbnails } from "./components/pokemonThumbnails";
import { PokemonFilter } from "./components/pokemonTypeFilter";

export default function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
      });
    }

    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <>
      <div className="appContainer">
        <h1>Pokemons</h1>
        <PokemonFilter
          allPokemons={allPokemons}
          setAllPokemons={setAllPokemons}
        />
        <div className="allPokemons">
          <div className="pokemonContainer">
            {allPokemons.map((pokemon, index) => (
              <PokemonThumbnails
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.other.dream_world.front_default}
                type={pokemon.types[0].type.name}
                height={pokemon.height}
                weight={pokemon.weight}
                key={index}
              />
            ))}
          </div>
        </div>
        <button onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </>
  );
}
