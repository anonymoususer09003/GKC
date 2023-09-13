import { useEffect, useState } from 'react';

const LogoutTimer = ({ logout }) => {
  const [timeoutId, setTimeoutId] = useState(null);

  // Function to reset the timeout whenever there is user activity
  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(logout, 60 * 60 * 1000); // 1 hour
    setTimeoutId(newTimeoutId);
  };

  // Register event listeners to detect user activity
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    const resetTimeoutOnUserActivity = () => resetTimeout();

    events.forEach((event) => {
      window.addEventListener(event, resetTimeoutOnUserActivity);
    });

    resetTimeout(); // Start the initial timeout

    // Clean up event listeners when the component is unmounted
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      events.forEach((event) => {
        window.removeEventListener(event, resetTimeoutOnUserActivity);
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default LogoutTimer;
