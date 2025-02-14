import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { Wand2, FileText } from 'lucide-react'
import AinputBox from '@/components/custom/AinputBox'

function Page() {
    return (
        <div className="px-10 md:px-28 lg:px-40 xl:px-56 mt-20">
            <div className='flex flex-col items-center'>
                <h2 className='font-bold text-2xl'>
                    Create new email template
                </h2>
                <p className='text-sm text-muted-foreground'>
                    Create a new email template to start sending emails to your customers.
                </p>

                <Tabs defaultValue="ai" className='w-[500px] mt-10'>
                    <TabsList>
                        <TabsTrigger value="ai">
                            <Wand2 className="w-4 h-4 mr-2" />
                            Create new AI
                        </TabsTrigger>
                        <TabsTrigger value="scratch">
                            <FileText className="w-4 h-4 mr-2" />
                            Start from scratch
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ai">
                        <AinputBox />

                    </TabsContent>
                    <TabsContent value="scratch">Make your email look professional</TabsContent>

                </Tabs>
            </div>
        </div>
    )
}

export default Page