import React, { Component } from "react";
import "./style.css"

class App extends Component {
  state = {
    clickedFriends: [],
    score: 0,
    roundEnd: false,
    friends: [
      {
        gif: require("./gifs/dennis.jpg"),
        id: 1
      },
      {
        gif: require("./gifs/mac.png"),
        id: 2
      },
      {
        gif: require("./gifs/charile.jpg"),
        id: 3
      },
      {
        gif: require("./gifs/danny.jpg"),
        id: 4
      },
      {
        gif: require("./gifs/dee.jpg"),
        id: 5
      },
    ]
  };

  roundReset = () => {
    let { clickedFriends, score, roundEnd} = this.state
    
    clickedFriends = []
    score = 0
    roundEnd = false

    this.setState({
      clickedFriends,
      score,
      roundEnd
    })
  }

  onClick = id => {
    console.log("ive been clicked!");
    let { clickedFriends, score, friends, roundEnd, win} = this.state;
    let friendCount = friends.length;
    let friendsSelected;
    let temp;


    if (clickedFriends.includes(id)) {
      roundEnd = true;
      setTimeout(this.roundReset, 2000)
      console.log("you lost");
      clickedFriends = [];
      score = 0;
    } else {
      score++;
      clickedFriends.push(id);
      if (score === friendCount) {
        win = true;
        roundEnd = true;
      }
    }

  

    while (friendCount > 0) {
      friendsSelected = Math.floor(Math.random() * friendCount);
      friendCount--;
      temp  = friends[friendCount];
      friends[friendCount] = friends[friendsSelected];
      friends[friendsSelected] = temp;

    }

    this.setState({
      clickedFriends,
      score,
      friends,
      roundEnd,
      win
    });

    clickedFriends.push(id);
  };



  render() {
    // const images = [];
    return (
      <div className="App">
        <h1>cLiCkY FrIeNdS</h1>
        <p>Click all the friends, with no duplicates, to win the game!</p>
        <div className="friend-zone">
          {(this.state.roundEnd && !this.state.win) ? (<h1>You Lose</h1>)
          :
          (this.state.roundEnd && this.state.win) ? (<h1>Congratz, you win</h1>)
          :
          (this.state.friends.map(friend => <img src ={friend.gif} onClick={() => this.onClick(friend.id)} key={friend.id} alt="idk" /> ))}
        </div>
      </div>
    );
  }
}

export default App;
