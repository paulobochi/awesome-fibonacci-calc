import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const { data } = await axios.get("/api/values/current");
    setValues(data);
  };

  const fetchIndexes = async () => {
    const { data } = await axios.get("/api/values/all");
    setSeenIndexes(data);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await axios.post("/api/values", { index });
    setIndex("");
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(", ");
  };

  const renderCalculatedValues = () => {
    if (values) {
      return Object.keys(values).map(key => (
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      ));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input value={index} onChange={e => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values:</h3>
      {renderCalculatedValues()}
    </div>
  );
};
