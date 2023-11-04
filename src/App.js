//import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [formula, setFormula] = useState("");
  const [display, setDisplay] = useState("0");
  const [isEvaluated, setIsEvaluated] = useState(false);

  const operatorRegex = /[-+/*]/;

  useEffect(() => {
    if (display.length > 22) {
      const temp = display.slice(0, -1);
      const buttons = document.getElementsByTagName("button");
      for (const button of buttons) {
        button.disabled = true;
      }
      setFormula(formula.slice(0, -1));
      setDisplay("Max Digit Reached");
      setTimeout(() => {
        setDisplay(temp);
        for (const button of buttons) {
          button.disabled = false;
        }
      }, 500);
    }
  }, [display, formula]);

  function handleClear() {
    setFormula("");
    setDisplay("0");
  }

  function handleNumber(event) {
    const number = event.target.value;
    if (isEvaluated) {
      setFormula(number);
      setDisplay(number);
      setIsEvaluated(false);
    } else {
      if (display === "0") {
        setFormula(number);
        setDisplay(number);
      } else if (operatorRegex.test(display)) {
        setFormula(formula + number);
        setDisplay(number);
      } else {
        setFormula(formula + number);
        setDisplay(display + number);
      }
    }
  }

  function handleDecimal() {
    if (isEvaluated) {
      setFormula("0.");
      setDisplay("0.");
      setIsEvaluated(false);
    } else {
      if (operatorRegex.test(display)) {
        setFormula(formula + "0.");
        setDisplay("0.");
      } else {
        if (!display.includes(".")) {
          setFormula(formula + ".");
          setDisplay(display + ".");
        }
      }
    }
  }

  function handleOperator(event) {
    const operator = event.target.value;
    if (isEvaluated) {
      setFormula(display + operator);
      setDisplay(operator);
      setIsEvaluated(false);
    } else {
      if (/[.]$/.test(display)) {
        setFormula(formula.slice(0, -1) + operator);
        setDisplay(operator);
      } else if (operatorRegex.test(display)) {
        if (operatorRegex.test(formula.slice(-2, -1))) {
          if (operator !== "-") {
            setFormula(formula.slice(0, -2) + operator);
            setDisplay(operator);
          }
        } else {
          if (operator === "-") {
            setFormula(formula + operator);
            setDisplay(operator);
          } else {
            setFormula(formula.slice(0, -1) + operator);
            setDisplay(operator);
          }
        }
      } else {
        setFormula(formula + operator);
        setDisplay(operator);
      }
    }
  }

  function handleEqual() {
    let expression = formula;
    if (expression.includes("--")) {
      expression = expression.replace(/[-]{2}/g, "+");
    }
    // eslint-disable-next-line no-eval
    let answer = String(eval(expression));
    setFormula(formula + "=" + answer);
    setDisplay(answer);
    setIsEvaluated(true);
  }

  return (
    <div className="App" id="app">
      <div className="calculator">
        <div className="formulaScreen">{formula}</div>
        <div className="outputScreen" id="display">
          {display}
        </div>
        <div className="buttons">
          <button
            className="jumbo"
            id="clear"
            value={"AC"}
            onClick={handleClear}
          >
            AC
          </button>
          <button
            className="operators"
            id="divide"
            value={"/"}
            onClick={handleOperator}
          >
            /
          </button>
          <button
            className="operators"
            id="multiply"
            value={"*"}
            onClick={handleOperator}
          >
            x
          </button>
          <button id="seven" value={"7"} onClick={handleNumber}>
            7
          </button>
          <button id="eight" value={"8"} onClick={handleNumber}>
            8
          </button>
          <button id="nine" value={"9"} onClick={handleNumber}>
            9
          </button>
          <button
            className="operators"
            id="subtract"
            value={"-"}
            onClick={handleOperator}
          >
            -
          </button>
          <button id="four" value={"4"} onClick={handleNumber}>
            4
          </button>
          <button id="five" value={"5"} onClick={handleNumber}>
            5
          </button>
          <button id="six" value={"6"} onClick={handleNumber}>
            6
          </button>
          <button
            className="operators"
            id="add"
            value={"+"}
            onClick={handleOperator}
          >
            +
          </button>
          <button id="one" value={"1"} onClick={handleNumber}>
            1
          </button>
          <button id="two" value={"2"} onClick={handleNumber}>
            2
          </button>
          <button id="three" value={"3"} onClick={handleNumber}>
            3
          </button>
          <button
            className="jumbo"
            id="zero"
            value={"0"}
            onClick={handleNumber}
          >
            0
          </button>
          <button id="decimal" value={"."} onClick={handleDecimal}>
            .
          </button>
          <button id="equals" value={"="} onClick={handleEqual}>
            =
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
