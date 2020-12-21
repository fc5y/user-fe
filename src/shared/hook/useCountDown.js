/* eslint-disable no-use-before-define */
import * as React from 'react';
import useIsMounted from './useIsMounted';

const useCountDown = ({ forceStart, countDownTime }) => {
  const [intervalID, setIntervalID] = React.useState(null);
  const [count, setCount] = React.useState(countDownTime || 0);
  const [start, setStart] = React.useState(false);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (start && count) {
      clearInterval(intervalID);
      const id = setInterval(() => {
        if (isMounted.current) {
          setCount((count) => count - 1);
        } else {
          clearInterval(intervalID);
        }
      }, 1000);
      setIntervalID(id);
      setStart(false);
    }

    return () => {
      clearInterval(intervalID);
    };
  }, [start]);

  React.useEffect(() => {
    setStart(forceStart || false);
  }, []);

  const startCountDown = React.useCallback((time) => {
    setCount(time || countDownTime || 0);
    setStart(true);
  }, []);

  const stopCountDown = React.useCallback(() => {
    setStart(false);
    clearInterval(intervalID);
  }, [intervalID]);

  return {
    count,
    startCountDown,
    stopCountDown,
  };
};

export default useCountDown;
