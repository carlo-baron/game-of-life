"use client";

import {
  useState,
  useEffect
} from 'react';
import SandCell from './SandCell';

export default function SandGrid({size} : {size: number;}){
  const [cells, setCells] = useState<number[][]>([]);
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
        neighborCells.push(-1);
      }
    }

    return neighborCells;
  }

  function canFall(row: number, col: number): boolean{
    const neighborCells = neighbors(row, col);
    return neighborCells[3] === 0 ||
           neighborCells[4] === 0 ||
           neighborCells[5] === 0;
  }

  function fall(row: number, col: number){
    const nextCells = cells.map(row=>[...row]);
    const neighborCells = neighbors(row, col);
    
    nextCells[row][col] = 0;
    if(neighborCells[4] === 0){
      nextCells[row+1][col] = 1;
    }else if(neighborCells[3] === 0){
      nextCells[row+1][col+1] = 1;
    }else if(neighborCells[5] === 0){
      nextCells[row+1][col-1] = 1;
    }

    setCells(nextCells);
  }

  function activateCell(row: number, col: number){
    const nextCells = cells.map(row=>[...row]);
    nextCells[row][col] = 1;
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
            <SandCell 
            key={index}
            row={row}
            col={col}
            state={cell}
            canFall={canFall}
            fall={fall}
            onClick={activateCell}
            />
          );
        })
      }
    </div>
  );
}
