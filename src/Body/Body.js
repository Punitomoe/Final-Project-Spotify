import React from "react";
import "./Body.css";
import Header from "../Header/Header";
import { useDataLayerValue } from "../DataLayer/DataLayer";
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SongRow from "../SongRow/SongRow";

function Body({ spotify }){
    const [{ discover_weekly }, dispatch] = useDataLayerValue();
    return (
        <div className="body">
            <Header spotify={spotify}/>
                <div className="body__info">
                    <img 
                    src={discover_weekly?.images[0]} 
                    alt="" 
                    />
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>Discover Weekly</h2>
                    <p>{discover_weekly?.description}</p>
                </div>
                </div>
            <div className="body__songs">
            <div className="body__icons">
                <PlayCircleFilledIcon className="body__shuffle" />
                <FavoriteIcon fontSize="large" />
                <MoreHorizIcon />
            </div>
            </div>
            {/* List of songs */}
            {discover_weekly?.track.items.map(item => {
                <SongRow track={item.track} />
            })}
        </div>
    );
}

export default Body;