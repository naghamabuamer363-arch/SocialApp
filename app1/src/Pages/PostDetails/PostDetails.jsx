import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import PostCard from '../../Components/PostCard/PostCard'
import CommentCard from '../../Components/CommentCard/CommendCard'


export default function PostDetails() {

  const { id } = useParams()
  console.log("ID:", id)

  // Get Post Details
  function getPostDetails() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  }

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['getPostDetails', id],
    queryFn: getPostDetails
  })

  // Get Post Comments
  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  }

  const { data: commentsData } = useQuery({
    queryKey: ['getPostComments', id],
    queryFn: getPostComments ,
  })

  // Post
  let post = data?.data?.data?.post

  console.log(post)
  console.log(commentsData?.data?.data?.comments)
  let Comments = commentsData?.data?.data?.comments

  // Loading
  if (isLoading) {
    return <h2>Loading....</h2>
  }

  // Error
  if (isError) {
    console.log(error)
    return <h2>ERROR NO POSTS</h2>
  }

  return (
    <>
      <div className="min-h-screen bg-pink-50 pt-24 pb-10">

        <PostCard post={post} isSinglePost={true} />


        <h2 className="max-w-lg w-full m-auto mt-6 mb-4 text-xl font-bold text-pink-600">
          Comments:
        </h2>

        {Comments?.map((comment) => (
          <CommentCard key={comment._id} comment={comment}  postId={id} />
        ))}

      </div>
    </>
  )
}