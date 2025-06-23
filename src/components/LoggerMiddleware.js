const Logger = {
  log: (message, data = null) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data,
    };
    localStorage.setItem(`log-${Date.now()}`, JSON.stringify(logEntry));
  },
};

export default Logger;
