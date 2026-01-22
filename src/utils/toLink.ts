export default function toLink(url: string | undefined): string {
  if (!url) return "";

  if (url.startsWith("http") || url.startsWith("/") || url.startsWith("#")) {
    return url;
  }

  return `/${url}`;
}