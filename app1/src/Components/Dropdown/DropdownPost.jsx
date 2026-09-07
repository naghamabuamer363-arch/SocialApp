import React, { useState } from 'react'
import { TextArea, Button } from '@heroui/react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function DropDownPost({ post }) {

    const [isOpen, setIsOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const query = useQueryClient()

    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [body, setBody] = useState('')



    function handleImagePreview(e) {

        const file = e.target.files[0]

        if (file) {

            setImageFile(file)
            const imgSrc = URL.createObjectURL(file)
            setImagePreview(imgSrc)
        }
    }


    // Update Post
    function updatePost() {

        const formData = new FormData()

        formData.append('body', body)

        if (imageFile) {
            formData.append('image', imageFile)
        }

        return axios.put(
            `https://route-posts.routemisr.com/posts/${post?._id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
    }


    // Mutation
    const {
        mutate: handleUpdatePost,
        isPending: updatePending
    } = useMutation({

        mutationFn: updatePost,

        onSuccess: () => {
            toast.success('post updated')
            setEditOpen(false)
            setIsOpen(false)
            setImageFile(null)
            setImagePreview(null)

            query.invalidateQueries({
                queryKey: ['getPosts']
            })

            query.invalidateQueries({
                queryKey: ['getProfilePosts']
            })

            query.invalidateQueries({
                queryKey: ['getSinglePost', post?._id]
            })
        },

        onError: () => {
            toast.success('post cant update')
            console.log('post cant update')

        }
    })

    // delete Post
    function deletePost() {
        return axios.delete(
            `https://route-posts.routemisr.com/posts/${post?._id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
    }

    const { mutate: handleDeletePost, isPending: deletePending } = useMutation({
        mutationFn: deletePost,

        onSuccess: () => {
            toast.success('post deleted')
            setIsOpen(false)

            query.invalidateQueries({
                queryKey: ['getPosts']
            })

            query.invalidateQueries({
                queryKey: ['getProfilePosts']
            })
            query.invalidateQueries({
                queryKey: ['getPostDetails', post?._id]
            })
        },

        onError: () => {
            toast.error('post cant delete')
            console.log('post cant delete')

        }

    })


    return (
        <>
            <div className="relative">

                {/* Dropdown Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex-shrink-0 text-pink-500 hover:text-pink-700 transition-colors"
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0m-9.75 0h9.75"
                        />
                    </svg>

                </button>


                {/* Dropdown */}
                {isOpen && (

                    <div className="absolute right-0 mt-2 w-32 bg-white border border-pink-200 rounded-xl shadow-lg z-10">

                        {/* Edit */}
                        <button
                            onClick={() => {

                                setIsOpen(false)
                                setBody(post?.body)
                                setImageFile(null)
                                setImagePreview(null)
                                setEditOpen(true)

                            }}
                            className="w-full px-4 py-2 flex items-center gap-2 text-left text-pink-500 hover:bg-pink-50 rounded-t-xl"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                />
                            </svg>

                            Edit

                        </button>


                        {/* Delete */}
                        <button
                            onClick={handleDeletePost}
                            disabled={deletePending}
                            className="w-full px-4 py-2 flex items-center gap-2 text-left text-red-500 hover:bg-red-50 rounded-b-xl"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-10.06 0c-.34.059-.68.114-1.022.166m1.022-.165L5.84 19.673A2.25 2.25 0 0 0 8.084 21.75h7.832a2.25 2.25 0 0 0 2.244-2.077L19.228 5.79m-14.456 0a48.108 48.108 0 0 1 3.478-.397m6.5 0v-.916c0-1.18-.91-2.177-2.09-2.201a51.964 51.964 0 0 0-3.424 0C8.056 2.3 7.146 3.297 7.146 4.477v.916m10.06 0a48.66 48.66 0 0 0-10.06 0"
                                />
                            </svg>

                            {deletePending ? 'Deleting...' : 'Delete'}

                        </button>

                    </div>
                )}

            </div>


            {/* Edit Modal */}
            {editOpen && (

                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setEditOpen(false)}
                >

                    <div
                        className="bg-white w-full max-w-lg rounded-2xl border-2 border-pink-400 shadow-2xl shadow-pink-300"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-200">

                            <h2 className="text-pink-600 text-xl font-bold">
                                Edit Post
                            </h2>

                            <button
                                onClick={() => setEditOpen(false)}
                                className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 text-2xl hover:bg-pink-100 hover:text-pink-500 cursor-pointer"
                            >
                                ×
                            </button>

                        </div>


                        {/* Body */}
                        <div className="p-6">

                            <TextArea
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="What is on your mind .."
                                className="w-full"
                            />


                            {/* Image Preview */}

                            {(imagePreview || post?.image) && (

                                <div className="mt-4">

                                    <img
                                        src={imagePreview || post?.image}
                                        alt="Post"
                                        className="w-full h-48 object-cover rounded-xl border border-pink-200"
                                    />

                                </div>

                            )}

                        </div>


                        {/* Image Button */}
                        <label
                            htmlFor="updateImage"
                            className="block mt-4 text-center cursor-pointer text-pink-500"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 text-pink-500 ml-6 mb-1"
                            >

                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />

                            </svg>

                        </label>


                        <input
                            id="updateImage"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImagePreview}
                        />


                        {/* Footer */}
                        <div className="px-6 pb-6">

                            <Button
                                onClick={handleUpdatePost}
                                className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold"
                                disabled={updatePending}
                            >

                                {updatePending
                                    ? 'Updating...'
                                    : 'Update Post'
                                }

                            </Button>

                        </div>

                    </div>

                </div>
            )}

        </>
    )
}