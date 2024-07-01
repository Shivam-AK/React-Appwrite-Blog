import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from '../appwrite/service'
import { useSelector } from "react-redux"

function AllPosts() {

    const [posts, setPosts] = useState([])


    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts?.documents)
            }
        })
    }, [])
    
    
    const userData = useSelector((state) => state.auth.userData)

    let rows1 = []
    for (let i = 0; i < posts.length; i += 4) {
        rows1.push(posts[i])
    }

    let rows2 = []
    for (let i = 1; i < posts.length; i += 4) {
        rows2.push(posts[i])
    }

    let rows3 = []
    for (let i = 2; i < posts.length; i += 4) {
        rows3.push(posts[i])
    }

    let rows4 = []
    for (let i = 3; i < posts.length; i += 4) {
        rows4.push(posts[i])
    }

    return userData && (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {/* {posts.map(post => (
                        <div className='w-1/4'>
                            <div key={post.$id} className='p-2 '>
                                <PostCard
                                    borderColor={post.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                                    {...post} />
                            </div>
                        </div>
                    ))} */}
                    <div className='w-1/4'>
                        {rows1.map(post => (
                            <div key={post?.$id} className='p-2 '>
                                <PostCard
                                    borderColor={post?.user_Id === userData?.$id ? 'border-b-4 border-orange-400' : ''}
                                    {...post}
                                />
                            </div>
                        ))}
                    </div >
                    <div className='w-1/4'>
                        {rows2.map(post => (
                            <div key={post?.$id} className='p-2 '>
                                <PostCard
                                    borderColor={post?.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                                    {...post} />
                            </div>
                        ))}
                    </div>
                    <div className='w-1/4'>
                        {rows3.map(post => (
                            <div key={post?.$id} className='p-2 '>
                                <PostCard
                                    borderColor={post?.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                                    {...post} />
                            </div>
                        ))}
                    </div>
                    <div className='w-1/4'>
                        {rows4.map(post => (
                            <div key={post?.$id} className='p-2 '>
                                <PostCard
                                    borderColor={post?.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                                    {...post} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AllPosts