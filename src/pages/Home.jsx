import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/service'
import { Container, PostCard } from '../components'
// import authService from '../appwrite/auth'
import { useSelector } from "react-redux"

function Home() {

    const [posts, setPosts] = useState([])
    // const [activeUser, setActiveUser] = useState(false)

    const userData = useSelector((state) => state?.auth?.userData)

    useEffect(() => {
        // if (userData) {

        //     authService.getCurrentUser().then(user => {
        //         if (user) {
        //             setActiveUser(true)

        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts?.documents)
                    // console.log(posts, posts.documents);
                }
            })
        //         }
        //     })
        // }
    }, [])

    // if (activeUser && posts && userData) {
    return (
        <div className="w-full py-8">
            <Container>
                <div style={{ columns: "4 280px", gap: "16px" }}>
                    {posts.map((post) => (
                        post &&
                        <div key={post?.$id} className='mb-4 overflow-hidden'>
                            <PostCard
                                borderColor={post?.user_Id === userData?.$id ? 'border-b-4 border-orange-400' : ''}
                                {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
    // } else {
    //     return (
    //         <div className="w-full py-8 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="w-full p-2">
    //                         <h1 className="text-2xl font-bold">
    //                             Login to read posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
}

export default Home