import './App.css';
import React from 'react';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {SearchBar} from '../SearchBar/SearchBar';
import Spotify from '../../util/Spotify';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playlistName : 'My Playlist',
      playlistTracks : []
      }

    this.addSong = this.addSong.bind(this);
    this.removeSong = this.removeSong.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };
  
  addSong(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks})
  }

  removeSong(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName : name});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      })
    });  
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults})
    });
  }



  render() {
    return (
    <div>
      <h1>Ja<span class="highlight">mmm</span>ing</h1>
      <div class="App">
        <SearchBar onSearch={this.search}/>
        <div class="App-playlist">
          <SearchResults searchResults={this.state.searchResults} onAdd={this.addSong}/>
          <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeSong} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/> 
        </div>
      </div>
    </div>
    )
  }
}

export default App;
