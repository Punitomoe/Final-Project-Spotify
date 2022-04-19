import React, { useEffect, useState } from 'react';
import './App.css';
import Login from './Login/Login';
import { getTokenFromUrl } from './Spotify/Spotify';
import SpotifyWebApi from 'spotify-web-api-js';
import Player from './Player/Player';
import { useDataLayerValue } from './DataLayer/DataLayer';

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    
    if (_token){
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })

      spotify.setAccessToken(_token);

      spotify.getMe().then(user => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });
    }

    console.log('I Have a Token >>>', token);
  }, []);

  // console.log('user', user);
  // console.log('alien', token);

  return (
    <div className="app"> {token ? <Player spotify={spotify}/> : <Login/>}
    </div>
  );
}

export default App;
