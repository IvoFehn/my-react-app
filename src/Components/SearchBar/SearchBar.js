import './SearchBar.css';
import React from 'react';

export class SearchBar extends React.Component {

  constructor(props){
    super(props);

    this.sate = {
      term: ""
    }

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }
  
  search(){
    this.props.onSearch(this.state.term);
  }

  handleTermChange(e) {
    this.setState({term: e.target.value});
  }

  render() {
    return (
        <div class="SearchBar">
        <input onChange = {this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <button class="SearchButton" onClick={this.search}>SEARCH</button>
        </div>
    )
  }
}


