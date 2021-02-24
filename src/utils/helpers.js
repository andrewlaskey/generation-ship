export const getRandomType = () => {
  const types = ['t', 'h', 'F', 'P']
  return types[Math.floor(Math.random() * types.length)];
}