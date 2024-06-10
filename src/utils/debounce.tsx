type DebounceFunction<F extends (...args: any[]) => any> = (
  this: ThisParameterType<F>,
  ...args: Parameters<F>
) => void;

function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number,
  immediate = false
): DebounceFunction<F> {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<F>) {
    //  If the immediate flag is true and there is no active timeout,
    //the debounced function will be executed immediately with the latest set of arguments
    if (immediate && !timerId) {
      func.apply(this, args);
    }

    // If there is an active timeout, it will be cleared
    if (timerId) {
      clearTimeout(timerId);
    }

    // If the debounced function is not executed immediately,
    // a new timeout is set using setTimeout,
    // with a delay time of delay milliseconds. When the timeout expires,
    // the original function is executed using func.apply(this, args) and
    // the timerId variable is set back to null.
    timerId = setTimeout(() => {
      if (!immediate) {
        func.apply(this, args);
      }
      timerId = null;
    }, delay);
  };
}

export default debounce;
