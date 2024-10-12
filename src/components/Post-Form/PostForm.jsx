import { useCallback, useState, useRef, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select } from '../index'
import authService from '../../appwrite/auth'
// import { RTE } from '../index'
import appwriteService from '../../appwrite/service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Editor from "../EditorJS"

function PostForm({ post }) {
    // console.log(post);

    // Initial Data
    // const INITIAL_DATA = {
    //     time: new Date().getTime(),
    //     blocks: [
    //         {
    //             type: "header",
    //             data: {
    //                 text: "This is my awesome editor!",
    //                 level: 1,
    //             },
    //         },
    //     ],
    // }
    const [editorData, setEditorData] = useState(null)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post ? editorData || { "blocks": JSON.parse(post?.content) } : {
                time: new Date().getTime(),
                blocks: [
                    // {
                    //     type: "header",
                    //     data: {
                    //         text: "This is my awesome editor!",
                    //         level: 2,
                    //     },
                    // },
                ],
            },
            status: post?.status || 'active',
        },
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const [error, setError] = useState('')

    const submit = async (data) => {
        setError('')
        // console.log(data)
        // console.log(editorData)

        if (post) {
            // console.log(data);

            const myJSON = JSON.stringify(editorData?.blocks || data.content.blocks)
            if (myJSON.length > 10000) {
                setError('Content data is too long')
            }

            if (data?.image[0]?.size > 50000) {
                setError('Image is too long')
            }

            if (myJSON == null) {
                setError('Content is Empty')
            }

            if (editorData) {
                const myJSON = JSON.stringify(editorData.blocks)
                data.content = myJSON
            } else {
                data = { ...data, content: JSON.stringify(data.content.blocks) }
            }
            // console.log(data?.content)
            if (!error && myJSON.length < 10000) {

                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

                if (file) {
                    appwriteService.deleteFile(post.featured_Image)
                }
                const updatePost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featured_Image: file ? file.$id : undefined

                })
                if (updatePost) {
                    navigate(`/post/${updatePost.$id}`)
                }
            }
        } else {

            const myJSON = JSON.stringify(editorData?.blocks || data.content.blocks)
            // console.log(myJSON);
            if (myJSON.length > 10000) {
                setError('Content data is too long')
            }

            if (data.image[0].size > 50000) {
                setError('Image is too long')
            }

            if (myJSON == null) {
                setError('Content is Empty')
            }

            if (!error && data.image[0].size < 50000 && myJSON.length < 10000) {
                const file = await appwriteService.uploadFile(data.image[0])
                if (file) {
                    const fileId = file.$id
                    data.featured_Image = fileId
                    data = { ...data, content: myJSON }

                    const createPost = await appwriteService.createPost({
                        ...data,
                        user_Id: userData.$id
                    })
                    if (createPost) {
                        navigate(`/post/${createPost.$id}`)
                    }
                }
                // console.log(data)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value.trim().toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, '-')
                .replace(/\s/g, '-')
        }
        return ''
    }, [])

    const [addNewPost, setAddNewPost] = useState(false)
    useEffect(() => {

        authService.getCurrentUser().then(user => {
            if (user) {
                // console.log(user?.labels[0])

                if (user?.labels[0] === 'admin') {
                    setAddNewPost(true)
                } else {
                    appwriteService.getPosts()
                        .then(posts => {
                            let totalPost = 0
                            posts?.documents.map(post => {
                                if (post.user_Id === user?.$id) {
                                    totalPost++
                                }
                            })
                            if (5 > totalPost) {
                                setAddNewPost(true)
                            }
                        })
                }
            }
        })

        const subscription = watch((value, { name }) => {
            // console.log(value);
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true })
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    const [image, setImage] = useState(null)

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <>
            {error && <p className='px-3 py-1 m-auto text-red-600 bg-white rounded-lg max-w-fit'> {error} </p>}
            {addNewPost ? <form onSubmit={handleSubmit(submit)} className='flex flex-col md:flex-row'>
                <div className='w-full px-2 text-left md:w-2/3'>
                    <Input
                        label="Title :"
                        placeholder="Title"
                        className="mb-4"
                        {...register("title", {
                            required: true,
                        })}
                    />
                    <Input
                        label="Slug :"
                        placeholder="Slug"
                        className="mb-4"
                        {...register("slug", {
                            required: true,
                        })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                        }}
                    />

                    {/* {<RTE
                    label='Content :'
                    name='content'
                    control={control}
                    defaultValue={getValues('content')}
                    />} */}

                    <div className="relative w-full">
                        <label className="inline-block pl-1 mb-1 " htmlFor='editorjs'>Content :</label>
                        <Editor
                            data={editorData || getValues('content')}
                            onChangeData={setEditorData}
                            readOnly={false}
                            reamingCharacter={true}
                            placeholder="Let's take a note!"
                            className='font-normal text-black duration-200 bg-white border-2 border-white'
                            {...register("content", {
                                required: true,
                            })} />
                        {/* {console.log(getValues('content'))} */}
                    </div>
                </div>
                <div className='w-full px-2 text-left md:w-1/3'>
                    <Input
                        label='Featured Image :'
                        type='file'
                        accept="image/png, image/jpg, image/jpeg"
                        {...register("image", { required: !post })}
                        onChange={onImageChange}
                    />
                    <p className='mb-4 text-sm'>Image Size Less then : 48 kb <br /> Image Allowed : jpeg, jpg, png</p>
                    {post ? (
                        <div className="w-full mb-4">
                            <img
                                src={image || appwriteService.getFilePreview(post.featured_Image)}
                                alt={post.title}
                                className="rounded-lg"
                            />
                        </div>
                    ) : image && <div className="w-full mb-4">
                        <img
                            src={image}
                            alt='Uploaded Image'
                            className="rounded-lg"
                        />
                    </div>
                    }

                    <Select
                        options={["active", "inactive"]}
                        label="Status :"
                        className="mb-4"
                        {...register("status", { required: true })}
                    />

                    <Button type="submit"
                        bgColor={post ? "bg-green-500" : undefined} className="w-full">
                        {post ? "Update" : "Submit"}
                    </Button>
                </div>
            </form> : <h2>Your post creation limit has been Exceeded</h2>}
        </>
    )
}

export default PostForm