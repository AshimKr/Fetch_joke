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
      setError("Could not fetch a joke. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Random Joke</h1>

      {!joke && !error && !loading && (
        <p>Click the button to fetch a fresh one.</p>
      )}

      <button onClick={fetchJoke} disabled={loading}>
        {loading ? "Fetching..." : "Fetch joke"}
      </button>

      {joke && (
        <div className="joke">
          <p>{joke.setup}</p>
          <p>{joke.punchline}</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchJoke}>Try again</button>
        </div>
      )}
    </div>
  );
}

export default App;
