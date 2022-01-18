import './Track.css';
import React from 'react';

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.addSong = this.addSong.bind(this);
    this.delSong = this.delSong.bind(this);
  }

  renderAction(){
    if(this.props.isRemoval){
      return <button class="Track-action" onClick={this.delSong}>-</button>
    }else{
      return <button class="Track-action" onClick={this.addSong}>+</button>
    }
  }
    
  addSong() {
      this.props.onAdd(this.props.track);
  }

  delSong(){
    this.props.onRemove(this.props.track)
  }


  render() {
    return (
        <div class="Track">
          <div class="Track-information">
              <h3>{this.props.track.name}</h3>
              <p>{this.props.track.artist} | {this.props.track.album}</p>
          </div>
          {this.renderAction()}
        </div>
    )
  }
}

