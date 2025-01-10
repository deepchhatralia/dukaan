export const clearError = (fun: Function) => {
  const x = window.setTimeout(() => {
    fun("");
  }, 2000);
  return () => clearTimeout(x);
};
