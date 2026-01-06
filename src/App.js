import React, { useState } from "react";
import "./App.css";

function App() {
  const [joke, setJoke] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchJoke = async () => {
    setLoading(true);
    setError("");
    setJoke(null);

    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );

      if (!response.ok) {
        throw new Error("Error fetching joke");
      }

      const data = await response.json();
      setJoke(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Random Joke Generator</h1>

      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Joke"}
      </button>

      {!joke && !error && !loading && (
        <p>Click the button to fetch a joke</p>
      )}

      {joke && (
        <div className="joke">
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
