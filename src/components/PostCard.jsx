import appwriteService from '../appwrite/service'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import defaultImg from '../assets/defaultImg.jpg'

function PostCard({ $id, title, featured_Image = '', borderColor = '' }) {

    const userData = useSelector((state) => state?.auth?.userData)
    // console.log($id, title, featured_Image);
    return (
        <Link to={`/post/${$id}`}>
            
            <div className={`w-full bg-gray-100 rounded-xl p-4 ${borderColor}`}>
                <div className='justify-center w-full mb-4'>
                    <img src={userData !== null ? appwriteService.getFilePreview(featured_Image) : defaultImg} alt={title}
                        className='rounded-xl' />
                </div>
                <h2
                    className='text-xl font-bold text-black'
                >{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard