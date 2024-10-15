export function waiter(selector, timeout = 7000) {
  return new Promise((resolve, reject) => {
      const startTime = Date.now();

      const checkExist = setInterval(() => {
          const element = document.querySelector(selector);

          if (element) {
              clearInterval(checkExist);
              resolve(element);
          } else if (Date.now() - startTime > timeout) {
              clearInterval(checkExist);
              reject(new Error(`Element with selector "${selector}" not found within ${timeout}ms`));
          }
      }, 100);
  });
}
