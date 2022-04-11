// client/src/App.js

import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{!data ? "Loading..." :
          <div>
            <p>Message: {data.message}</p>
            <p>Encrypted: {data.encrypted}</p>
            <p>Is Message the same as encrypted? {data.result ? "Yes" : "No"}</p>
          </div>

        }</div>
      </header>
    </div>
  );
}

export default App;