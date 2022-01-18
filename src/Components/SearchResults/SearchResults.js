import './SearchResults.css';
import React from 'react';
import {TrackList} from '../TrackList/TrackList';

export class SearchResults extends React.Component {

  

  render() {
    console.log(this.props.key);
    return (
        <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false}/> 
        </div>
    )
  }
}

