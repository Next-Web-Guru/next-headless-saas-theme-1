//import { VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Loader } from "../components";
import PostList from "../components/archives/PostList";
import PageData from "../components/PageData";
//import PostList from "../components/archives/post-list";
//import Footer from "../components/layout/footer";
//import Header from "../components/layout/header";
//import PageData from "../components/page/page-data";
import Post from "../components/post/Post";
import {
  getCateogryRecentPostbyName,
  getHeaderMenuByName,
  getPageDetailsByUri,
  getPostDetailsByUri,
  getAllPostsWithUri,
} from "../services/api";
import { getPostDetails } from "../services/api-rest";

//export const config = { amp: 'hybrid' }

function OtherPages(props) {
  const router = useRouter();

  let componentToShow;

  if (router.isFallback) {
    return <Loader />;
  } else {
    //console.log(props)
    const urlType = props.urlType;
    const pageType = props.pageType;

    //if found any data
    if (props.postData) {
      //check for category, tag, author
      if (pageType === "archive") {
        componentToShow = (
          <PostList
            urlType={props.urlType}
            urlName={props.urlName}
            data={props.data}
            slug={props.slug}
          />
        );
      } else if (pageType === "page") {
        //it means it is a page
        componentToShow = <PageData data={props.data} />;
      } else {
        //it means it is a post

        componentToShow = <Post slug={props.slug} postData={props.postData} />;
      }
    } else {
      componentToShow = "<h1>Not Found Page</h1>";
    }
  }

  return (
    <>
      {componentToShow}
      {/* <Header menu={props.menu} />
            <VStack>
                <div className="mainBody">
                    <main className="mainContent">
                        {componentToShow}
                    </main>
                </div>
            </VStack>
            <Footer /> */}
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;
  const urlType = slug[0];
  const uriMain = params.slug.join("/");

  //get data
  let data;
  let pageType;
  let postData;

  if (urlType === "category" || urlType === "tag" || urlType === "author") {
    let typeName;
    if (urlType === "tag") {
      typeName = urlType;
    } else {
      typeName = urlType + "Name";
    }

    data = await getCateogryRecentPostbyName(typeName, slug[1]);

    pageType = "archive";
    // } else if (slug.length == 1) {
    //   //it means it is a page

    //   const uri = slug[0];
    //   data = await getPageDetailsByUri(uri);

    //   pageType = "page";
  } else {
    //it means it is a post
    const uri = params.slug.join("/");
    data = await getPostDetailsByUri(uri);
    pageType = "post";

    const lastParam = slug[slug.length - 1];
    postData = await getPostDetails(lastParam);
  }

  // menu data
  //const menuData = await getHeaderMenuByName(process.env.headerMenuName)

  return {
    props: {
      urlType: urlType,
      urlName: slug[0],
      data: data,
      pageType: pageType,
      slug: slug,
      uriMain: uriMain,
      postData: postData,
    },
    revalidate: 20, //20 minutes
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithUri();

  const mostVisitedUri = [
    "/fantasy-cricket/dream11-investment-strategy-5-years-of-experience/",
  ];

  const categoryListUri = [
    "/category/ipl",
    "/category/fantasy-cricket",
    "/category/cricket",
    "/category/birthday",
    "/category/fantasy-platform",
  ];

  //const postListUri = allPosts.edges.map(({ node }) => `${node.uri}`);

  const allUri = [];

  return {
    paths: allUri,
    fallback: true,
  };
}

export default OtherPages;
