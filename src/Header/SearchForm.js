import React, { useState, useEffect } from 'react';
import Track from './Track';
import Form from './Header';


const axios = require('axios');

function SearchForm() {

  const [access_token, set_access_token] = useState(null);
  const [query, set_query] = useState('');
  const [tracks, set_tracks] = useState([]);
  
  function handleClick() {
    try {
      axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          q: `${query}`,
          type: "track",
        },
      })
      .then((res) => {
        set_tracks(res.data.tracks.items);
      })
    } catch (err) {
      console.error(err);
    } finally {
      console.log(tracks);
    }
  }


  function getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  useEffect(() => {
    let params = getHashParams()
    let token = params.access_token;
    set_access_token(token);
  });

  return (
    <div>

      {(access_token) && (
        <Form handleClick={handleClick}/>
      )}
      
      <div>
        {tracks.map((item) => {
          return (
            <Track
              key={item.album.id}
              image_url={item.album.images[0].url}
              track_title={item.name}
              artist_name={item.album.artists[0].name}
              album_name={item.album.name}
            />
          );
        })}
      </div>

    </div>
  );
}

export default SearchForm;