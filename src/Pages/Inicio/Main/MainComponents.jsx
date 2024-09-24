import React from 'react';
import Card from '../../../Cards/Card';
import './MainComponents.css';

export default function MainComponents({ title, cards }) {
  return (
    <>
      <h2 className="subtitulo-prenda">{title}</h2>
      <hr />
      <div className="productos">
        {
          cards.map((card) => (
            card.section === title || title === "Promo"? (
              <Card key={card.id} product={card} />
            ) : null
          ))
        }
      </div>
    </>
  );
}
