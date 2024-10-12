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

  function toggleMenu() {
    const menuBtn = document.getElementById("header-nav-toggle")
    const mobileMenu = document.getElementById("header-nav")
    const MenuDiv = document.querySelector("#header-nav div")

    menuBtn.classList.toggle("menu-is-open"),
      mobileMenu.classList.toggle("menu-is-open"),
      MenuDiv.classList.toggle("hidden"),
      'true' === menuBtn.getAttribute("aria-expanded") ? menuBtn.setAttribute("aria-expanded", "false") : menuBtn.setAttribute("aria-expanded", "true")
  }

  return (
    <header className='bg-white'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div>
            <Link to='/'>
              <Logo logoWidth={70} />
            </Link>
          </div>
          <ul className='items-center hidden text-xl text-black md:flex'>
            {navItems.map((item) => item.active ? (
              <li key={item.name}>
                <button onClick={() => navigate(item.slug)} className='inline-block px-3 py-2 duration-200 rounded-md hover:bg-gray-200'> {item.name} </button>
              </li>
            ) : null)}
            {
              authStatus.status && (
                <li key='logout' className='relative group/item'>
                  <button onClick={() => navigate('/my-account')} className='inline-block px-3 py-2 duration-200 rounded-md group-hover/item:bg-gray-200 hover:bg-gray-200'>Hi, {userName}</button>
                  <ul className='absolute hidden w-full group/edit group/btn group-hover/item:block '>
                    <li><LogoutBtn className='w-full py-2 duration-200 bg-white border-2 border-black rounded-lg hover:bg-gray-200' /></li>
                  </ul>
                </li>
              )
            }
          </ul>

          <div className='relative md:hidden'>
            <button
              id="header-nav-toggle"
              className="w-12 h-12 p-3 text-black bg-slate-300 rounded-xl group"
              aria-expanded={false}
              onClick={() => toggleMenu()}>
              <svg className="w-6 h-6 pointer-events-none fill-current" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <rect className={"origin-center absolute group-[[aria-expanded=true]]:rotate-[315deg] group-[[aria-expanded=true]]:[y:7px] group-[[aria-expanded=true]]:[x:0] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]"} y="2" x="7" width="9" height="2" rx="1"></rect>
                <rect className="origin-center group-[[aria-expanded=true]]:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]" y="7" width="16" height="2" rx="1"></rect>
                <rect className="origin-center group-[[aria-expanded=true]]:rotate-[135deg] group-[[aria-expanded=true]]:[y:7px] group-[[aria-expanded=true]]:[x:0] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)]" y="12" width="9" height="2" rx="1"></rect>
              </svg>
            </button>
            <div id="header-nav" className="absolute min-w-64 top-[120%] right-0 z-40 [&.menu-is-open]:bg-gray-200 transition-all duration-200 [&>div]:opacity-0 [&.menu-is-open>div]:opacity-100 [&.menu-is-open>div]:block [&.menu-is-open]:overflow-y-auto backdrop-blur-md rounded-xl">
              <div className="hidden p-4 transition-opacity duration-300">
                <ul className='text-xl text-black'>
                  {navItems.map((item) => item.active ? (
                    <li key={item.name} className='border-b-2 border-black'>
                      <button onClick={() => {toggleMenu(); navigate(item.slug)}} className='inline-block w-full px-3 py-3 duration-200 rounded-md hover:bg-gray-300'> {item.name} </button>
                    </li>
                  ) : null)}
                  {
                    authStatus.status && (
                      <li key='logout'>
                        <button onClick={() => {toggleMenu(); navigate('/my-account')}} className='inline-block w-full px-3 py-3 duration-200 rounded-md hover:bg-gray-300'>Hi, {userName}</button>
                      </li>
                    )
                  }
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </Container>
    </header>
  )
}

export default Header