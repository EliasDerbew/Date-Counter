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
    <div className="h-screen flex justify-center items-center bg-slate-500 p-[20px] text-white">
      <div className="bg-slate-900 p-[40px] rounded-lg flex flex-col  items-center gap-4 min-w-[25rem]">
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
          <button className="bg-blue-400 pl-[5px] pr-[5px] font-sans text-[1rem] cursor-pointer w-10 rounded-full" onClick={dec}>-</button>
          <input
            type="number"
            value={count}
            onChange={setDefault}
            className="border-2 border-gray-500 m-[4px] pl-[10px] rounded-md focus:border-pink-600 bg-gray-700"
          />
          <button className="bg-blue-400 pl-[5px] pr-[5px] font-sans text-[1rem] cursor-pointer w-10 rounded-full" onClick={inc}>+</button>
        </div>

        <div>
          <p className="font-sans">
            {count === 0
              ? `Today is ${strDate}`
              : today > date
              ? `${count} days ago was ${strDate}`
              : `${count} days from now will be ${strDate}`}
          </p>
        </div>

        <div>
          <button className="p-[5px] bg-blue-400 text-black rounded-lg  cursor-pointer" onClick={resetBtn}>Reset</button>
        </div>
      </div>
    </div>
  );
}
