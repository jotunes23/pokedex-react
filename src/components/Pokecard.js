import React, { Component } from 'react';

class Pokecard extends Component {

  colorOfType(name) {
    switch (name) {
      case 'grass':
        return '#4caf50'
        break;
      case 'poison':
        return '#673ab7'
        break;
      case 'fire':
        return '#d32f2f'
        break;
      case 'water':
        return '#03a9f4'
        break;
      case 'bug':
        return '#cddc39'
        break;
      case 'dragon':
        return '#1a237e'
        break;
      case 'flying':
        return '#b2ebf2'
        break;
      case 'ghost':
        return '#7b1fa2'
        break;
      case 'normal':
        return '#eee'
        break;
      case 'ice':
        return '#90caf9'
        break;
      case 'ground':
        return '#795548'
        break;
      case 'psychic':
        return '#e91e63'
        break;
      case 'rock':
        return '#263238'
        break;
      case 'electric':
        return '#ffeb3b'
        break;
      case 'fighting':
        return '#607d8b'
        break;
      default:
        break;
    }
  }


  getTypes() {
    let types = this.props.pkmTypes;

    let colors = [];

    let listTypes = types.map(tipo => {
      colors.push(this.colorOfType(tipo.type.name));
      return <li className={tipo.type.name} key={tipo.slot} style={{ color: this.colorOfType(tipo.type.name) }}>{tipo.type.name}</li>
    }).sort(function (a, b) {
      if (a.key > b.key) {
        return 1;
      } else {
        return -1;
      }
    });

    let style = `linear-gradient(-90deg, ${[...colors]})`;

    if (colors.length > 1) {
      return <ul className="list-types" style={{ backgroundImage: style }}>{listTypes}</ul>
    } else {
      return <ul className="list-types" style={{ backgroundColor: colors[0] }}>{listTypes}</ul>
    }

  }

  getAbilities() {
    let abilities = this.props.pkmAbilities;

    let listAbilities = abilities.map(abilitie => {
      return <li key={abilitie.slot}>{abilitie.ability.name}</li>
    }).sort(function (a, b) {
      if (a.key > b.key) {
        return 1;
      } else {
        return -1;
      }
    });

    return <ul className="list-abilities">{listAbilities}</ul>
  }

  getStats() {
    let stats = this.props.pkmStats;

    let listStats = stats.map((stat, index) => {
      return <li key={index}>{stat.base_stat}</li>;
    });

    return <ul className="list-stats">{listStats}</ul>
  }

  render() {

    return (
      <div className="pokeCard">
        <div className="pokemon-header">
          <div className="pokemon-imagebox">
            <div className="pokemon-image"></div>
            <img className="pokemon-sprite" src={this.props.pkmSprite} alt={this.props.dadosPokemon.name}></img>
          </div>
          <p className="nome">{this.props.dadosPokemon.name}</p>
          <p className="pokeid">#{this.props.dadosPokemon.id}</p>
        </div>
        <div className="pokemon-info">
          <div className="info">
            <h2>Informações</h2>
            <p className="peso">Peso: {parseFloat(this.props.dadosPokemon.weight / 10).toFixed(1)} kg</p>
            <p className="altura">Altura: {parseFloat(this.props.dadosPokemon.height / 10).toFixed(1)} m</p>
            <h2>Habilidades</h2>
            {this.getAbilities()}
            <h2>Tipo</h2>
            {this.getTypes()}
          </div>
          <div className="stats">
            {this.getStats()}
          </div>
        </div>
      </div>
    )
  }
}

export default Pokecard;