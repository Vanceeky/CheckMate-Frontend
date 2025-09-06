"use client";

import React, {useState, useEffect} from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Plus, Save } from 'lucide-react'
import { CreateInstituteProps } from '@/types/institute';

import { toast } from "sonner";
import { set } from 'zod';




const AddInstitution = () => {

    const [isLoading, setIsLoading] = useState(false)
    // Validation states
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const [canSave, setCanSave] = useState(false);

    // form states

    const [institutionName, setInstitutionName] = useState('')
    const [institutionType, setInstitutionType] = useState('')
    const [email, setEmail] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [institutionDescription, setInstitutionDescription] = useState('')
    const [institutionAddress, setInstitutionAddress] = useState('')

    
    useEffect(() => {
        const requiredFields =
        institutionName.trim() != "" &&
        institutionType.trim() != "" &&
        email.trim() != "" &&
        contactNumber.trim() != "";

        setCanSave(requiredFields);
    }, [
        institutionName,
        institutionType,
        email,
        contactNumber,
    ]);

    const handleSave = async () => {
        const newErrors: { [key: string]: boolean } = {};
        if(!institutionName.trim()) newErrors.institutionName = true;
        if(!institutionType.trim()) newErrors.institutionType = true;
        if(!email.trim()) newErrors.email = true;
        if(!contactNumber.trim()) newErrors.contactNumber = true;
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const newInstitute: CreateInstituteProps = {
            institutionName,
            email,
            type: institutionType as CreateInstituteProps['type'],
            contactNumber,
            address: institutionAddress,
            description: institutionDescription
        };

        setIsLoading(true);


        try {

                await new Promise((resolve) => setTimeout(resolve, 1000));

            // save to database
        console.log(newInstitute);

        toast.success(
            <div className="flex flex-col gap-1">
            <span className="font-semibold text-md">{institutionName} saved successfully</span>
            <span className="text-sm text-gray-500">Login credentials will be sent to {email}</span>
            </div>,
            { duration: 4000 }
        );

        setInstitutionName('');
        setInstitutionType('');
        setEmail('');
        setContactNumber('');
        setInstitutionAddress('');
        setInstitutionDescription('');
        setErrors({});


        } catch (error) {
            console.log(error);
              toast.error("Failed to save application. Please try again.");
        } finally {
            setIsLoading(false);
        }

    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button className='cursor-pointer'><Plus className='mr-2'/> Add Institution</Button>
        </DialogTrigger>

        <DialogContent className="" style={{maxWidth: '500px'}}>

          <DialogHeader>
            <DialogTitle>Create New Institution</DialogTitle>
            <DialogDescription>
                <span className='text-muted-foreground text-xs'>Add a new educational institution to the system. Login credentials will be automatically generated.</span>
            </DialogDescription>
          </DialogHeader>


            <div className='grid grid-cols-4 gap-4'>
                <div className='col-span-2'>
                <Label className='text-sm my-2'>Institution Name *</Label>
                <Input className='bg-transparent' placeholder='Institution Name' value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} />
                </div>

                <div className='col-span-2'>
                    <Label className='text-xs my-2'>Type *</Label>
                    <Select onValueChange={setInstitutionType} defaultValue=''>
                        <SelectTrigger className='bg-transparent  w-full'>
                            <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent className='w-full'>
                            <SelectItem value="university">University</SelectItem>
                            <SelectItem value="college">College</SelectItem>
                            <SelectItem value="school">School</SelectItem>
                            <SelectItem value="academy">Academy</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className='col-span-4'>
                    <Label className=' text-xs my-2'>Address</Label>
                    <Textarea className='' placeholder='123 Education Street, Academy City, AC 12345' value={institutionAddress} onChange={(e) => setInstitutionAddress(e.target.value)}/>
                </div>

                <div className="col-span-2">
                    <Label className='text-xs my-2'>Email *</Label>
                    <Input className='bg-transparent' placeholder='admin@institution.edu' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="col-span-2">
                    <Label className='text-xs my-2'>Contact Number</Label>
                    <Input className='bg-transparent' placeholder='09123456789' value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
                </div>

                <div className='col-span-4'>
                    <Label className=' text-xs my-2'>Description</Label>
                    <Textarea className='' placeholder='Brief description of the institution' value={institutionDescription} onChange={(e) => setInstitutionDescription(e.target.value)}/>
                </div>



            </div>


            <DialogFooter>
                <Button variant="destructive" className='bg-red-400 hover:bg-red-600 cursor-pointer'>Cancel</Button>
                <Button onClick={handleSave} disabled={!canSave || isLoading} className='bg-primary cursor-pointer'>
                    {isLoading ? (
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                    ): (
                <Save className="mr-2 h-4 w-4" />
                    )}
                        Create Institution
                    
                    </Button>
            </DialogFooter>
        </DialogContent>



    </Dialog>
  )
}

export default AddInstitution