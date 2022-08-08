import Head from "next/head";
import { PostCard, Categories, PostWidget } from "../components";
import { getPosts } from "../services";
import { getAllPostsForHome } from "../services/api";

export default function Home({ allPosts: { edges } }) {
  return (
    <>
      <Head>
        <title data-rh="true">
          BabaCric | Latest Sports News , Dream11 Prediction and Tips
        </title>
        <meta
          name="description"
          content="Get cricket news, tips and analysis reports that help you to create teams on Fantasy platforms like Dream11, Vision11, Playerzpot etc "
        />

        <link rel="canonical" href="http://babacric.in/" />
      </Head>
      <div className="container mx-auto lg:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {edges.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
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
  const allPosts = await getAllPostsForHome(preview);

  const posts = (await getPosts()) || [];
  return {
    props: {
      posts,
      allPosts,
    },
    revalidate: 10, //10 minutes
  };
}
