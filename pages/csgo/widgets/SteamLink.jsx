import React from 'react';

const SteamLink = ({ link }) => {
  return (
    
    <center>
        <div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="steam-link">
            <div className="steam-image"></div>
            <div className="overlay">Play CSGO on Steam</div>
        </a>
        </div>
    </center>
   
  );
};

export default SteamLink;
