import React, { useState, useEffect } from "react";
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import { useDataLayerValue } from "../DataLayer/DataLayer";
import Button from '@mui/material/Button';

const axios = require('axios');


function Header ( ) {
    const [{ user }, dispatch ] = useDataLayerValue();
    const [query, set_query] = useState('');
    const [access_token, set_access_token] = useState(null);
    const [tracks, set_tracks] = useState([]);

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

    return (
        <div className="header">

            <div className="header__left">
            <SearchIcon />
            <input
            onChange={(event) => {set_query(event.target.value)}}
            value={query} type="text"
            placeholder="Type anything..."></input>
            <Button onClick={() => {handleClick()}}>Search</Button>
            </div>

            <div className="header__right">
            <Avatar src={user?.images[0]?.url} alt="" />
            <h4>{user?.display_name}</h4>
            </div>

        </div>
    )
}

export default Header;