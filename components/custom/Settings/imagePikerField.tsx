"use client"

import { type FormEvent, useRef, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Upload, X } from "lucide-react"
import { ImageIcon } from "lucide-react"

import React from 'react'

interface ImagePickerFieldProps {
    label: string
    value: string
    onHandleInputChange: (url: string) => void
}

function ImagePickerField({ label, value, onHandleInputChange }: ImagePickerFieldProps) {
    const generateUploadUrl = useMutation(api.messages.generateUploadUrl)
    const sendImage = useMutation(api.messages.sendImage)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const [name] = useState(() => "User " + Math.floor(Math.random() * 10000))

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedImage(e.dataTransfer.files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0])
        }
    }

    async function handleSendImage(event: FormEvent) {
        event.preventDefault()
        if (!selectedImage) return

        setUploading(true)
        try {
            const postUrl = await generateUploadUrl()
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": selectedImage.type },
                body: selectedImage,
            })
            const { storageId } = await result.json()

            // Send the image and get the storage ID
            await sendImage({ storageId, author: name })

            // Construct the image URL and call the handler
            const imageUrl = `https://insightful-elk-623.convex.cloud/api/storage/${storageId}`
            onHandleInputChange(imageUrl)

            setSelectedImage(null)
            if (fileInputRef.current) fileInputRef.current.value = ""
        } catch (error) {
            console.error("Error uploading image:", error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>
            {value && (
                <img src={value} alt="Selected image" className="w-full h-auto rounded-md max-w-md mb-4" />
            )}

            <form onSubmit={handleSendImage} className="w-full max-w-md">
                <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                        dragActive ? "border-primary" : "border-gray-300"
                    } ${selectedImage ? "bg-gray-50" : "bg-white"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleChange}
                        accept="image/*"
                        className="hidden"
                    />
                    {selectedImage ? (
                        <div className="relative aspect-video w-full">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="w-full h-full object-cover rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                                Drag and drop your image here, or{" "}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-primary hover:text-primary-dark font-medium"
                                >
                                    browse
                                </button>{" "}
                                to choose a file
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                (Supported formats: JPG, PNG, GIF up to 5MB)
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-4">
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!selectedImage || uploading}
                    >
                        {uploading ? (
                            <>
                                <Upload className="w-4 h-4 mr-2 animate-spin" />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Image
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ImagePickerField
