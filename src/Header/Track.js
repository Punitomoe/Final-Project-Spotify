function Track(props) {
    return (
      <div>
        <img src={props.image_url} title={props.album_name} alt="{props.album_name}"/>
        <p>{props.track_title}</p>
        <div>
          <p>{props.artist_name}</p>
        </div>
      </div>
    );
  }

  export default Track;