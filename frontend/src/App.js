import "./App.css";
import React, { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [dimension, setDimension] = useState([]);
  const [cornerPoints, setCornerPoints] = useState([]);
  const [display, setDisplay] = useState(false);

  const handleOnSubmit = function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("dimension", dimension);
    formData.append("corner_points", cornerPoints);
    const requestOptions = {
      method: "POST",
      body: formData,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    fetch("http://localhost:5001/coordinates", requestOptions)
      .then((response) => response.text())
      .then((data) => setData(JSON.parse(data)));

    setDisplay(true);
  };

  const handleOnReset = function (event) {
    setDisplay(false);
    setDimension([]);
    setCornerPoints([]);
    setData([]);
    document.getElementById("dimension").value = "";
    document.getElementById("coordinates").value = "";
  };

  return (
    <div className="App relative">
      <div
        className={
          "min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r"
        }
      >
        <div className={"pt-10 text-5xl text-white"}>
          Fetch Rewards MLE Assessment
        </div>

        <div className={"flex grid grid-cols-2 gap-2 content-center mt-24"}>
          <div className={"mx-auto"}>
            <p className={"text-white text-3xl"}>
              Please input the image dimensions as (rows, cols):{" "}
            </p>
            <br />
            <form>
              <input
                name={"dimension"}
                id={"dimension"}
                onChange={(event) => setDimension(event.target.value)}
                size="32"
                type="text"
                name="width"
                placeholder="Example: (10, 12)"
                className={
                  "border-2 rounded-md focus:outline-none pl-3 border-white text-3xl"
                }
              />
            </form>
          </div>

          <div>
            <p className={"text-white text-3xl"}>
              Please input the corner points:{" "}
            </p>
            <br />
            <form>
              <input
                name={"corner_points"}
                id={"coordinates"}
                onChange={(event) => setCornerPoints(event.target.value)}
                size="32"
                type="text"
                name="width"
                placeholder="Example: [(1.5, 1.5), (4.0, 1.5), ...]"
                className="border-2 rounded-md focus:outline-none pl-3 border-white text-3xl"
              />
            </form>
          </div>
        </div>

        <div className={""}>
          {!display ? (
            <button
              onClick={handleOnSubmit}
              className={
                "text-3xl text-white border-2 px-1 py-1 rounded-md mt-24"
              }
            >
              Calculate Output
            </button>
          ) : (
            <button
              onClick={handleOnReset}
              className={
                "text-3xl text-white border-2 px-1 py-1 rounded-md mt-24"
              }
            >
              Reset
            </button>
          )}
        </div>
        <div className={"flex mx-auto items-center h-96 w-5/6 mt-10 "}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart width={150} height={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="x" />
              <YAxis type="number" dataKey="y" name="y" />
              <Scatter data={data} fill="#38bdf8" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <div>
          <p className={"text-white text-2xl"}>Plotted Points: </p>
          <div className="grid grid-cols-3 pt-10">
            {data.map(function (element) {
              return (
                <p className={"text-white text-2xl"}>
                  ({element.x}, {element.y})
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
