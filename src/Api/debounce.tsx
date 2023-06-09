const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId!);

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export default debounce;
