import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/service'
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth'
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom'

function MyAccount() {

  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  const [isUserPost, setIsUserPost] = useState(false)

  const userData = useSelector((state) => state.auth.userData)

  let rows1 = []
  let rows2 = []
  let rows3 = []
  let rows4 = []
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

  for (let j = 0; j < posts.length; j += 4) {
    rows1.push(posts[j])
  }

  for (let k = 1; k < posts.length; k += 4) {
    rows2.push(posts[k])
  }

  for (let l = 2; l < posts.length; l += 4) {
    rows3.push(posts[l])
  }

  for (let m = 3; m < posts.length; m += 4) {
    rows4.push(posts[m])
  }

  return (
    <div>
      <div className='h-40 flex items-center bg-black justify-center flex-col'>
        <h1>Hi {userData?.name} </h1>
        <button onClick={() => navigate('/my-account/change-password')} className='px-5 py-2 border-4 hover:rounded-3xl duration-200 rounded-none border-white'> Change Your Password </button>
      </div>
      <div>
        <Container>
          <div className="flex flex-wrap justify-center">
            {/* {posts.map((post) => {
              if (post.user_Id == userData.$id) {

                return <div key={post.$id} className='p-2 w-1/4'>
                  <PostCard
                    borderColor={post.user_Id === userData.$id ? 'border-b-4 border-orange-400' : ''}
                    {...post} />
                </div>
              }

            })} */}
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