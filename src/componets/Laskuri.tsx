import { useState } from "react";

const Laskuri = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="container">
      <h2 style={{ textAlign: "center" }}>BASIC COUNTER</h2>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          <p className="mathsign">+</p>
        </button>

        <h2 style={{ textAlign: "center" }}>{count}</h2>

        <button
          onClick={() =>
            setCount((count) => {
              if (count > 0) {
                return count - 1;
              } else {
                return (count = 0);
              }
            })
          }
        >
          <p className="mathsign">-</p>
        </button>
      </div>
      <button className="rstbtn" onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
};

export default Laskuri;
