import React, { useState, useEffect } from "react";

const CharPicker = (props) => {
  const [loadedChars, setLoadedChars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect runs");
    setIsLoading(true);
    fetch("https://swapi.dev/api/people/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((charData) => {
        const selectedCharacters = charData.results.slice(0, 5);

        setIsLoading(false);
        setLoadedChars(
          selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  let content = <p>Loading characters...</p>;

  if (!isLoading && loadedChars && loadedChars.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {loadedChars.map((char) => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!loadedChars || loadedChars.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;

/*

import React, { Component } from "react";

class CharPicker extends Component {
  state = { characters: [], isLoading: false };

  componentDidMount() {
    this.setState({ isLoading: true });
    fetch("https://swapi.dev/api/people/")
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch.");
        }
        return response.json();
      })
      .then((charData) => {
        console.log("should be working");
        const selectedCharacters = charData.results.slice(0, 5);
        this.setState({
          characters: selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1,
          })),
          isLoading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    let content = <p>Loading characters...</p>;

    if (
      !this.state.isLoading &&
      this.state.characters &&
      this.state.characters.length > 0
    ) {
      content = (
        <select
          onChange={this.props.onCharSelect}
          value={this.props.selectedChar}
          className={this.props.side}
        >
          {this.state.characters.map((char) => (
            <option key={char.id} value={char.id}>
              {char.name}
            </option>
          ))}
        </select>
      );
    } else if (
      !this.state.isLoading &&
      (!this.state.characters || this.state.characters.length === 0)
    ) {
      content = <p>Could not fetch any data.</p>;
    }
    return content;
  }
}

export default CharPicker;
*/
