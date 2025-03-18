import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FigureDetail = () => {
  const { id } = useParams();
  const [figure, setFigure] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchFigure = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/figurines/${id}/`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setFigure(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      }
    };

    fetchFigure();
    return () => controller.abort();
  }, [id]);

  if (error) return <p>Error loading figure details: {error}</p>;
  if (!figure) return <p>Loading figure details...</p>;

  return (
    <div className="container">
      <div className="figure-details">
        <div className="figure-image">
          <img
            src={`http://127.0.0.1:8000${figure.image}`}
            alt={figure.name}
          />
        </div>
        <div className="figure-info">
          <p className="figured-name">{figure.name}</p>
          <p className="series"><strong>Series: </strong>{figure.series}</p>
          <p className="manufacturer"><strong>Manufacturer: </strong>{figure.manufacturer}</p>
          <p className="release-date"><strong>Release Date: </strong>{figure.release_date}</p>
          <p className="price">${figure.price}</p>
          <p className="description">{figure.description}</p>
          <div className="buttons">
            <button className="btn btn-collection">Add to Collection</button>
            <button className="btn btn-wishlist">Add to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigureDetail;
