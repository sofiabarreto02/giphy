import React, { useState, useEffect } from 'react';
import './Home.css';

export const Home = () => {
  const [gifs, setGifs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchGifs = async () => {
      const apiKey = '1QqIiyPR3QkNVT1ox5DBvHGucj0rh1TP';
      const url = search
        ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=20`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=10`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setGifs(data.data);
      } catch (error) {
        console.error('Error fetching the gifs:', error);
      }
    };

    fetchGifs();
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className='body'>
      <h1 className='gif'>Gifs</h1>
      <input className='search'
        type="text"
        placeholder="Buscar GIFs"
        value={search}
        onChange={handleSearchChange}
      />
      <div className='div-style'>
        {gifs.map(gif => (
          <div key={gif.id}>
            <img src={gif.images.fixed_height.url} alt={gif.title} />
          </div>
        ))}
      </div>
    </div>
  );
};
