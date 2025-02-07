"use client"

import React, { useEffect, useState } from 'react'
import EditorHeader from '@/components/custom/EditorHeader'
import ElementsSideBar from '@/components/custom/ElementsSideBar'
import Canvas from '@/components/custom/Canvas'
import Settings from '@/components/custom/Settings'
import { useParams } from 'next/navigation'
import { getEmailTemplate } from '@/convex/emailTemplate'
import { useConvex } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useEmailTemplate } from '@/app/provider'
import { Loader2 } from 'lucide-react'

function EditorPage() {
  const [viewHtmlCode, setViewHtmlCode] = useState(false)
  const { templateId } = useParams()
  const convex = useConvex()
  const [loading, setLoading] = useState(true)
  const { emailTemplate, setEmailTemplate } = useEmailTemplate()

  const getTemplateData = async () => {
    try {
      const result = await convex.query(api.emailTemplate.getEmailTemplate, {
        tid: templateId as string
      })
      setEmailTemplate(result?.design)

    } catch (error) {
      console.error('Error fetching template:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (templateId) {
      getTemplateData()
    }
  }, [templateId])

  useEffect(() => {
    // console.log('Email template updated:', emailTemplate)
  }, [emailTemplate])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader2 className='animate-spin text-primary' size={32} />
      </div>
    )
  }

  return (
    <div>
      <EditorHeader viewHtmlCode={(v: boolean) => setViewHtmlCode(v)} />
      <div className='grid grid-cols-5'>
        <ElementsSideBar />
        <div className='col-span-3 bg-gray-100'>
          <Canvas viewHtmlCode={viewHtmlCode} closeDialog={() => setViewHtmlCode(false)} />
        </div>
        <Settings />
      </div>
    </div>
  )
}

export default EditorPage