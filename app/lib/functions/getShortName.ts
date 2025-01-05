export function getShortName(name: string): string {
  const words = name.split(/[\s-]+/); // Split name by spaces or hyphens
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase(); // Return the initial of the single word
  }
  return (
    words[0].charAt(0).toUpperCase() + // First word's initial
    words[words.length - 1].charAt(0).toUpperCase() // Last word's initial
  );
}
