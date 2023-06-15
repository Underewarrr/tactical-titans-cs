import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CSGOUpdates = () => {
  const [csgoNews, setCSGONews] = useState([]);

  useEffect(() => {
    const fetchCSGONews = async () => {
      try {
        const response = await axios.get('/api/cs/get-updates');
        setCSGONews(response.data);
      } catch (error) {
        console.error('Error fetching CSGO news:', error);
      }
    };

    fetchCSGONews();
  }, []);

  const getCategory = (contents) => {
    if (contents.includes('Mirage Fixed') || contents.includes('full of uncensored information')) {
      return 'MAPS';
    } else if (contents.includes('Buy menu')) {
      return 'BUY MENU';
    } else if (contents.includes('UMP-45, MAG-7, R8 Revolve')) {
      return 'WEAPONS';
    } else if (contents.includes('the slots, praying to the RNG')) {
      return 'SKINS';

    } else if (contents.includes('CS:GO Players now get a weapon')) {
      return 'CASES';
    } else if (
      contents.includes('always felt like a home to me. But then CSGO came out, around the time I was old enough to own') ||
      contents.includes('Counter-Strike 2') ||
      contents.includes('CS2') ||
      contents.includes('CS2 ') ||

      contents.includes('Counter-Strike 2 patch notes') ||
      contents.includes('Counter-Strike 2 needs more women')
    ) {
      return 'CS2';
    } else if (contents.includes('smoke')) {
      return 'SMOKES';
    } else if (
      contents.includes('Team Vitality') ||
      contents.includes('Team Liquid') ||
      contents.includes('team')
    ) {
      return 'TEAMS';
    } else {
      return 'UNKNOWN';
    }
  };

  const getSteamImageURL = (contents) => {
    const regex = /{STEAM_CLAN_IMAGE}(.*?)\.png/g;
    const matches = contents.match(regex);
    if (matches && matches.length > 0) {
      const steamImageURLPrefix = 'https://clan.cloudflare.steamstatic.com/images/';
      return matches[0].replace('{STEAM_CLAN_IMAGE}', steamImageURLPrefix);
    }
    return null;
  };

  const sanitizeContents = (contents) => {
    return contents.replace(/{STEAM_CLAN_IMAGE}.*?\.png/g, '');
  };

  const groupedNews = csgoNews.reduce((result, newsItem) => {
    const category = getCategory(newsItem.contents);
    if (!result[category]) {
      result[category] = [];
    }
    result[category].push(newsItem);
    return result;
  }, {});

  return (
    <div>
      <h2>CSGO Updates</h2>
      {Object.entries(groupedNews).map(([category, newsItems]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {newsItems.map((newsItem) => (
              <li key={newsItem.gid}>
                {newsItem.contents && (
                  <img src={getSteamImageURL(newsItem.contents)} alt="" />
                )}
                <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                  {newsItem.title}
                </a>
                <p
                  dangerouslySetInnerHTML={{
                    __html: sanitizeContents(newsItem.contents),
                  }}
                ></p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  
};

export default CSGOUpdates;
