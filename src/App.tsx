import { useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import { Matrix, MatrixElement } from './models/Matrix';
import MatrixGrid from './components/MatrixGrid';
import { OnCellClick } from './components/MatrixCell';
import FibonacciMatrix from './containers/FibonacciMatrix';

// Should be used in future?
// import { List } from 'immutable';

function App() {
  const [matrix, setMatrix] = useState<Matrix<MatrixElement>>(
    new Array(50).fill(new Array(50).fill(0)),
  );

  // // const increment = useCallback((matrix: Matrix<MatrixElement>, rowIndex: number, colIndex: number) => (
  // const increment: OnCellClick = useCallback((rowIndex: number, colIndex: number) => {
  //     const newMatrix = immutableMatrixIncrement(rowIndex, colIndex)(matrix);
  //     setMatrix(
  //       newMatrix
  //     )

  //     console.log("Set", newMatrix)
  //     }, [matrix]);

  // useCallback((matrix: Matrix<MatrixElement>) => {
  //   console.log("callback")
  // }, [matrix]);

  return (
    <div className="App">
      {/* <header className="App-header" onClick={increment(matrix, 0, 0)}> */}
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header> */}

      <FibonacciMatrix />

      {/* <MatrixGrid matrixValues={matrix} onCellClick={increment} /> */}
    </div>
  );
}

export default App;
