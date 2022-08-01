import React from 'react';
import PostSeo from '../seo/post-seo';
import Author from './Author';
import PostDetail from './PostDetail';



const Post = ({data}) => {
    const author = data.author.node
    return(
        <>
            <div className="container mx-auto lg:px-10 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="col-span-1 lg:col-span-8">
                        <PostSeo data={data} />
                        <PostDetail data={data} />
                        <Author author={author} />
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Post;