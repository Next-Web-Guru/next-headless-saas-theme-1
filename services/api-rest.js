import { checkSlugOrIdForPost } from "./utils";

const API_URL = process.env.siteUrl + "/wp-json";
const API_URL2 = process.env.siteUrl + "/wp-json/wp/v2/";

var WPAPI = require("wpapi");
var wp = new WPAPI({ endpoint: API_URL });

// ---------- GET DATA FROM WP ------------------

// ------ get recent post list ------------------
export async function getRecentPosts(quantity = 10, page = 1) {
  const finalResult = wp
    .posts()
    .perPage(quantity)
    .page(page)
    .embed()
    .then(function (data) {
      return data;
    })
    .catch(function (err) {
      return err;
    });

  return finalResult;
}

//------- get post details -----------
//1. check the data is actually is a slug or id
//2. if slug then fetch data with slug otherwise with id
export async function getPostDetails(lastParam) {
  let finalResult;
  switch (checkSlugOrIdForPost(lastParam)) {
    case "slug":
      finalResult = wp
        .posts()
        .param("slug", lastParam)
        .embed()
        .then(function (data) {
          return data;
        })
        .catch(function (err) {
          return err;
        });
      break;
    case "id":
      finalResult = wp
        .posts()
        .id(lastParam)
        .embed()
        .then(function (data) {
          return data;
        })
        .catch(function (err) {
          return err;
        });
      break;
  }

  return finalResult;
}

export async function getPosts() {
  const postsRes = await fetch(API_URL2 + "posts?_embed");
  const posts = await postsRes.json();

  return posts;
}

export async function getPost(slug) {
  const posts = await getPosts();
  const postArray = posts.filter((post) => post.slug == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}
