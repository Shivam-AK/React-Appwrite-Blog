import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/service'
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth'
import { useSelector } from "react-redux"

function Home() {

    const [posts, setPosts] = useState([])
    const [activeUser, setActiveUser] = useState(false)

    const userData = useSelector((state) => state?.auth?.userData)

    useEffect(() => {
        if (userData) {

            authService.getCurrentUser().then(user => {
                if (user) {
                    setActiveUser(true)

                    appwriteService.getPosts()
                        .then((posts) => {
                            if (posts) {
                                setPosts(posts?.documents)
                                // console.log(posts, posts.documents);
                            }
                        })
                }
            })
        }
    }, [])

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

    if (activeUser && posts && userData) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-wrap">
                        {/* {posts.map((post) => (
                                post &&
                                    <div key={post.$id} className='p-2 w-1/4'>
                                        <PostCard
                                            borderColor={post.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                                            {...post} />
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
                                        borderColor={post?.user_Id === userData?.$id ? 'border-b-4 border-orange-400' : ''}
                                        {...post} />
                                </div>
                            ))}
                        </div>
                        <div className='w-1/4'>
                            {rows3.map(post => (
                                <div key={post?.$id} className='p-2 '>
                                    <PostCard
                                        borderColor={post?.user_Id === userData?.$id ? 'border-b-4 border-orange-400' : ''}
                                        {...post} />
                                </div>
                            ))}
                        </div>
                        <div className='w-1/4'>
                            {rows4.map(post => (
                                <div key={post?.$id} className='p-2 '>
                                    <PostCard
                                        borderColor={post?.user_Id === userData?.$id ? 'border-b-4 border-orange-400' : ''}
                                        {...post} />
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home