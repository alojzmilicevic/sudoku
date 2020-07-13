import { useCallback, useEffect, useState } from "react";

export const useMouseInformation = (size) => {
  const [position, setPosition] = useState(-1);
  const [mouseDown, setMouseDown] = useState(false);
  const [selected, setSelected] = useState([]);
  const correctPosition = useCallback((pos, x, y) => {
    console.log(x, y);
    return pos <= 80 && pos >= 0 && x < size && y < size;
  }, [size]);
  const cellSize = size / 9;

  useEffect(() => {
    const mouseMove = e => {
      const x = Math.floor(e.clientX / cellSize)
      const y = Math.floor(e.clientY / cellSize);

      setPosition(x + 9 * y);

      if (mouseDown && correctPosition(position, e.clientX, e.clientY)) {
        setSelected(prevState => {
          prevState.push(position);
          return prevState;
        })
      }
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [mouseDown, position, cellSize, selected, correctPosition]);

  useEffect(() => {
    const mouseDown = e => {
      if (correctPosition(position, e.clientX, e.clientY)) {
        setSelected([position]);
      } else {
        setSelected([]);
      }

      setMouseDown(true);
    };

    window.addEventListener("mousedown", mouseDown)

    return () => {
      window.removeEventListener("mousedown", mouseDown);
    };
  }, [correctPosition, position, selected]);

  useEffect(() => {
    const mouseUp = e => {
      setMouseDown(false);
    };

    window.addEventListener("mouseup", mouseUp)
    return () => {
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [position]);


  return { selected };
};
