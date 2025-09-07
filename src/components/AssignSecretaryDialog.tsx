import React from 'react'

import { Button } from '@/components/ui/button'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { User } from '@/types/user'


interface AssignSecretaryDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  assignedUser?: User;
  availableUsers?: User[];
  allowedRoles?: string[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AssignSecretaryDialog = ({
  trigger, 
  title, 
  description,
  open,
  onOpenChange

}: AssignSecretaryDialogProps) => {

    const [isDialogOpen, setIsDialogOpen] = React.useState(false)

    const dialogOpen =open  !== undefined ? open : isDialogOpen;
    const setDialogOpen = onOpenChange || setIsDialogOpen

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => {
      setDialogOpen(open);
    }}>
        <DialogTrigger asChild>
            {trigger}
        </DialogTrigger>

        <DialogContent className='sm:max-w-md'>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </DialogHeader>

            <div className="space-y-6">

            </div>

        </DialogContent>


    </Dialog>
  )
}

export default AssignSecretaryDialog