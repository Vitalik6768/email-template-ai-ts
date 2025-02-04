import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from '../ui/label'
import { CopyIcon } from 'lucide-react'

interface ViewHtmlDialogProps {
    openDialog: boolean
    htmlCode: string
    closeDialog: () => void
}






function ViewHtmlDialog({ openDialog, htmlCode, closeDialog }: ViewHtmlDialogProps) {
    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <div>
                            <h2>Html Code Template</h2>
                        </div>
                        <CopyIcon/>


                    </DialogTitle>
                    <DialogDescription asChild>
                        <div className='max-h-[400px] overflow-auto bg-gray-200 rounded-lg p-5'>
                            <pre className='whitespace-pre-wrap break-all'>
                                <code>
                                    {htmlCode}
                                </code>
                            </pre>
                        </div>
                   

                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default ViewHtmlDialog
