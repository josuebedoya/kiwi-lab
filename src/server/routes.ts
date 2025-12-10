export  async function  getStaticPaths(routes: object[]): Promise<{params: object}[]> {
  return  routes.map((r: object) => ({params:r}))
}
// Example usage:
const routes = [
  { slug: 'home' },
  { slug: 'about' }
] as const;