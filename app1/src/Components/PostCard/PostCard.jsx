import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CommentCard from '../CommentCard/CommendCard'
import CreateComment from '../../Components/CreateComment/CreateComment'
import { AuthContxt } from '../Context/AuthContext/AuthContxt'
import DropDownPost from '../Dropdown/DropdownPost'

export default function PostCard({ post, isSinglePost = false }) {

    const { userData } = useContext(AuthContxt)

    return (
        <div className="max-w-lg w-full m-auto mt-6 bg-white border-2 border-pink-500 rounded-3xl p-5 shadow-md">

            {/* Header */}
            <div className="flex items-start justify-between mb-3">

                {/* User Info */}
                <Link
                    to={`/postdetails/${post?._id}`}
                    className="flex items-center space-x-3"
                >

                    {/* User Image */}
                    <img
                        src={post?.user?.photo}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                    />

                    <div className="min-w-0 flex-1">

                        {/* User Name */}
                        <div className="flex items-center space-x-1">

                            <span className="font-bold text-pink-600 hover:text-pink-700 hover:underline truncate">
                                {post?.user?.name}
                            </span>

                            <svg
                                className="w-4 h-4 text-pink-500 flex-shrink-0"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-1.04.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                            </svg>

                        </div>

                        {/* Username */}
                        <span className="text-gray-500 text-sm">
                            @{post?.user?.username}
                        </span>

                    </div>

                </Link>


                {/* Dropdown */}
                {userData?._id === post?.user?._id && (
                    <DropDownPost post={post} />
                )}

            </div>


            {/* Post Content */}
            <div className="mb-3">

                <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                    {post?.body}
                </p>

            </div>


            {/* Post Image */}
            {post?.image && (
                <div className="mb-3">

                    <div className="rounded-xl overflow-hidden border border-gray-200">

                        <img
                            src={post?.image}
                            alt=""
                            className="w-full h-64 object-cover"
                        />

                    </div>

                </div>
            )}


            {/* Timestamp */}
            <div className="text-gray-500 text-xs">
                {post?.createdAt}
            </div>


            {/* Create Comment */}
            <div className="max-w-lg w-full m-auto">

                <CreateComment postId={post?._id} />

            </div>


            {!isSinglePost && post.topComment && (
                <CommentCard
                    comment={post.topComment}
                    postId={post.id}
                />
            )}

        </div>
    )
}