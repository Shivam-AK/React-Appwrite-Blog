import React from 'react'
import appwriteService from '../appwrite/service'
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featured_Image = '', borderColor = '' }) {

    // console.log($id, title, featured_Image);
    return (
        <Link to={`/post/${$id}`}>
            
            <div className={`w-full bg-gray-100 rounded-xl p-4 ${borderColor}`}>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(featured_Image)} alt={title}
                        className='rounded-xl' />
                </div>
                <h2
                    className='text-xl font-bold text-black'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard