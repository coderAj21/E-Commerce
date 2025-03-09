function debounce(func, timeout = 300) {
  let timer;
  let rejectPreviousPromise;

  return (...args) => {
    clearTimeout(timer);
    if (rejectPreviousPromise) {
      rejectPreviousPromise({ cancelled: true });
    }

    const promise = new Promise((resolve, reject) => {
      rejectPreviousPromise = reject;
      timer = setTimeout(() => {
        try {
          const output = func(...args);
          resolve(output);
        } catch (error) {
          reject(error);
        } finally {
          rejectPreviousPromise = null;
        }
      }, timeout);
    });
    return promise;
  };
}

export default debounce;
