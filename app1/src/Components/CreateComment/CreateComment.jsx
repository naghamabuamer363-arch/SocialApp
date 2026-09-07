import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'


export default function CreateComment({ postId }) {

    const query = useQueryClient()
    const [image, setImage] = useState(null)
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            content: ''
        }
    })

    function handleCreateComment(data) {

        if (!data.content && !image) return

        const formData = new FormData()

        if (data.content) {
            formData.append('content', data.content)
        }

        if (image) {
            formData.append('image', image)
        }

        mutate(formData)
    }

    function createComment(formData) {
        return axios.post(
            `https://route-posts.routemisr.com/posts/${postId}/comments`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
    }

    const { mutate, isPending } = useMutation({
        mutationFn: createComment,

        onSuccess: () => {
            toast.success("Comment created successfully");
            reset()
            setImage(null)

            query.invalidateQueries({
                queryKey: ['getPosts']
            })
        },

        onError: (error) => {
            console.log("Comment can't be created")
            toast.error("Comment can't be created");
            console.log(error)
        }
    })

    return (
        <div className="mt-4">

            <form onSubmit={handleSubmit(handleCreateComment)}>

                <div className="flex items-center gap-2">
                    {/* Image */}
                    <label
                        htmlFor="imgFile"
                        className="cursor-pointer text-pink-500 hover:text-pink-700"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-8 mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                            />
                        </svg>
                    </label>

                    <input
                        id="imgFile"
                        type="file"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />


                    {/* Comment */}
                    <input
                        {...register('content')}
                        type="text"
                        className="flex-1 h-10 px-3 text-sm text-gray-700 border border-pink-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-pink-500"
                        placeholder="Add Your Comment"
                    />


                    <button
                        type="submit"
                        disabled={isPending}
                        className="h-10 px-5 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-pink-700"
                    >
                        {isPending ? 'Adding...' : 'Add'}
                    </button>

                </div>

            </form>

        </div>
    )
}