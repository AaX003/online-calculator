import './Calculator.css';
import { useState } from 'react';
import { evaluate } from 'mathjs';

import { FaBackspace } from "react-icons/fa";

function Calculator() {
  const [value, setValue] = useState("");

   const HandleClear = () => {
    setValue("");
  };

  const HandleUndo = () => {
    setValue(prev => (prev.length > 0 ? prev.slice(0, -1) : prev));
  }

  const HandleConversion = (symbol, number) => {
    if (typeof symbol === "string" && number !== undefined) {
      if (symbol.trim() === "%") {
        setValue(evaluate(number / 100));
      } 
    }
  }

  const AddSymbol = (symbol) => {
    setValue(prev => prev + symbol);
  };

  const AddNumber = (number) => {
    setValue(prev => prev + number);
  };
  
  const Calculate = () => {
    try {
      const result = evaluate(value);
      setValue(result.toString());
    } catch {
      setValue("Error");
    }
  }

  const isLastCharSymbol = /[+\-*/.%]/.test(value.slice(-1)); // checks if last char entered was a symbol

  return (
    <div className="container">
      <h1>Calculator</h1>

      <div className="calculator-container">
        <div className="input-field-container">
          <div className="result">{value || "0"}</div>
        </div>
        <div className="buttons-container">
          <button className="clear" onClick={HandleClear}>C</button>
          <button className="divide-sign" onClick={() => {AddSymbol("/")}} disabled={isLastCharSymbol}>/</button>
          <button className="times-sign" onClick={() => {AddSymbol("*")}} disabled={isLastCharSymbol}>*</button>
          <button className="redo-sign" onClick={HandleUndo}><FaBackspace /></button>
          
          <button className="seven" onClick={() => AddNumber("7")}>7</button>
          <button className="eight" onClick={() => AddNumber("8")}>8</button>
          <button className="nine" onClick={() => AddNumber("9")}>9</button>

          <button className="minus-sign" onClick={() => {AddSymbol("-")}} disabled={isLastCharSymbol}>-</button>
          <button className="four" onClick={() => AddNumber("4")}>4</button>
          <button className="five" onClick={() => AddNumber("5")}>5</button>
          <button className="six" onClick={() => AddNumber("6")}>6</button>

          <button className="plus-sign" onClick={() => {AddSymbol("+")}} disabled={isLastCharSymbol}>+</button>
          <button className="one" onClick={() => AddNumber("1")}>1</button>
          <button className="two" onClick={() => AddNumber("2")}>2</button>
          <button className="three" onClick={() => AddNumber("3")}>3</button>
          <button className="equal-sign" onClick={(symbol) => Calculate(symbol, value)}>=</button>

           <button className="zero" onClick={() => AddNumber("0")}>0</button>
          <button className="decimal" onClick={() => {AddSymbol(".")}} disabled={isLastCharSymbol}>.</button>
          
          <button className="percent-sign" onClick={() => { AddSymbol("%"); HandleConversion(); }} disabled={isLastCharSymbol}>%</button>
          
        </div>
        <p className="msg">Online Calculator</p>
      </div>
    </div>
  );
}

export default Calculator;
