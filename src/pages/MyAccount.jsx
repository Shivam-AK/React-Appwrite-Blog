import { useState, useEffect } from 'react'
import appwriteService from '../appwrite/service'
import { Container, PostCard, LogoutBtn } from '../components'
import authService from '../appwrite/auth'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

function MyAccount() {

  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const [isUserPost, setIsUserPost] = useState(false)

  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {

    authService.getCurrentUser().then(user => {
      if (user) {

        appwriteService.getPosts([])
          .then(posts => {

            if (posts) {
              const result = []
              posts?.documents.map(post => {

                if (post.user_Id === userData?.$id) {
                  result.push(post)
                  if (!isUserPost) {
                    setIsUserPost(true)
                  }
                }
              })
              setPosts(result)
            }
          })
      }
    })
  }, [])
  // console.log(isUserPost);

  return (
    <div>
      <div className='flex flex-col items-center justify-center py-5 bg-black min-h-40'>
        <h1 className='mb-3'>Hi {userData?.name} </h1>
        <div className='flex gap-3 sm:gap-5'>
          <button onClick={() => navigate('/my-account/change-password')} className='px-4 py-2 duration-200 border-2 border-white rounded-none hover:rounded-3xl'> Change Password </button>
          {<LogoutBtn className='px-4 py-2 duration-200 border-2 border-white rounded-none hover:rounded-3xl' />}
        </div>
      </div>
      <div>
        <Container>
          <div style={{ columns: "4 280px", gap: "16px", }}>
            {posts.map((post) => {
              if (post.user_Id == userData.$id) {
                return <div key={post.$id} className='mb-4 overflow-hidden'>
                  <PostCard
                    borderColor={post.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                    {...post} />
                </div>
              }
            })}
            {
              isUserPost || (
                <h2>No Post Found</h2>
              )
            }
          </div>
        </Container>
      </div>
    </div>
  )
}

export default MyAccount