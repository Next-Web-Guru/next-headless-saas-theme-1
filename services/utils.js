export function getUriFromLink(link) {
  const subString = process.env.siteUrl;
  return link.replace(subString, "");
}

export function checkSlugOrIdForPost(data) {
  if (Number.isInteger(data)) {
    return "id";
  } else {
    return "slug";
  }
}
