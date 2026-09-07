import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import PostCard from '../../Components/PostCard/PostCard'
import CreatePost from '../../Components/CreatePost/CreatePost'

export default function Home() {

  function getPosts() {
    return axios.get('https://route-posts.routemisr.com/posts', {
      params: {
        limit: 30,
        sort: 'createAt'
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

  }
  const { data , isError , isLoading ,error } = useQuery({
    queryKey: ['getPosts'],
    queryFn: getPosts
  })
  let posts = data?.data?.data?.posts
  console.log(posts)

  if (isLoading) {
    return <h2>Loading....</h2>
  }

  if (isError) {
    console.log(error)
    return <h2>ERROR NO POSTS</h2>
  }

  return <>
    <div className="min-h-screen bg-pink-50 pt-24 pb-10">
      <CreatePost/>

      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      </div>

    </>
}

