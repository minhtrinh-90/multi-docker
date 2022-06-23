import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  const fetchValues = useCallback(async () => {
    const _values = (await axios.get("/api/values/current")).data;
    if (_values["undefined"]) {
      delete _values["undefined"];
    }
    setValues(_values);
  }, [setValues]);

  const fetchIndexes = useCallback(async () => {
    const _seenIndexes = (await axios.get("/api/values/all")).data;
    setSeenIndexes(_seenIndexes);
  }, [setSeenIndexes]);

  useEffect(() => {
    fetchIndexes();
    fetchValues();
  }, [fetchIndexes, fetchValues]);

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post("/api/values", { index });
    setIndex("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="index">Enter your index</label>
        <input
          id="index"
          type="text"
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h3>Indexes I have seen:</h3>
      {seenIndexes.length && seenIndexes.map(item => item.number).join(", ")}

      <h3>Calculated Values</h3>
      {Object.entries(values).map(([key, value]) => (
        <p key={key}>
          For index {key}, I calculated {value}
        </p>
      ))}
    </div>
  );
};

export default Fib;
