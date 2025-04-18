import { useReducer } from "react";

const initialValue = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step };
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialValue;
    default:
      throw new Error("unknown action");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { count, step } = state;

  const today = new Date();
  const date = new Date();
  date.setDate(today.getDate() + count);
  const strDate = date.toDateString();

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const setDefault = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const setStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const resetBtn = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="app">
      <div className="input__container">
        <div>
          <input
            type="range"
            min={0}
            max={10}
            value={step}
            onChange={setStep}
          />
          <span>{step}</span>
        </div>

        <div>
          <button onClick={dec}>-</button>
          <input type="number" value={count} onChange={setDefault} />
          <button onClick={inc}>+</button>
        </div>

        <div>
          <p>
            {count === 0
              ? `Today is ${strDate}`
              : today > date
              ? `${count} days ago was ${strDate}`
              : `${count} days from now will be ${strDate}`}
          </p>
        </div>

        <div>
          <button onClick={resetBtn}>Reset</button>
        </div>
      </div>
    </div>
  );
}
