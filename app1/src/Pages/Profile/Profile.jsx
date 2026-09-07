import React, { useContext } from 'react'
import { AuthContxt } from '../../Components/Context/AuthContext/AuthContxt'
import Postcard from '../../Components/PostCard/PostCard'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Profile() {

  let { userData } = useContext(AuthContxt)

  //user posts
  function getProfilePosts() {
    return axios.get(
      `https://route-posts.routemisr.com/users/${userData._id}/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
  }
  const { data, isLoading, error } = useQuery({
    queryKey: ['getProfilePosts'],
    queryFn: getProfilePosts,
  })

  console.log(data)

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border mt-9 border-pink-100">

          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600">
          </div>

          {/* User Info */}
          <div className="px-6 pb-7">

            <div className="flex justify-center -mt-16">
              <img
                src={userData?.photo}
                alt={userData?.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Name */}
            <div className="text-center mt-4">

              <h1 className="text-2xl font-bold text-gray-800">
                {userData?.name}
              </h1>

              <p className="text-pink-500 mt-1">
                @{userData?.username}
              </p>

            </div>

            {/* User Info */}
            <div className="flex justify-center gap-8 mt-6">

              <div className="text-center">
                <p className="text-xl font-bold text-gray-800">
                  {userData?._id}
                </p>

                <p className="text-sm text-gray-400">
                  User ID
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Posts Section */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold text-pink-500 mb-4">
            My Posts:
          </h2>

        </div>

        {isLoading && (
          <p className="text-center text-pink-500">
            Loading Posts...
          </p>
        )}

        {error && (
          <p className="text-center text-red-500">
            Something went wrong
          </p>
        )}

        {data?.data?.data?.posts?.map((post) => {

          console.log("Profile user:", userData?._id)
          console.log("Post user:", post?.user?._id)
          return (
            <Postcard
              key={post._id}
              post={post}
            />
          )
        })}


      </div>

    </div>
  )
}