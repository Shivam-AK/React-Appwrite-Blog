import { useState, useEffect } from 'react'
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

    return userData && (
        <div className='w-full py-8'>
            <Container>
                <div style={{ columns: "4 280px", gap: "16px" }}>
                    {posts.map(post => (
                        <div key={post.$id} className='mb-4 overflow-hidden'>
                            <PostCard
                                borderColor={post.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                                {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts