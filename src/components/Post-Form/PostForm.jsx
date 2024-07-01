import React, { useCallback, useState, useRef, useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select } from '../index'
// import { RTE } from '../index'
import appwriteService from '../../appwrite/service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Editor from "../EditorContext"

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
        console.log(data)
        console.log(editorData)

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

    useEffect(() => {
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
            {error && <p className='text-red-600 bg-white max-w-fit m-auto py-1 px-3 rounded-lg'> {error} </p>}
            <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
                <div className='w-2/3 px-2 text-left'>
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

                    <div className="w-full relative">
                        <label className="inline-block mb-1 pl-1 " htmlFor='editorjs'>Content :</label>
                        <Editor
                            data={editorData || getValues('content')}
                            onChangeData={setEditorData}
                            readOnly={false}
                            reamingCharacter={true}
                            placeholder="Let's take a note!"
                            className='bg-white text-black font-normal focus:border-black duration-200'
                            {...register("content", {
                                required: true,
                            })} />
                        {/* {console.log(getValues('content'))} */}
                    </div>
                </div>
                <div className='w-1/3 px-2 text-left'>
                    <Input
                        label='Featured Image :'
                        type='file'
                        accept="image/png, image/jpg, image/jpeg"
                        {...register("image", { required: !post })}
                        onChange={onImageChange}
                    />
                    <p className='text-sm mb-4'>Image Size Less then : 48 kb <br /> Image Allowed : jpeg, jpg, png</p>
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
            </form>
        </>
    )
}

export default PostForm