import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'

import { Protected } from './components/'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/Signup.jsx'
import AllPost from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/Post.jsx'
import MyAccount from './pages/MyAccount.jsx'
import ChangePassword from './pages/ChangePassword.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       {
//         path: '/',
//         element: <Home />
//       },
//       {
//         path: '/login',
//         element: (
//           <Protected authentication={false}>
//             <Login />
//           </Protected>
//         )
//       },
//       {
//         path: '/sign-up',
//         element: (
//           <Protected authentication={false}>
//             <SignUp />
//           </Protected>
//         )
//       },
//       {
//         path: '/all-posts',
//         element: (
//           <Protected authentication={true}>
//             <AllPost />
//           </Protected>
//         )
//       },
//       {
//         path: '/add-post',
//         element: (
//           <Protected authentication={true}>
//             <AddPost />
//           </Protected>
//         )
//       },
//       {
//         path: '/edit-post/:slug',
//         element: (
//           <Protected authentication={true}>
//             <EditPost />
//           </Protected>
//         )
//       },
//       {
//         path: '/post/:slug',
//         element: (
//           // <Protected authentication={true}>
//           //   <EditPost />
//           // </Protected>
//           <Post />
//         )
//       },
//       {
//         path: '/my-account',
//         element: (
//           <Protected authentication={true}>
//             <MyAccount />
//           </Protected>
//         ),
//         children: [
//           {
//             path: 'change-password',
//             element: (
//               <Protected authentication={true}>
//                 <ChangePassword />
//               </Protected>
//             ),
//           },
//         ],
//       },
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} >
      <Route path='/' element={<Home />} />
      <Route path='/login' element={
        <Protected authentication={false}>
          <Login />
        </Protected>
      } />
      <Route path='/sign-up' element={
        <Protected authentication={false}>
          <SignUp />
        </Protected>
      } />
      <Route path='/all-posts' element={
        <Protected authentication={true}>
          <AllPost />
        </Protected>
      } />
      <Route path='/add-post' element={
        <Protected authentication={true}>
          <AddPost />
        </Protected>
      } />
      <Route path='/edit-post/:slug' element={
        <Protected authentication={true}>
          <EditPost />
        </Protected>
      } />
      <Route path='/post/:slug' element={
        <Protected authentication={true}>
          <Post />
        </Protected>
      } />
      <Route path='/my-account' element={
        <Protected authentication={true}>
          <MyAccount />
        </Protected>
      } />
      <Route path="/my-account/change-password" element={
        <Protected authentication={true}>
          <ChangePassword />
        </Protected>
      } />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
