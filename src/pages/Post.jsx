import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/service"
import { Button, Container } from "../components"
import { useSelector } from "react-redux"
import Editor from "../components/EditorJS"
import defaultImg from '../assets/defaultImg.jpg'

export default function Post() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = post && userData ? post.user_Id === userData.$id : false

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                } else {
                    navigate("/")
                }
            })
        } else navigate("/")
    }, [slug, navigate])

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featured_Image)
                navigate("/")
            }
        })
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="relative flex justify-center w-full p-2 mb-4 border rounded-xl">
                    <img
                        src={userData !== null ? appwriteService.getFilePreview(post?.featured_Image) : defaultImg}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="px-10 mr-3" textColor='text-black'>
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" className="px-8" textColor='text-black' onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    <style>
                        {`.codex-editor .codex-editor__redactor {
                            padding-bottom: 50px !important;
                        }
                        `}
                    </style>
                    <Editor data={{ "blocks": JSON.parse(post?.content) }} readOnly={true} reamingCharacter={false} className="font-normal text-black bg-teal-50" />
                    {/* {console.log(JSON.parse(post?.content))} */}
                </div>
            </Container>
        </div>
    ) : null
}