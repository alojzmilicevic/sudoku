import React, { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [size, setSize] = useState([document.body.clientWidth, window.innerHeight]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([document.body.clientWidth, window.innerHeight]);
    }

    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return { width: size[0], height: size[1] };
}

function ShowWindowDimensions() {
  const [width, height] = useWindowSize();
  return (
    <span>
      Window size:
      {width}
      x
      {height}
    </span>
  );
}

export { useWindowSize, ShowWindowDimensions };
