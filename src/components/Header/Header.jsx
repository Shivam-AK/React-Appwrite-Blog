import { Container, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Logo from '../Logo'

function Header() {

  const authStatus = useSelector((state) => state.auth)
  const navigate = useNavigate()

  let userName = null
  if (authStatus.userData) {
    userName = authStatus.userData.name
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
          <ul className='flex items-center ml-auto text-black' style={{ fontSize: '20px' }}>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} className='inline-block px-3 py-2 duration-200 rounded-md hover:bg-blue-300'> {item.name} </button>
              </li>
            ) : null)}
            {
              authStatus.status && (
                <li key='logout' className='relative group/item'>
                  <button onClick={() => navigate('/my-account')} className='inline-block px-3 py-2 duration-200 rounded-md group-hover/item:bg-blue-300 hover:bg-blue-300'>Hi, {userName}</button>
                  <ul className='absolute hidden w-full group/edit group/btn group-hover/item:block '>
                    <li><LogoutBtn className='w-full py-2 duration-200 bg-white border-4 border-black hover:bg-blue-300' /></li>
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