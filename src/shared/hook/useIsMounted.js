import React from 'react';

export default function useIsMounted() {
  const ref = React.useRef(false);
  const [, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    ref.current = true;
    setIsMounted(true);

    return () => {
      ref.current = false;
    };
  }, []);

  return ref;
}
