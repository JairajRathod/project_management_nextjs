function projectKeyGenerator(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 5);
}

export default projectKeyGenerator;
