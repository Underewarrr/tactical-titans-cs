import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import ReactLoading from 'react-loading';
import Article from '../components/Article.d';
import CurrentLeagues from '../widgets/CurrentLeagues';
import SteamLink from '../components/SteamLink';

const CSGOUpdates = () => {
  const [csgoNews, setCSGONews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCSGONews = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        const response = await axios.get('/api/cs/get-updates');
        setCSGONews(response.data);
      } catch (error) {
        console.error('Error fetching CSGO news:', error);
      } finally {
        setIsLoading(false); // Set loading state to false
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
  // FIX HTML TAGS FROM APISTEAM 
  const tempElement = document.createElement('div');
  tempElement.innerHTML = contents;
  const sanitizedContents = tempElement.textContent || tempElement.innerText;
  return sanitizedContents || ''; // Return an empty string if the value is undefined
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
    <><SteamLink link="https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/" /><div className="main-card-csgo">
      <CurrentLeagues />
      <center>
        <h2>CSGO Updates</h2>
      </center>
      {isLoading ? (
        <div className="loading-container">
          <ReactLoading type="spin" color="#de9b35" />
        </div>
      ) : (
        Object.entries(groupedNews).map(([category, newsItems]) => (
          <Card key={category} className="mt-4 bg-dark text-white category-card-csgo">
            <Card.Body>
              <center>
                <Card.Title>
                  <h2>{category}</h2>
                </Card.Title>
              </center>
              <ul>
                {newsItems.map((newsItem) => (
                  <div className="mt-4 bg-dark" id="article-li" key={newsItem.gid}>
                    {newsItem.contents && (
                      <Article
                        title={newsItem.title}
                        content={sanitizeContents(newsItem.contents)}
                        imageUrl={getSteamImageURL(newsItem.contents)}
                        url={newsItem.url} />
                    )}
                  </div>
                ))}
              </ul>
            </Card.Body>
          </Card>
        ))
      )}
    </div></>
  );
};

export default CSGOUpdates;
