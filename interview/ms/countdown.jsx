function Countdown({ ms, interval = 1000, onCountEnd }) {
  const [countMs, setCountMs] = useState();
  const timer = useRef();

  useEffect(() => { // install
    setCountMs(ms);
    timer.current = setInterval(() => {
      const nextMs = countMs - interval;
      if (nextMs < 0) {
        clearInterval(timer.current);
        onCountEnd();
        return;
      }
      setCountMs(nextMs);
    }, interval);
    return () => { // uninstall
      clearInterval(timer.current);
    };
  }, [ms]);

  return (<div>{countMs}</div>)
}

const useCountdown = ({ ms, interval, onCountEnd }) => {
  const [countMs, setCountMs] = useState(ms);
  const timer = useRef();

  useEffect(() => { // install
    timer.current = setInterval(() => {
      const nextMs = countMs - interval;
      if (nextMs < 0) {
        clearInterval(timer.current);
        onCountEnd();
        return;
      }
      setCountMs(nextMs);
    }, interval);
    return () => { // uninstall
      clearInterval(timer.current);
    };
  }, [ms]);

  return countMs;
}