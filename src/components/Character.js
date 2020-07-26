import React, { useState, useEffect } from "react";

import Summary from "./Summary";

const Character = (props) => {
  const [loadedCharacter, setLoadedCharacter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  console.log("Rendering...");

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate');
  //   return (
  //     nextProps.selectedChar !== props.selectedChar ||
  //     nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
  //     nextState.isLoading !== this.state.isLoading
  //   );
  // }

  const fetchData = () => {
    console.log(
      "Sending Http request for new character with id " + props.selectedChar
    );
    setIsLoading(true);
    fetch("https://swapi.co/api/people/" + props.selectedChar)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then((charData) => {
        const loadedCharacter = {
          id: props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color,
          },
          gender: charData.gender,
          movieCount: charData.films.length,
        };
        setIsLoading(false);
        setLoadedCharacter(loadedCharacter);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  // componentDidUpdate(prevProps) {
  //   console.log('Component did update');
  //   if (prevProps.selectedChar !== props.selectedChar) {
  //     this.fetchData();
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchData();
    return () => {
      console.log("Cleaning up...");
    };
  }, [props.selectedChar]);

  useEffect(() => {
    return () => {
      console.log("component did unmount");
    };
  }, []);

  // componentWillUnmount() {
  //   console.log('Too soon...');
  // }

  let content = <p>Loading Character...</p>;

  if (!isLoading && loadedCharacter.id) {
    content = (
      <Summary
        name={loadedCharacter.name}
        gender={loadedCharacter.gender}
        height={loadedCharacter.height}
        hairColor={loadedCharacter.colors.hair}
        skinColor={loadedCharacter.colors.skin}
        movieCount={loadedCharacter.movieCount}
      />
    );
  } else if (!isLoading && !loadedCharacter.id) {
    content = <p>Failed to fetch character.</p>;
  }
  return content;
};

export default React.memo(Character);

/*

import React, { Component } from "react";

import Summary from "./Summary";

class Character extends Component {
  state = { loadedCharacter: {}, isLoading: false };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return (
      nextProps.selectedChar !== this.props.selectedChar ||
      nextState.loadedCharacter.id !== this.state.loadedCharacter.id ||
      nextState.isLoading !== this.state.isLoading
    );
  }

  componentDidUpdate(prevProps) {
    console.log("Component did update");
    if (prevProps.selectedChar !== this.props.selectedChar) {
      this.fetchData();
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    console.log(
      "Sending Http request for new character with id " +
        this.props.selectedChar
    );
    this.setState({ isLoading: true });
    fetch("https://swapi.dev/api/people/" + this.props.selectedChar)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then((charData) => {
        const loadedCharacter = {
          id: this.props.selectedChar,
          name: charData.name,
          height: charData.height,
          colors: {
            hair: charData.hair_color,
            skin: charData.skin_color,
          },
          gender: charData.gender,
          movieCount: charData.films.length,
        };
        this.setState({ loadedCharacter: loadedCharacter, isLoading: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    console.log("Too soon...");
  }

  render() {
    let content = <p>Loading Character...</p>;

    if (!this.state.isLoading && this.state.loadedCharacter.id) {
      content = (
        <Summary
          name={this.state.loadedCharacter.name}
          gender={this.state.loadedCharacter.gender}
          height={this.state.loadedCharacter.height}
          hairColor={this.state.loadedCharacter.colors.hair}
          skinColor={this.state.loadedCharacter.colors.skin}
          movieCount={this.state.loadedCharacter.movieCount}
        />
      );
    } else if (!this.state.isLoading && !this.state.loadedCharacter.id) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  }
}

export default Character;

*/
