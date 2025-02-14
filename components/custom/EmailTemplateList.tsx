"use client"

import { useQuery, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function EmailTemplateList() {
  const { user } = useUser()
  const router = useRouter()
  const templates = useQuery(api.emailTemplate.getUserEmailTemplate, {
    email: user?.emailAddresses[0]?.emailAddress || ''
  })

  const deleteTemplate = useMutation(api.emailTemplate.deleteEmailTemplate)

  const handleDelete = async (e: React.MouseEvent, tid: string) => {
    e.stopPropagation() // Prevent card click event from firing
    if (confirm('Are you sure you want to delete this template?')) {
      await deleteTemplate({ tid })
    }
  }

  if (!templates) {
    return <div className="mt-8">Loading templates...</div>
  }

  if (templates.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        No templates found. Create your first template!
      </div>
    )
  }

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card 
          key={template._id} 
          className="cursor-pointer hover:shadow-lg transition-shadow relative"
          onClick={() => router.push(`/editor/${template.tid}`)}
        >
          <CardContent className="p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 hover:bg-red-100 hover:text-red-600"
              onClick={(e) => handleDelete(e, template.tid)}
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
            <div className="aspect-video bg-gray-100 rounded-md mb-3">
                <Image src="/templace.svg" alt="Template preview" width={400} height={225} />
            </div>
            <div className="font-medium truncate">Template {template.tid}</div>
            <div className="text-sm text-gray-500 truncate">{template.email}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 