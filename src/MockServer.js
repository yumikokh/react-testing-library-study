import axios from "axios";
import React, { useState } from "react";

const MockServer = () => {
  const [clicked, setClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const { username } = res.data;
      setUsername(username);
      setClicked(true);
    } catch (e) {
      setError("Fetching Failed!");
    }
  };

  const buttonText = clicked ? "Loaded" : "Start Fetch";

  return (
    <div>
      <button onClick={fetchUser} disabled={clicked}>
        {buttonText}
      </button>
      {username && <h3>{username}</h3>}
      {error && <p data-testid="error">{error}</p>}
    </div>
  );
};

export default MockServer;
