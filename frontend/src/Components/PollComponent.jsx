import React, { useState } from 'react';

const PollComponent = () => {
  const [options, setOptions] = useState([
    { id: 1, text: "Option A", votes: 5 },
    { id: 2, text: "Option B", votes: 3 },
    { id: 3, text: "Option C", votes: 7 },
    { id: 4, text: "Option D", votes: 2 },
  ]);

  const handleVote = (id) => {
    setOptions(
      options.map((option) =>
        option.id === id ? { ...option, votes: option.votes + 1 } : option
      )
    );
  };

  const totalVotes = options.reduce((acc, option) => acc + option.votes, 0);

  return (
    <div style={{ width: "350px", border: "1px solid #ccc", borderRadius: "8px", padding: "16px", background: "#fff" }}>
      <h3 style={{ marginBottom: "12px" }}>What’s your favorite option?</h3>
      {options.map((option) => (
        <div key={option.id} style={{ marginBottom: "12px" }}>
          <button
            onClick={() => handleVote(option.id)}
            style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: "16px", marginBottom: "4px" }}
          >
            {option.text}
          </button>
          <div style={{ height: "8px", background: "#eee", borderRadius: "4px", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${(option.votes / totalVotes) * 100}%`,
                background: "#f97316",
              }}
            ></div>
          </div>
          <small>{option.votes} votes</small>
        </div>
      ))}
      <p style={{ marginTop: "16px", fontSize: "14px", color: "#666" }}>Total votes: {totalVotes}</p>
    </div>
  );
};

export default PollComponent;
