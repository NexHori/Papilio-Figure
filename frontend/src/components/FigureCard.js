import React from "react";
import { useNavigate } from "react-router-dom";

const FigureCard = ({ figurine }) => {
  const navigate = useNavigate();

  return (
    <div className="figure-card" onClick={() => navigate(`/figurine/${figurine.id}`)}>
      <img src={`http://127.0.0.1:8000/media/${figurine.image}`} alt={figurine.name} />
      <p className="figure-name">{figurine.name}</p>
      <div className="price-container">
        <span className="price-tag">${figurine.price}</span>
      </div>
    </div>
  );
};

export default FigureCard;