import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  updateFiltersType = e => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  fetchPets = () => {
    const url = '/api/pets';
    let queryParam = this.state.filters.type === 'all' ? '' : '?type=' + this.state.filters.type;
    fetch(url + queryParam).then(resp => resp.json()).then(data => {
      this.setState({
        pets: [...data]
      })
    });
  }

  handleAdopt = id => {
    this.setState({
      pets: this.state.pets.map(pet => pet.id === id ? {...pet, isAdopted: true} : pet)
    });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.updateFiltersType}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.handleAdopt} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
