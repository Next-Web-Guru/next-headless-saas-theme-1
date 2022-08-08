import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import ClassesPostBody from "../../styles/post-body.module.css";
import blurImage from "./blur-min.jpg";

import { getNWGCustomAdvertisement } from "../../services/api";
//import Image from "next/image";
const Image = dynamic(() => import("next/image"));

const PostDetail = ({ data }) => {
  const author = data.author.node;
  const date = new Date(data.date);
  const imagePath = data.featuredImage.node.sourceUrl;
  const tags = data.tags.edges;
  const [twiiterActualData, setTwiiterActualData] = useState([]);
  const [twitterEmbedIds, setTwitterEmbedIds] = useState([]);
  //const [postData, setPostData] = useState(data.content);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      FetchAdvertimsnetData();
    }, 2000);
    RemoveAndBackupTwitterData();
  }, []);

  useEffect(() => {
    const timeoutID = window.setTimeout(() => {
      AddTwitterDataAfterPageLoad();
    }, 5000);
  });

  function RemoveAndBackupTwitterData() {
    let contentBody = document.querySelector(".contentBody");
    let findTwitterDom = contentBody.querySelectorAll(".is-provider-twitter");

    //find and store twiiter id
    let allATags = contentBody.getElementsByTagName("a");
    var tIds = [];
    for (var i = 0; i < allATags.length; i++) {
      if (
        allATags[i].href.includes("https://twitter.com") &&
        allATags[i].href.includes("/status/")
      ) {
        var regex = new RegExp("twitter.com/.*/status(?:es)?/([^/?]+)");
        const str = allATags[i].href;
        let m;
        m = regex.exec(str);

        tIds.push(m[1]);
      }
    }

    setTwitterEmbedIds(tIds);

    //backup twitter actual data
    let arrEmbedList = [];
    findTwitterDom.forEach((e, index) => {
      arrEmbedList[index] = e.innerHTML;

      //remove page load twiiter data to reduce network load
      e.innerHTML = "";
    });
    setTwiiterActualData(arrEmbedList);
  }

  useEffect(() => {
    console.log("twiiterActualData", twiiterActualData);
  }, [twiiterActualData]);

  function AddTwitterDataAfterPageLoad() {
    let contentBody = document.querySelector(".contentBody");

    let findTwitterDom = contentBody.querySelectorAll(".is-provider-twitter");

    findTwitterDom.forEach((e, index) => {
      //e.innerHTML = twiiterActualData[index];
      console.log("twiiterActualData - ", twiiterActualData[index]);

      //let tempId = e.querySelector(".wp-block-embed-twitter");
      e.innerHTML =
        '<iframe scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 451px; height: 613px; display: block; flex-grow: 1;" title="Twitter Tweet" src="https://platform.twitter.com/embed/Tweet.html?dnt=true&embedId=twitter-widget-0&%3D&frame=false&hideCard=false&hideThread=false&id=' +
        twitterEmbedIds[index] +
        '&lang=en&theme=light&widgetsVersion=b7df0f50e1ec1%3A1659558317797&width=500px"></iframe>';
    });
  }

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
          let find2 = contentBody.querySelectorAll("p")[atWhichNumber - 1];
          if (find2) {
            let adDiv2 = document.createElement("div");
            adDiv2.innerHTML = adHtml;
            find2.appendChild(adDiv2);
          }
          break;
      }
    });
  }

  const convertImage = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#e2e2e2" offset="20%" />
        <stop stop-color="#f2f2f2" offset="50%" />
        <stop stop-color="#e2e2e2" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#e2e2e2" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

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
            //blurDataURL="https://babacricnews.s3.ap-south-1.amazonaws.com/wp-content/uploads/2022/08/03193518/blur-min.jpg"
            //blurDataURL={blurImage}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              convertImage(700, 475)
            )}`}
            // priority={true}
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
