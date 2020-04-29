import React from "react";

const LaptopThumbnail = ({ id, image, name, click }) => {
  return (
    <div className='thumbnail'>
      <a href={`/laptop/${id}`} className="thumbnail__image" id={id} >
        <img src={image} alt={name} />
      </a>
      <h2 className='thumbnail-name'>{name}</h2>
    </div>

  );
};

export default LaptopThumbnail;
