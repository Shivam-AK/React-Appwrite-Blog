import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from '../index'
import appwriteService from '../../appwrite/service'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {

    // console.log(post);
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        },
    })
    // featured_Image: post?.featured_Image || '',

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)

    const submit = async (data) => {
        if (post) {
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
        } else {

            const file = await appwriteService.uploadFile(data.image[0])

            if (file) {
                const fileId = file.$id
                data.featured_Image = fileId

                const createPost = await appwriteService.createPost({
                    ...data,
                    user_Id: userData.$id
                })
                if (createPost) {
                    navigate(`/post/${createPost.$id}`)
                }
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

    React.useEffect(() => {
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

                <RTE
                    label='Content :'
                    name='content'
                    control={control}
                    defaultValue={getValues('content')}
                />
            </div>
            <div className='w-1/3 px-2 text-left'>
                <Input
                    label='Featured Image :'
                    type='file'
                    className='mb-4'
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                    onChange={onImageChange}
                />
                {post ? (
                    <div className="w-full mb-4">
                        <img
                            src={image || appwriteService.getFilePreview(post.featured_Image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                ) : <div className="w-full" id='js-product-image'>
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
    )
}

export default PostForm