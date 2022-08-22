import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { getRecentPosts } from "../services/api-rest";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title data-rh="true">
          BabaCric | Latest Sports News , Dream11 Prediction and Tips
        </title>
        <meta
          name="description"
          content="Get cricket news, tips and analysis reports that help you to create teams on Fantasy platforms like Dream11, Vision11, Playerzpot etc"
        />

        <link rel="canonical" href="http://babacric.in/" />
      </Head>
      <div className="container mx-auto lg:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post) => {
              const featuredMedia = post["_embedded"]["wp:featuredmedia"][0];
              const author = post["_embedded"]["author"][0];
              return (
                <>
                  <PostCard
                    post={post}
                    featuredMedia={featuredMedia}
                    author={author}
                    key={post.id}
                  />
                </>
              );
            })}
          </div>
          <div className="lg:col-span-4 col-span-1">
            {/* <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

// Fetch data at build time
export async function getStaticProps({ preview = false }) {
  const posts = await getRecentPosts();
  return {
    props: {
      posts,
    },
    revalidate: 10, //10 minutes
  };
}
