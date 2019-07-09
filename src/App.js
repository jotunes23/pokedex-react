import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Pokecard from './components/Pokecard';

let options = [];

for (let i = 1; i <= 151; i++) {
  options.push(
    {
      value: i,
      label: i
    }
  )
}

class App extends Component {

  state = {
    pokemon: [],
    selectedOption: { value: 1, label: 1 },
    pkmSprite: '',
    pkmTypes: [],
    pkmAbilities: [],
    pkmStats: []
  }

  handleChange = (selectedOption) => {
    this.setState({
      selectedOption: selectedOption
    }, () => {
      this.getPokemon();
    });
  }

  getPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.selectedOption.value}/`)
      .then(
        res => {
          if (res.status === 200) {
            let pokemon = res.data;
            let pokemonSprite = res.data.sprites.front_default;
            let pokemonTypes = res.data.types;
            let pokemonAbilities = res.data.abilities;
            let pokemonStats = res.data.stats;
            setTimeout(() => {
              this.setState(
                {
                  pokemon: pokemon,
                  pkmSprite: pokemonSprite,
                  pkmTypes: pokemonTypes,
                  pkmAbilities: pokemonAbilities,
                  pkmStats: pokemonStats
                }
              );
            }, 3000);

          } else {
            this.setState(
              {
                pokemon: undefined
              }
            )
          }
        }
      )
      .catch(function (error) {
        console.log(error);
      })
      .then(
        this.setState(
          {
            pokemon: undefined
          }
        )
      );
  }

  componentDidMount() {
    this.getPokemon();
  }

  render() {
    if (this.state.pokemon !== undefined) {
      return (
        <div className="App">

          <h1>
            <img src="/images/pokemon-logo.png" alt="pokemon logo" className="logo" />
          </h1>

          <Select
            placeholder="Escolha um pokemon"
            defaultValue="1"
            className="selectPokemon"
            value="{selectedOption}"
            onChange={this.handleChange}
            options={options}
          />

          <Pokecard
            dadosPokemon={this.state.pokemon}
            pkmSprite={this.state.pkmSprite}
            pkmTypes={this.state.pkmTypes}
            pkmAbilities={this.state.pkmAbilities}
            pkmStats={this.state.pkmStats}
          />

        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>
            <img src="/images/pokemon-logo.png" alt="pokemon logo" className="logo" />
          </h1>
          <div className="content-indisponivel">
            <div className="gif-box">
              <img src="/images/pokeball.gif" alt="loading" className="gif-loading" />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;