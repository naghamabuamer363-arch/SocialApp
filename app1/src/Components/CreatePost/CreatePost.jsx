import React, { useContext, useRef, useState } from "react";
import { Avatar, TextArea, Button } from "@heroui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContxt } from "../Context/AuthContext/AuthContxt";
import { toast } from 'react-toastify'



export default function CreatePost() {
    const [isOpen, setIsOpen] = useState(false);
    const [uplodedImg, setuplodedImg] = useState(null);
    const image = useRef(null);
    const body = useRef(null);
    const { userData } = useContext(AuthContxt)

    const queryClient = useQueryClient();

    function handleImagePreview(e) {
        console.log(e.target.files[0]);

        let imgSrc = URL.createObjectURL(e.target.files[0]);
        setuplodedImg(imgSrc);
    }

    function handleCloseImg() {
        setuplodedImg(null);
        image.current.value = null;
    }

    function prepareDate() {
        let formData = new FormData();

        if (body.current.value) {
            formData.append("body", body.current.value);
        }

        if (image.current.files[0]) {
            formData.append("image", image.current.files[0]);
        }

        return formData;
    }

    function createPost() {
        return axios.post(
            "https://route-posts.routemisr.com/posts",
            prepareDate(),
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
        );
    }

    const { mutate } = useMutation({
        mutationFn: createPost,

        onSuccess: (response) => {
            console.log("Post Created Successfully", response);
            toast.success("Post created successfully");


            queryClient.invalidateQueries({
                queryKey: ["getPosts"],
                refetchType: "all"
            });

            setIsOpen(false);
            if (body.current) {
                body.current.value = null;
            }

            if (image.current) {
                image.current.value = null;
            }

            setuplodedImg(null);
        },

        onError: (error) => {
            console.log("Error Creating Post", error);
            toast.error("Can't create post");
        }
    });

    return (
        <>
            {/* Create Post Card */}
            <div className="bg-pink-100 p-4 rounded-2xl shadow-md shadow-pink-300 border-2 border-pink-400 w-2/5 mx-auto mb-5 mt-3">

                <div className="flex items-center gap-3">

                    {/* Avatar */}
                    <Avatar className="w-12 h-12 shrink-0">
                        <Avatar.Image
                            alt={userData?.name || "User"}
                            src={userData?.photo}
                            className="w-12 h-12 rounded-4xl"
                        />
                    </Avatar>

                    {/* Open Modal Button */}
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex-1 h-12 px-4 text-left bg-white rounded-xl text-gray-500 hover:bg-gray-50 cursor-pointer"
                    >
                        What is on your mind?
                    </button>

                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={() => setIsOpen(false)}
                >

                    {/* Modal Box */}
                    <div
                        className="bg-white w-full max-w-lg rounded-2xl border-2 border-pink-400 shadow-2xl shadow-pink-300 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-pink-200">

                            <h2 className="text-pink-600 text-xl font-bold">
                                Create Post
                            </h2>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center w-8 h-8 rounded-full text-gray-500 text-2xl hover:bg-pink-100 hover:text-pink-500 cursor-pointer"
                            >
                                ×
                            </button>

                        </div>

                        {/* Body */}
                        <div className="p-6">

                            {/* TextArea */}
                            <TextArea
                                ref={body}
                                placeholder="What is on your mind .."
                                className="w-full"
                            />
                            {/* Image Button */}
                            <div className="mt-4">

                                <label
                                    htmlFor="img"
                                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-500 hover:bg-pink-200 cursor-pointer transition"
                                >

                                    <input
                                        ref={image}
                                        onChange={handleImagePreview}
                                        type="file"
                                        id="img"
                                        accept="image/*"
                                        hidden
                                    />

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
                                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                        />
                                    </svg>

                                </label>

                            </div>

                            {/* Image Preview */}
                            {uplodedImg && (
                                <div className="relative mt-4">

                                    <img
                                        src={uplodedImg}
                                        alt=""
                                        className="w-full max-h-72 object-cover rounded-xl border border-pink-200"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleCloseImg}
                                        className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 bg-white rounded-full text-pink-500 shadow-md hover:bg-pink-100 cursor-pointer"
                                    >
                                        ×
                                    </button>

                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="px-6 pb-6">

                            <Button
                                onPress={() => mutate()}
                                className="w-full h-11 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold"
                            >
                                Create Post
                            </Button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}