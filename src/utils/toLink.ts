export default function toLink(url: string | undefined): string {
  if (!url) return "";
  console.log(url)
  if (url.startsWith("http") || url.startsWith("/") || url.startsWith("#")) {
    return url;
  }
console.log(url)
  return `/${url}`;
}