"use client"

import { type FormEvent, useRef, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send } from "lucide-react"


export default function App() {
  const generateUploadUrl = useMutation(api.messages.generateUploadUrl)
  const sendImage = useMutation(api.messages.sendImage)
  const messages = useQuery(api.messages.list)

  const imageInput = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000))

  async function handleSendImage(event: FormEvent) {
    event.preventDefault()
    if (!selectedImage) return

    setUploading(true)
    try {
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl()
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      })
      const { storageId } = await result.json()
      // Step 3: Save the newly allocated storage id to the database
      await sendImage({ storageId, author: name })

      setSelectedImage(null)
      if (imageInput.current) imageInput.current.value = ""
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setUploading(false)
    }
  }

  function Image({ message }: { message: { url: string; author: string } }) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm font-medium">{message.author}</CardTitle>
        </CardHeader>
        <CardContent>
          <img src={message.url || "/placeholder.svg"} alt="Uploaded image" className="w-full h-auto rounded-md" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSendImage} className="mb-8">
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
                <Send className="w-4 h-4 mr-2" />
                Send Image
              </>
            )}
          </Button>
        </div>
      </form>

      <div className="space-y-4">
        {messages?.map(
          (message) =>
            message.format === "image" && (
              <Image key={message._id} message={{ url: message.url!, author: message.author }} />
            ),
        )}
      </div>
    </div>
  )
}