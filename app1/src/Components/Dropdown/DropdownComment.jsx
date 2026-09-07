import React from 'react'
import { AuthContxt } from '../Context/AuthContext/AuthContxt'
import { useState } from 'react'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'


export default function DropdownComment({ comment, postId }) {

    const [isOpen, setIsOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [body, setBody] = useState('')
    const [imageFile, setImageFile] = useState(null)
    const query = useQueryClient()
    //Update
    function updateComment() {


        const formData = new FormData()
        formData.append('content', body)
        if (imageFile) {
            formData.append('image', imageFile)
        }

        return axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${comment?._id}`, formData, {

            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
    }

    const { mutate: updateCommentMutate, isPending: updateCommentPending } = useMutation({

        mutationFn: updateComment,
        onSuccess: () => {
            toast.success('Comment updated')
            setEditOpen(false)

            query.invalidateQueries({
                queryKey: ['getPostComments', postId]
            })

            // Post Details
            query.invalidateQueries({
                queryKey: ['getPostDetails', postId]
            })

            //Profile
            query.invalidateQueries({
                queryKey: ['getProfilePosts']
            })

            // Home
            query.invalidateQueries({
                queryKey: ['getPosts']
            })
        },
        onError: (error) => {
            toast.error("Comment can't be updated")
            console.log("Comment can't be updated")
            console.log(error)
        }

    })
    //DELETE
    function deleteComment() {
        return axios.delete(
            `https://route-posts.routemisr.com/posts/${postId}/comments/${comment?._id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        )
    }

    const { mutate: deleteCommentMutate, isPending: deleteCommentPending } = useMutation({

        mutationFn: deleteComment,

        onSuccess: () => {
            toast.success("Comment deleted")

            query.invalidateQueries({
                queryKey: ['getPostComments', postId]
            })

            query.invalidateQueries({
                queryKey: ['getPostDetails', postId]
            })

            query.invalidateQueries({
                queryKey: ['getProfilePosts']
            })

            query.invalidateQueries({
                queryKey: ['getPosts']
            })

        },

        onError: (error) => {
            toast.toast("Comment can't be deleted")
            console.log("Comment can't be deleted")
            console.log(error)
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
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                        />

                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
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
                                setEditOpen(true)
                                setBody(comment?.content)

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
                            onClick={() => {
                                setIsOpen(false)
                                deleteCommentMutate()
                            }}
                            disabled={deleteCommentPending}
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

                            {deleteCommentPending ? 'Deleting...' : 'Delete'}

                        </button>

                    </div>
                )}

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
                                    Edit Comment
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

                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    className="w-full min-h-24 p-3 border border-pink-300 rounded-xl outline-none focus:border-pink-500"
                                    placeholder="Edit your comment..."
                                />

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
                                className="hidden"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />

                            {/*imagePreview */}
                            {imageFile && (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Preview"
                                    className="w-full h-40 object-cover rounded-xl mt-3"
                                />
                            )}


                            {/* Footer */}
                            <div className="px-6 pb-6">

                                <button
                                    onClick={() => updateCommentMutate()}
                                    disabled={updateCommentPending}


                                    className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold"
                                >
                                    {updateCommentPending ? 'Updating...' : 'Update Comment'}
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>
    )
}