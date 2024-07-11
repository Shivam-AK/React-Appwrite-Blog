import React from 'react'
import { Container, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from '../Logo'

function Header() {

  const authStatus = useSelector((state) => state.auth)
  const navigate = useNavigate()

  let userName = null;
  if(authStatus.userData){
    userName = authStatus.userData.name;
    // console.log(authStatus, userName);
  }

  const navItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus.status
    },
    {
      name: 'Sign Up',
      slug: '/sign-up',
      active: !authStatus.status
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus.status
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus.status
    },
  ]
  

  return (
    <header className='bg-white'>
      <Container>
        <nav className='flex items-center'>
          <div className="mr-4">
            <Link to='/'>
              <Logo logoWidth={70} />
            </Link>
          </div>
          <ul className='flex ml-auto text-black items-center' style={{fontSize: '20px'}}>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} className='inline-block px-5 py-2 duration-200 hover:bg-blue-300 hover:border-b-black border-4 rounded-tl-3xl rounded-tr-3xl border-white'> {item.name} </button>
              </li>
            ) : null)}
            {
              authStatus.status && (
                <li key='logout' className='group/item relative'>
                  <button onClick={() => navigate('/my-account')} className='group-hover/item:bg-blue-300 inline-block px-5 py-2 duration-200 hover:bg-blue-300 rounded-tl-3xl rounded-tr-3xl border-white'>Hi, {userName}</button>
                  <ul className='group/edit group/btn w-full hidden group-hover/item:block absolute '>
                    <li><LogoutBtn /></li>
                  </ul>
                </li>
              )
            }
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header