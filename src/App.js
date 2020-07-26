import React, { useState } from "react";

import CharPicker from "./components/CharPicker";
import Character from "./components/Character";

const App = (props) => {
  const [destroyed, setDestroyed] = useState(false);

  const [selectedCharacter, setSelectedCharacter] = useState(1);

  const [chosenSide, setChosenSide] = useState("light");

  const sideHandler = (side) => {
    setChosenSide(side);
  };

  const charSelectHandler = (event) => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
  };

  const destructionHandler = () => {
    setDestroyed(true);
  };

  let content = (
    <React.Fragment>
      <CharPicker
        side={chosenSide}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={sideHandler.bind(this, "light")}>Light Side</button>
      <button onClick={sideHandler.bind(this, "dark")}>Dark Side</button>
      {chosenSide === "dark" && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;

/* import React, { useState } from "react";

import CharPicker from "./components/CharPicker";
import Character from "./components/Character";

const App = (props) => {
  const [state, setState] = useState({
    selectedCharacter: 1,
    side: "light",
    destroyed: false,
  });

  const sideHandler = (side) => {
    setState({ side: side });
  };

  const charSelectHandler = (event) => {
    const charId = event.target.value;
    setState({ selectedCharacter: charId });
  };

  const destructionHandler = () => {
    setState({ destroyed: true });
  };

  let content = (
    <React.Fragment>
      <CharPicker
        side={state.side}
        selectedChar={state.selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={state.selectedCharacter} />
      <button onClick={sideHandler("light")}>Light Side</button>
      <button onClick={sideHandler("dark")}>Dark Side</button>
      {this.state.side === "dark" && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (state.destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App; 
*/
