import { useState } from "react";
import "./App.css";

// how many kg / meters one unit is worth
const weightToKg = {
  kg: 1,
  lb: 0.45359237,
};

const heightToMeters = {
  cm: 0.01,
  m: 1,
  in: 0.0254,
  ft: 0.3048,
};

function App() {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [bmi, setBmi] = useState(null);

  function checkInput(value, name) {
    if (value === "") return name + " is required";
    if (isNaN(value)) return name + " must be a number";
    if (Number(value) <= 0) return name+ " must be greater than 0";
    return "";
  }
  function getCategory(bmi) {
    if (bmi< 18.5) return "Underweight";
    if (bmi<25) return "Normal weight";
    if (bmi<30) return "Overweight";
    return "Obese";
  }

  function handleCalculate(e) {
    e.preventDefault();

    const wError = checkInput(weight, "Weight");
    const hError = checkInput(height, "Height");
    setWeightError(wError);
    setHeightError(hError);

    if (wError || hError) {
      setBmi(null);
      return;
    }

    // convert the input to kg and meters first
    const kg = Number(weight) * weightToKg[weightUnit];
    const meters = Number(height) * heightToMeters[heightUnit];

    setBmi(kg / (meters * meters));
  }

  function handleReset() {
    setWeight("");
    setHeight("");
    setWeightError("");
    setHeightError("");
    setBmi(null);
  }

  return (
    <div className="app">
      <h1>BMI Calculator</h1>

      <form onSubmit={handleCalculate} noValidate>
        <label>Weight</label>
        <div className="row">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={weightError ? "invalid" : ""}
          />
          <select
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value)}
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </div>
        {weightError && <p className="error">{weightError}</p>}

        <label>Height</label>
        <div className="row">
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={heightError ? "invalid" : ""}
          />
          <select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value)}
          >
            <option value="cm">cm</option>
            <option value="m">m</option>
            <option value="in">inches</option>
            <option value="ft">feet</option>
          </select>
        </div>
        {heightError && <p className="error">{heightError}</p>}

        <div className="buttons">
          <button type="submit">Calculate</button>
          <button type="button" className="secondary" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {bmi !== null && (
        <div className="result">
          <p className="bmi">Your BMI: {bmi.toFixed(1)}</p>
          <p className="category">{getCategory(bmi)}</p>
        </div>
      )}
    </div>
  );
}

export default App;