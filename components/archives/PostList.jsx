import React from "react";
import { convertFirstCharacterToUppercase } from "../../util";
import PostCard from "../PostCard";
import ArchiveSeo from "../seo/archive-seo";

const PostList = ({ urlType, urlName, data, slug }) => {
  //console.log(data)
  const pageType = convertFirstCharacterToUppercase(slug[0]);
  const pageName = convertFirstCharacterToUppercase(slug[1].replace("-", " "));

  return (
    <>
      <ArchiveSeo data={data} pageType={pageType} pageName={pageName} />

      <div className="container mx-auto lg:px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            <h1 className="font-medium leading-tight text-3xl mt-0 mb-2 text-white">
              {pageType} : {pageName}
            </h1>

            {data.edges.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostList;
