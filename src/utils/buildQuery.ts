export function buildQuery(params?: Record<string, any>): string {
  const query = new URLSearchParams();
  if (params) {
    for (const [ key, value ] of Object.entries(params)) {
      query.append(key, String(value));
    }
  }
  return `&${query.toString()}` as string;
}

export default buildQuery;