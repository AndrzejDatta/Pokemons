import React, { useState } from "react";
import "./pokemonThumbnails.css";
import { PokemonDetails } from "./pokemonDetails";

export const PokemonThumbnails = ({
  id,
  name,
  image,
  type,
  height,
  weight,
}) => {
  const style = `thumbnailContainer ${type}`;
  const pokeID = `${id}`;
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = (id) => {
    document.getElementById(`${id}`).classList.toggle("clicked");
    document
      .getElementById(`${id}`)
      .querySelector(".extendedDetails")
      .classList.toggle("visable");

    showDetails ? setShowDetails(false) : setShowDetails(true);
  };

  return (
    <div className={style} id={pokeID} onClick={() => handleClick(id)}>
      <div className="detailWrapper">
        <h3>{name}</h3>
        <p className="type">{type}</p>
      </div>
      <div className="extendedDetails">
        {showDetails ? (
          <PokemonDetails height={height} weight={weight} />
        ) : null}
      </div>
      <img src={image} alt="" />
    </div>
  );
};
