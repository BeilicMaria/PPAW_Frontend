import { useEffect, useState, useRef } from "react";

export default function useNoActivity() {
  const [hasActivity, setHasActivity] = useState(true);
  const inactivityTimeout = 20 * 60 * 1000; //20min
  const timeout: any = useRef();

  const onActivity = () => {
    clearTimeout(timeout.current);
    if (!hasActivity) {
      setHasActivity(true);
    }
    timeout.current = setTimeout(() => {
      setHasActivity(false);
    }, inactivityTimeout);
  };

  useEffect(() => {
    window.removeEventListener("mousemove", onActivity);
    window.removeEventListener("keyup", onActivity);
    window.removeEventListener("scroll", onActivity);
    window.removeEventListener("touchstart", onActivity);

    window.addEventListener("mousemove", onActivity);
    window.addEventListener("keyup", onActivity);
    window.addEventListener("scroll", onActivity);
    window.addEventListener("touchstart", onActivity);

    return () => {
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keyup", onActivity);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("touchstart", onActivity);
      clearTimeout(timeout.current);
    };
  }, [hasActivity]);

  return hasActivity;
}
