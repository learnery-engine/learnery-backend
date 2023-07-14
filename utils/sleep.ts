export function sleep(ms: number): Promise<void> {
  console.count("sleep")
  return new Promise((resolve) => setTimeout(resolve, ms));
}
