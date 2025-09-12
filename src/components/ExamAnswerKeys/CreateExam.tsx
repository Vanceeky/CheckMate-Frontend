"use client";

import React, {useState} from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { CheckCircle, CircleCheck, FileText, Hash, Info, List, Plus, HelpCircle, Trash2, BookOpen, Target } from 'lucide-react'
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input';

import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CardSummary from '@/app/checkmate-instructor/CardSummary';


interface ExamDetails {
    subject: string,
    schoolYear: string,
    semester: string,
    examType: 'Prelim' | 'Midterm' | 'Semi-Finals' | 'Finals' | 'Summer Class';  

}
interface ExamPart {
    id: string,
    type: 'Identification' | 'Multiple Choice' | 'True/False' | 'Enumeration',
    questions: {
        id: string,
        number: string,
        points: number,
        answer: string
    }[];
}

const examPartIcons = {
  'Identification': Hash,
  'Enumeration': List,
  'Multiple Choice': HelpCircle,
  'True/False': CheckCircle,
};
const CreateExam = () => {

    const [step, setStep] = useState(1)
    const [open, setOpen] = useState(false)

    const [examDetails, setExamDetails] = useState<ExamDetails>({
        subject: '',
        schoolYear: '',
        semester: '',
        examType: 'Prelim',
    });


    const [examParts, setExamParts] = useState<ExamPart[]>([]);

    const totalQuestions = examParts.reduce((sum, part) => sum + part.questions.length, 0);
    const totalPoints = examParts.reduce((sum, part) => 
      sum + part.questions.reduce((partSum, question) => partSum + question.points, 0), 0
    );

    const addExamPart = (type: ExamPart['type']) => {
    setExamParts((prev) => {
        // prevent duplicates
        if (prev.some((part) => part.type === type)) {
        return prev;
        }
        const newPart: ExamPart = {
        id: `part${Date.now()}`,
        type,
        questions: [],
        };
        return [...prev, newPart];
    });
    };


    const removeExamPart = (partId: string) => {
        setExamParts(prev => prev.filter(part => part.id !== partId));
    };

    const addQuestion = (partId: string) => {
        setExamParts(prev => prev.map(part => {
        if (part.id === partId) {
            const questionNumber = part.questions.length + 1;
            const newQuestion = {
            id: `q${Date.now()}`,
            number: `Q${questionNumber}`,
            points: 1,
            answer: '',
            };
            return { ...part, questions: [...part.questions, newQuestion] };
        }
        return part;
        }));
    };

      const updateQuestion = (partId: string, questionId: string, field: string, value: any) => {
        setExamParts(prev => prev.map(part => {
        if (part.id === partId) {
            return {
            ...part,
            questions: part.questions.map(question => 
                question.id === questionId 
                ? { ...question, [field]: value }
                : question
            ),
            };
        }
        return part;
        }));
    };

    const removeQuestion = (partId: string, questionId: string) => {
        setExamParts(prev => prev.map(part => {
        if (part.id === partId) {
            const updatedQuestions = part.questions.filter(q => q.id !== questionId);
            // Renumber questions
            const renumberedQuestions = updatedQuestions.map((q, index) => ({
            ...q,
            number: `Q${index + 1}`,
            }));
            return { ...part, questions: renumberedQuestions };
        }
        return part;
        }));
    };

const handleSave = () => {
  const payload = {
    ...examDetails,
    parts: examParts.map((part) => ({
      id: part.id,
      type: part.type,
      questions: part.questions.map((q) => ({
        id: q.id,
        number: q.number,
        points: q.points,
        answer: q.answer,
      })),
    })),
  };

  console.log("Exam Payload:", payload);

  // here you can send it to your API
  // await saveExam(payload)


    // ✅ Clear input fields
    setExamDetails({
        subject: "",
        schoolYear: "",
        semester: "",
        examType: "Prelim", // reset to default or ""
    });

    setExamParts([]); // remove all exam sections
    setStep(1);
};

  return (
    <div>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className='p-5 bg-black cursor-pointer hover:text-white hover:bg-primary text-white rounded-3xl'><Plus className="h-4 w-4" />Create Answer Key</Button>
            </DialogTrigger>

            <DialogContent className='w-full max-w-5xl' style={{maxWidth: "40vw"}}>
                <DialogHeader>
                    <DialogTitle>Create New Exam Answer Keys</DialogTitle>
                    <DialogDescription>
                        Follow the steps to set up your new Exam Answer Keys.
                    </DialogDescription>
                </DialogHeader>



                <div className="flex gap-6">
                    {/* Sidebar */}
                    <div className="w-35 border-r pr-4 text-sm font-medium space-y-2">
                        <div className={`flex items-center gap-2 ${step === 1 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                            <Info className="h-4 w-4" />
                            Basic Info
                        </div>

                        <div className={`flex items-center gap-2 ${step === 2 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                            <Hash className="h-4 w-4" />
                            Answer Keys
                        </div>

                        <div className={`flex items-center gap-2 ${step === 3 ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                            <CheckCircle className="h-4 w-4" />
                            Review & Save
                        </div>
                    </div>


                    {/* Content */}
                    <div className="flex-1">
                        {step === 1 && 
                            <div>
                                <div className='mb-2'>
                                    <span className='text-lg font-medium'>Exam Details</span>
                                    <p className='text-sm text-muted-foreground'>Set up basic information about your exam.</p>
                                </div>

                                <Separator/>

                                <div className="grid grid-cols-12 gap-4 mt-4 w-full">
                                    {/* Exam Type */}
                                    <div className="col-span-6 w-full">
                                        <Label className="text-sm mb-1">Exam Type</Label>
                                        <Select 
                                        value={examDetails.examType}
                                        onValueChange={(value: 'Prelim' | 'Midterm' | 'Semi-Finals' | 'Finals' | 'Summer Class') => {
                                        setExamDetails({ ...examDetails, examType: value });
                                        }}
                                        >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Please Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Prelim">Prelim</SelectItem>
                                            <SelectItem value="Midterm">Midterm</SelectItem>
                                            <SelectItem value="Semi-finals">Semifinals</SelectItem>
                                            <SelectItem value="Finals">Finals</SelectItem>
                                            <SelectItem value="Summer Class">Summer Class</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>

                                    {/* Semester */}
                                    <div className="col-span-6 w-full">
                                        <Label className="text-sm mb-1">Semester</Label>
                                        <Select value={examDetails.semester} onValueChange={(value: '1st Semester' | '2nd Semester' | 'Summer Class') => setExamDetails({ ...examDetails, semester: value })}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Please Select" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1st Semester">1st Semester</SelectItem>
                                            <SelectItem value="2nd Semester">2nd Semester</SelectItem>
                                            <SelectItem value="Summer Class">Summer Class</SelectItem>
                                        </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="col-span-8 w-full">
                                        <Label className='text-sm mb-1'>Subject</Label>
                                        <Input
                                            id="subject"
                                            placeholder="e.g., Mathematics, Computer Science"
                                            value={examDetails.subject}
                                            onChange={(e) => setExamDetails(prev => ({ ...prev, subject: e.target.value }))}
                                        />
                                    </div>

                                    <div className="col-span-4 w-full">
                                        <Label className='text-sm mb-1'>School Year</Label>
                                        <Input
                                            id="schoolYear"
                                            placeholder="e.g., 2025-2026"
                                            value={examDetails.schoolYear}
                                            onChange={(e) => setExamDetails(prev => ({ ...prev, schoolYear: e.target.value }))}
                                        />
                                    </div>
                                </div>


                            </div>


                        }


                        {step === 2 &&

                            <div>
                                <div className='mb-2'>
                                    <span className='text-lg font-medium'>Add Exam Selection</span>
                                    <p className='text-sm text-muted-foreground'>Create Different Sections for your exam.</p>
                                </div>

                                <Separator/>

                                <div className='mt-2' style={{maxHeight: "40vh", overflowY: "scroll"}}>
                                    <div>
                                        <div className="flex gap-2">
                                        {(['Identification', 'Enumeration', 'Multiple Choice', 'True/False'] as const).map((type) => {
                                            const Icon = examPartIcons[type];
                                            const exists = examParts.some((part) => part.type === type);

                                            return (
                                            <Button
                                                key={type}
                                                variant="outline"
                                                onClick={() => addExamPart(type)}
                                                className="gap-2 hover:bg-gray-200 cursor-pointer"
                                                disabled={exists} // disable if already added
                                            >
                                                <Icon className="w-4 h-4" />
                                                {type}
                                            </Button>
                                            );
                                        })}
                                        </div>

                                    </div>

                                    <div>
                                        {examParts.map((part) => {
                                            const Icon = examPartIcons[part.type];

                                            return (

                                                <Card key={part.id} className='border-1 bg-transparent mt-2 '>

                                                    <CardHeader className=''>
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-3">

                                                                <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                                                    <Icon className="w-4 h-4 text-primary" />

                                                                </div>

                                                                <CardTitle className='text-lg'>
                                                                    {part.type}
                                                                </CardTitle>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {part.questions.length} question{part.questions.length === 1 ? "" : "s"}
                                                                </p>


                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <Button variant="outline" onClick={() => addQuestion(part.id)} size="sm" className="gap-2 hover:bg-gray-200 cursor-pointer" >
                                                                    <Plus className="w-4 h-4" />
                                                                    Add Question
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" onClick={() => removeExamPart(part.id)} className="text-destructive hover:text-destructive hover:bg-red-200 cursor-pointer">
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>

                                                    </CardHeader>

                                                    <CardContent>
                                                        <div className="p-0">
                                                        {part.questions.map((question) => (
                                                            <div key={question.id} className="p-2 border rounded-lg bg-muted/30">
                                                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                                                    <div className="ml-5 md:col-span-2">
                                                                        <Badge variant="secondary" className="font-mono text-lg text-white">
                                                                            {question.number}
                                                                        </Badge>
                                                                    </div>


                                                                    <div className="md:col-span-7">
                                                                        <Label className="text-sm text-muted-foreground">Correct Answer</Label>
                                                                        {part.type === 'True/False' ? (
                                                                            <Select
                                                                            value={question.answer}
                                                                            onValueChange={(value) => updateQuestion(part.id, question.id, 'answer', value)}
                                                                            >
                                                                            <SelectTrigger className="mt-1">
                                                                                <SelectValue placeholder="Select answer" />
                                                                            </SelectTrigger>
                                                                            <SelectContent>
                                                                                <SelectItem value="True">True</SelectItem>
                                                                                <SelectItem value="False">False</SelectItem>
                                                                            </SelectContent>
                                                                            </Select>
                                                                        ) : (
                                                                            <Input
                                                                            placeholder="Enter the correct answer"
                                                                            value={question.answer}
                                                                            onChange={(e) => updateQuestion(part.id, question.id, 'answer', e.target.value)}
                                                                            className="mt-1"
                                                                            required
                                                                            />
                                                                        )}
                                                                    </div>

                                                                    <div className="md:col-span-2">
                                                                        <Label className="text-sm text-muted-foreground">Points</Label>
                                                                            <Input
                                                                            type="number"
                                                                            min="1"
                                                                            step="1"
                                                                            value={question.points}
                                                                            onChange={(e) =>
                                                                                updateQuestion(part.id, question.id, "points", Number(e.target.value))
                                                                            }
                                                                            className="mt-1"
                                                                            />

                                                                    </div>


                                                                        <div className="md:col-span-1 flex justify-end">
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() => removeQuestion(part.id, question.id)}
                                                                                className="text-destructive hover:text-destructive"
                                                                            >
                                                                                <Trash2 className="w-4 h-4" />
                                                                            </Button>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        {part.questions.length === 0 && (
                                                            <div className="text-center py-8 text-muted-foreground">
                                                            <Icon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                                            <p>No questions added yet</p>
                                                            <p className="text-sm">Click "Add Question" to get started</p>
                                                            </div>
                                                        )}
                                                        </div>
                                                    </CardContent>

                                                </Card>
                                            )
                                        })}

                                        {examParts.length === 0 && (
                                            <div className=' p-8 mt-4 flex flex-col items-center'>
                                                <FileText className="h-15 w-15 text-muted-foreground" />
                                                <p className='text-md font-medium text-muted-foreground p-2'>No exam sections added yet</p>
                                                <span className='text-sm text-muted-foreground'>Choose an exam type above to get started</span>
                                            </div>
                                        )}

                                    </div>


                                </div>


                            </div>

                        }



                        {step === 3 && 

                        <div  style={{maxHeight: "40vh", overflowY: "scroll"}}>
                            <div className='mb-2'>
                                <span className='text-lg font-medium'>Review & Save</span>
                                <p className='text-sm text-muted-foreground'>Verify your exam details and answer keys before saving.</p>
                            </div>

                            <Separator/>

                            <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <CardSummary title="Sections" value={examParts.length} icon={List} color="text-blue-500" />
                                <CardSummary title="Questions" value={totalQuestions} icon={Hash} color="text-green-500" />
                                <CardSummary title="Total Points" value={totalPoints} icon={Target} color="text-purple-500" />



                            </div>

                            <Card className='mt-4 bg-transparent'>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                        <span className="text-muted-foreground">Exam Detail •</span>
                                        <span className="font-medium text-foreground">
                                            {examDetails.subject}
                                        </span>
                                    </CardTitle>

                                </CardHeader>

                                <CardContent>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        <div>
                                        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                                            School Year
                                        </Label>
                                        <p className="text-sm font-medium text-foreground mt-1">{examDetails.schoolYear}</p>
                                        </div>

                                        <div>
                                        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                                            Exam Type
                                        </Label>
                                        <p className="text-sm font-medium text-foreground mt-1">{examDetails.examType}</p>
                                        </div>

                                        <div>
                                        <Label className="text-xs uppercase tracking-wide text-muted-foreground">
                                            Semester
                                        </Label>
                                        <p className="text-sm font-medium text-foreground mt-1">{examDetails.semester}</p>
                                        </div>
                                    </div>
                                </CardContent>

                            </Card>

                            {/* Answer Key Preview */}
                            <div className="space-y-4">
                            {examParts.map((part) => {
                                const Icon = examPartIcons[part.type];
                                const partPoints = part.questions.reduce((sum, q) => sum + q.points, 0);
                                
                                return (
                                <Card key={part.id} className='bg-transparent mt-4'>
                                    <CardHeader>
                                        <CardTitle className="flex justify-between items-center gap-3">
                                            <div className='flex items-center gap-2'>
                                                <Icon className="w-5 h-5" />
                                                {part.type}
                                            </div>

                                            <Badge variant="secondary" className='text-white'>{part.questions.length} questions • {partPoints} points</Badge>
                                        </CardTitle>
                                    </CardHeader>
                                    
                                    <CardContent>
                                    <div className="">

                                        {part.questions.map((question) => (
                                            
                                        <div key={question.id} className="flex items-start gap-4 p-3 bg-muted/30 rounded-lg">
                                            
                                            <Badge variant="outline" className="font-mono">
                                            {question.number}
                                            </Badge>
                                            <div className="flex-1">
                                            <div className="flex items-center gap-4 mb-2">
                                                <span className="text-sm text-muted-foreground">Points: {question.points}</span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-muted-foreground">Answer: </span>
                                                <span className="font-medium">{question.answer}</span>
                                            </div>
                                            
                                            </div>
                                        </div>
                                        ))}
                                    </div>
                                    </CardContent>
                                </Card>
                                );
                            })}
                            </div>

                        </div>

                        
                        }
                    </div>
                </div>

                <Separator/>

                <div className="flex justify-between pt-4">
                {/* Back / Cancel button */}
                <Button
                    variant="outline" 
                    className='hover:bg-orange-500 hover:text-white cursor-pointer'
                    onClick={() => (step === 1 ? setOpen(false) : setStep(step - 1))}
                >
                    {step === 1 ? "Cancel" : "Back"}
                </Button>

                {/* Next / Save button */}
                <Button
                    className=' text-white cursor-pointer'
                    onClick={() => {
                    if (step < 3) {
                        setStep(step + 1) // go to next step
                    } else {
                        handleSave()
                        setOpen(false) // final action (close/save)
                       
                    }
                    }}
                >
                    {step < 3 ? "Next" : "Save Answer Keys"}

                </Button>
                </div>


            </DialogContent>
        </Dialog>
    </div>

  )
}

export default CreateExam