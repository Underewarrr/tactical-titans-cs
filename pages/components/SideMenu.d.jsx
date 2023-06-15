import React from 'react';
import CSGOLeagues from '../cs/CSGOLeagues.d';
import CSGOTeams from '../cs/CSGOTeams.d';
import CSGOPlayers from '../cs/CSGOPlayers.d';
import CSGONews from '../cs/CSGONews.d';
import CSGOUpdates from '../cs/CSGOUpdates.d';
import CSGOScore from '../cs/CSGOLeagues.d';

class SideMenu extends React.Component {
  state = {
    activeItem: 'CS:GO News'
  };

  handleClick = () => {
    const rightWrapper = document.getElementById('rightWrapper');
    const header = document.getElementById('header');
    rightWrapper.classList.toggle('full-page');
    header.classList.toggle('full-page');
  };

  handleMenuItemClick = (event, item) => {
    this.setState({ activeItem: item });
  };

  renderContent = () => {
    const { activeItem } = this.state;

    switch (activeItem) {
      case 'CS:GO News':
        return (
          <section>
            <CSGONews />
          </section>
        );
      case 'CS:GO Updates':
        return (
          <section>
            <CSGOUpdates />
          </section>
        );
      case 'CS:GO Leagues':
        return (
          <section>
            <CSGOLeagues />
          </section>
        );
      case 'CS:GO Players':
        return (
          <section>
            <CSGOPlayers />
          </section>
        );
      case 'CS:GO Leagues':
        return (
          <section>
            <CSGOLeagues />
          </section>
        );
      default:
        return (
          <article>
            <div className="article-header">Bem Vindo ao Tactical Team CS Website</div>
            <section>
              Encontre todas as novidades do mundo de CS:GO e muito mais. Fique por dentro das últimas notícias, atualizações e eventos relacionados ao Counter-Strike: Global Offensive.<br /><br />
              Além disso, participe de campeonatos amadores de CS:GO e mostre suas habilidades no jogo. Junte-se a outros jogadores entusiastas e divirta-se competindo em emocionantes torneios e partidas.<br /><br />
              Mantenha-se atualizado com o cenário competitivo, descubra estratégias avançadas, dicas e truques para aprimorar sua jogabilidade e acompanhe as principais equipes e jogadores profissionais de CS:GO.<br /><br />
              Seja parte da comunidade de CS:GO e aproveite todas as oportunidades emocionantes que o jogo oferece. Prepare-se para enfrentar desafios, conquistar vitórias e se divertir muito no universo competitivo de Counter-Strike: Global Offensive.
            </section>
          </article>
        );
    }
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div id="wrapper" style={{ display: 'flex' }}>
        <div id="leftWrapper">
          <div id="listView" className="list">
            <li className={activeItem === 'CS:GO News' ? 'list-item-active' : ''} onClick={(e) => this.handleMenuItemClick(e, 'CS:GO News')}><a href="#">CS:GO News</a></li>
            <li className={activeItem === 'CS:GO Updates' ? 'list-item-active' : ''} onClick={(e) => this.handleMenuItemClick(e, 'CS:GO Updates')}><a href="#">CS:GO Updates</a></li>
            <li className={activeItem === 'CS:GO Leagues' ? 'list-item-active' : ''} onClick={(e) => this.handleMenuItemClick(e, 'CS:GO Leagues')}><a href="#">CS:GO Leagues/Teams</a></li>
          </div>
        </div>

        <div id="rightWrapper" style={{ flex: 1 }}>
          <div id="header">
            <a id="fullPage" href="#" onClick={this.handleClick}>|||
           
            </a>
              

            </div>

          <div id="contentWrapper">
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenu;
