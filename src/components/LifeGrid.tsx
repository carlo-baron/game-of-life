"use client";

import { JoystickIcon } from 'lucide-react';
import {
  useState,
  useEffect
} from 'react';

export default function LifeGrid(
  {
    size,
    play
  } 
    : 
  {
    size: number;
    play: boolean
  }
){
  const [cells, setCells] = useState<number[][]>([]);
  const [iteration, setIteration] = useState<number>(0);

  useEffect(() => {
    if(!play) return;
    const id = setInterval(() => {
      setIteration(prev => prev+1);

      const nextCells = [...cells];
      for(let i = 0; i < size; i++){
        for(let j = 0; j < size; j++){
          const neighborCells = neighbors(i, j);
          const liveNeighbors = neighborCells.filter(neighbor => neighbor === 1).length;
          const currentCell = cells[i][j];

          if(currentCell === 1){
            if(liveNeighbors <= 1){
              cells[i][j] = 0;
            }else if(liveNeighbors <= 3){
              cells[i][j] = 1;
            }else{
              cells[i][j] = 0;
            }
          }else{
            if(liveNeighbors === 3){
              cells[i][j] = 1;
            }
          }
        }
      }

      setCells(nextCells);
    }, 100);

    return () => clearInterval(id);
  }, [play]);

  useEffect(() => {
    const nextCells: number[][] = [];
    for(let i = 0; i < size; i++){
      nextCells[i] = [];
      for(let j = 0; j < size; j++){
        nextCells[i][j] = 0;
      }
    }
    setCells(nextCells);
  }, [size]);

  function neighbors(row: number, col: number) {
    const dirs = [
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ];

    const neighborCells: number[] = [];

    for (const [dr, dc] of dirs) {
      const r = row + dr;
      const c = col + dc;

      if (r >= 0 && r < cells.length && c >= 0 && c < cells[0].length) {
        neighborCells.push(cells[r][c]);
      } else {
        neighborCells.push(null);
      }
    }

    return neighborCells;
  }

  function activateCell(row, col){
    const nextCells = [...cells];
    const currentState = nextCells[row][col] 
    nextCells[row][col] = currentState == 1 ? 0 : 1;
    setCells(nextCells);
  }

  return(
    <div
    className='gap-1 grid'
    style={{
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      gridAutoRows: '1fr',
    }}
    >
      {
        cells.flat().map((cell, index) => {
          const row = Math.floor(index / size);
          const col = index % size;

          return(
            <LifeCell 
            key={index}
            row={row}
            col={col}
            state={cell}
            onClick={activateCell}
            />
          );
        })
      }
   </div>
  );
}

interface LifeCellProps{
  row: number;
  col: number;
  state: number;
  onClick: (row, col) => void;
}

function LifeCell(
  {
    row,
    col,
    state,
    onClick,
  }
  :
  LifeCellProps
){
  const [clickCd, setClickCd] = useState<boolean>(false);
  function handleClick(){
    if(clickCd) return;
    onClick(row, col);
    setClickCd(true);

    setTimeout(() => setClickCd(false), 100);
  }

  return(
    <div 
      className="w-[1rem] aspect-1/1 outline-solid outline-white"
      style={{
        background: state ? 'white' : '',
      }}
      onClick={handleClick}
    >
    </div>
  );
}
