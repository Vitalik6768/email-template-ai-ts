"use client"

import { type FormEvent, useRef, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Upload } from "lucide-react"

import React from 'react'

interface ImagePickerFieldProps {
    label: string
    value: string
    onHandleInputChange: (url: string) => void
}

function ImagePickerField({ label, value, onHandleInputChange }: ImagePickerFieldProps) {
    const generateUploadUrl = useMutation(api.messages.generateUploadUrl)
    const sendImage = useMutation(api.messages.sendImage)

    const imageInput = useRef<HTMLInputElement>(null)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [finished, setFinished] = useState(false)
    const [name] = useState(() => "User " + Math.floor(Math.random() * 10000))




    async function handleSendImage(event: FormEvent) {
        event.preventDefault()
        if (!selectedImage) return

        setUploading(true)
        setFinished(false)
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
            if (imageInput.current) imageInput.current.value = ""
            setFinished(true)
        } catch (error) {
            console.error("Error uploading image:", error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <div>

            {value && (
                <img src={value} alt="Selected image" className="w-full h-auto rounded-md max-w-md" />
            )}

            <form onSubmit={handleSendImage} className="mb-4">
                <div className="flex items-center gap-4">
                    <Input
                        type="file"
                        accept="image/*"
                        ref={imageInput}
                        onChange={(event) => setSelectedImage(event.target.files?.[0] || null)}
                        disabled={uploading}
                        className="flex-grow"
                    />
                    <Button type="submit" disabled={!selectedImage || uploading}>
                        {uploading ? (
                            "Uploading..."
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
