import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import ClassesPostBody from "../../styles/post-body.module.css";

import { getNWGCustomAdvertisement } from "../../services/api";
//import Image from "next/image";
const Image = dynamic(() => import("next/image"));

const PostDetail = ({ data }) => {
  const author = data.author.node;
  const date = new Date(data.date);
  const imagePath = data.featuredImage.node.sourceUrl;
  const tags = data.tags.edges;
  //const [postData, setPostData] = useState(data.content);

  useEffect(() => {
    FetchAdvertimsnetData();
  }, []);

  async function FetchAdvertimsnetData() {
    const NwgCustomAdvertisement = await getNWGCustomAdvertisement();
    console.log("advertisment = ", NwgCustomAdvertisement);

    NwgCustomAdvertisement.allNWGCustomAdvertisement.nodes.map((ad, index) => {
      const whereToShow = ad.whereToShow[0];
      const adBanner = ad.adBanner;
      const adLink = ad.adLink;
      const adName = ad.adName;
      const atWhichNumber = ad.atWhichNumber;

      let adHtml =
        '<p><a href="' +
        adLink +
        '" target="_blank" rel="noopener"><img class="aligncenter wp-image-33459 size-full" src="' +
        adBanner.mediaItemUrl +
        '" alt="' +
        adName +
        '" width="' +
        adBanner.mediaDetails.width +
        '" height="' +
        adBanner.mediaDetails.height +
        '" /></a></p>';

      let contentBody = document.querySelector(".contentBody");

      switch (whereToShow) {
        case "afterHeading2":
          let find1 = contentBody.querySelectorAll("h2")[atWhichNumber - 1];
          if (find1) {
            let adDiv1 = document.createElement("div");
            adDiv1.innerHTML = adHtml;
            find1.appendChild(adDiv1);
          }
          break;

        case "afterParagraph":
          let find2 = contentBody.querySelectorAll("h2")[atWhichNumber - 1];
          if (find2) {
            let adDiv2 = document.createElement("div");
            adDiv2.innerHTML = adHtml;
            find2.appendChild(adDiv2);
          }
          break;
      }
    });
  }

  // const getContentFragment = (index, text, obj, type) => {
  //   let modifiedText = text;

  //   if (obj) {
  //     if (obj.bold) {
  //       modifiedText = (<b key={index}>{text}</b>);
  //     }

  //     if (obj.italic) {
  //       modifiedText = (<em key={index}>{text}</em>);
  //     }

  //     if (obj.underline) {
  //       modifiedText = (<u key={index}>{text}</u>);
  //     }
  //   }

  //   switch (type) {
  //     case 'heading-three':
  //       return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
  //     case 'paragraph':
  //       return <p key={index} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
  //     case 'heading-four':
  //       return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
  //     case 'image':
  //       return (
  //         <img
  //           key={index}
  //           alt={obj.title}
  //           height={obj.height}
  //           width={obj.width}
  //           src={obj.src}
  //         />
  //       );
  //     default:
  //       return modifiedText;
  //   }
  // };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
        <div className="relative overflow-hidden shadow-md mb-6">
          <Image
            width={320}
            height={180}
            src={imagePath}
            alt={data.title}
            layout="responsive"
            className="object-top h-full w-full object-cover  shadow-lg rounded-t-lg lg:rounded-lg"
            placeholder="blur"
            blurDataURL={imagePath}
          />
        </div>
        <div className="px-4 lg:px-0">
          <div className="flex items-center mb-8 w-full">
            <div className="hidden md:flex items-center justify-center lg:mb-0 lg:w-auto mr-8 items-center">
              <img
                alt={author.name}
                height="30px"
                width="30px"
                className="align-middle rounded-full"
                src={author.avatar.url}
              />
              <p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">
                {author.name}
              </p>
            </div>
            <div className="font-medium text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline mr-2 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="align-middle">
                {moment(data.date).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
          <h1 className="mb-8 text-3xl font-semibold">{data.title}</h1>
          <div
            className={`${ClassesPostBody.content} contentBody break-all`}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </div>
    </>
  );
};

export default PostDetail;
