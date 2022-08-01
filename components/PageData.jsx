import React from 'react';
import PageSeo from "./seo/page-seo";
import ClassesPostBody from '../styles/post-body.module.css'


const PageData = ({data}) => {
    return(
        <>
            <PageSeo data={data} />
            <div className="container mx-auto lg:px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                    <div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8">
                        <div className="relative overflow-hidden shadow-md mb-6">
                        </div>
                        <div className="px-4 lg:px-0">
                        <h1 className="mb-8 text-3xl font-semibold">{data.title}</h1>
                        <div className={`${ClassesPostBody.content} contentBody break-all`} dangerouslySetInnerHTML={{ __html: data.content }} />
                        </div>
                    </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageData;