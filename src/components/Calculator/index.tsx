
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Display from './Display';
import Button from './Button';
import { Button as UIButton } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  // Load saved equation if exists
  useEffect(() => {
    const savedEquation = localStorage.getItem('currentEquation');
    if (savedEquation) {
      // Parse the equation string like "5 + 3"
      const parts = savedEquation.split(' ');
      if (parts.length === 3) {
        const firstNum = parseFloat(parts[0]);
        const op = parts[1];
        const secondNum = parseFloat(parts[2]);
        
        setPreviousValue(firstNum);
        setOperation(op);
        setDisplay(String(secondNum));
      }
      // Clear the saved equation after loading
      localStorage.removeItem('currentEquation');
    }
  }, []);

  const clearAll = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
  };

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const performOperation = (nextOperation: string) => {
    const value = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(value);
    } else if (operation) {
      const result = calculate(previousValue, value, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (prevValue: number, nextValue: number, op: string): number => {
    switch (op) {
      case '+': return prevValue + nextValue;
      case '-': return prevValue - nextValue;
      case '×': return prevValue * nextValue;
      case '÷': return prevValue / nextValue;
      default: return nextValue;
    }
  };

  const handleMemory = (action: 'M+' | 'M-' | 'MR' | 'MC') => {
    const currentValue = parseFloat(display);
    
    switch (action) {
      case 'M+':
        setMemory((prev) => (prev ?? 0) + currentValue);
        setWaitingForOperand(true);
        break;
      case 'M-':
        setMemory((prev) => (prev ?? 0) - currentValue);
        setWaitingForOperand(true);
        break;
      case 'MR':
        if (memory !== null) {
          setDisplay(String(memory));
          setWaitingForOperand(true);
        }
        break;
      case 'MC':
        setMemory(null);
        break;
    }
  };

  const saveEquation = () => {
    const equations = JSON.parse(localStorage.getItem('savedEquations') || '[]');
    const newEquation = {
      id: uuidv4(),
      name: `Equation ${equations.length + 1}`,
      equation: `${previousValue} ${operation} ${display}`,
      result: display
    };
    localStorage.setItem('savedEquations', JSON.stringify([...equations, newEquation]));
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="flex justify-end mb-4">
        <Link to="/saved">
          <UIButton variant="outline">
            <Home className="mr-2" />
            Saved Equations
          </UIButton>
        </Link>
      </div>
      
      <Display value={display} memory={memory} />
      
      <div className="grid grid-cols-4 gap-2">
        <Button variant="secondary" onClick={() => handleMemory('MC')}>MC</Button>
        <Button variant="secondary" onClick={() => handleMemory('MR')}>MR</Button>
        <Button variant="secondary" onClick={() => handleMemory('M-')}>M-</Button>
        <Button variant="secondary" onClick={() => handleMemory('M+')}>M+</Button>

        <Button variant="secondary" onClick={clearAll}>AC</Button>
        <Button variant="secondary" onClick={clearDisplay}>C</Button>
        <Button variant="accent" onClick={() => performOperation('÷')}>÷</Button>
        <Button variant="accent" onClick={() => performOperation('×')}>×</Button>

        <Button onClick={() => inputDigit('7')}>7</Button>
        <Button onClick={() => inputDigit('8')}>8</Button>
        <Button onClick={() => inputDigit('9')}>9</Button>
        <Button variant="accent" onClick={() => performOperation('-')}>-</Button>

        <Button onClick={() => inputDigit('4')}>4</Button>
        <Button onClick={() => inputDigit('5')}>5</Button>
        <Button onClick={() => inputDigit('6')}>6</Button>
        <Button variant="accent" onClick={() => performOperation('+')}>+</Button>

        <Button onClick={() => inputDigit('1')}>1</Button>
        <Button onClick={() => inputDigit('2')}>2</Button>
        <Button onClick={() => inputDigit('3')}>3</Button>
        <Button
          variant="accent"
          onClick={() => {
            const value = parseFloat(display);
            if (previousValue !== null && operation) {
              const result = calculate(previousValue, value, operation);
              setDisplay(String(result));
              setPreviousValue(null);
              setOperation(null);
              setWaitingForOperand(true);
            }
          }}
          className="row-span-2"
        >=</Button>

        <Button onClick={() => inputDigit('0')} className="col-span-2">0</Button>
        <Button onClick={inputDecimal}>.</Button>
        <Button variant="accent" onClick={saveEquation}>Save</Button>
      </div>
    </div>
  );
};

export default Calculator;
