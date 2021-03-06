import { useEffect, useState } from 'react';

export default function useMouseDown() {
  const [down, setDown] = useState(false);

  useEffect(() => {
    const setDownFromEvent = () => setDown(true);
    const setUpFromEvent = () => setDown(false);

    window.addEventListener('mousedown', setDownFromEvent);
    window.addEventListener('mouseup', setUpFromEvent);

    return () => {
      window.removeEventListener('mousedown', setDownFromEvent);
      window.removeEventListener('mouseup', setUpFromEvent);
    };
  }, []);

  return down;
}
