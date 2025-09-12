"use client";

import React, { useEffect, useState } from 'react'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Button } from '@/components/ui/button'
import { Archive, ArrowLeft, BookOpen, Calendar, Download, Edit, FileText, Hash, Trash2, Users, MoreHorizontal, ListChecks, CheckSquare, CheckCircle, List, HelpCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { statusColors, termColors } from "@/helpers/badgeColors";

import { AnswerKey } from '@/types/AnswerKey'

const examPartIcons = {
  'Identification': Hash,
  'Enumeration': List,
  'Multiple Choice': HelpCircle,
  'True/False': CheckCircle,
  'Essay': FileText,
};



const ExamPreviewPage = () => {

  const [answerKey, setAnswerKey] = useState<AnswerKey | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("answerKey");
    if (stored) {
      setAnswerKey(JSON.parse(stored));
    }
  }, []);

  if (!answerKey) return <p>Loading...</p>;

  return (
    <main className='min-h-screen bg-background'>
        
        <div className="container mx-auto p-6 max-w-7xl">
            {/* Header */}

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 hover:bg-gray-200 cursor-pointer"
                    >
                    <ArrowLeft className="w-4 h-4" />
                        Back to Exams
                    </Button>
                    <div className="border-l h-8" />
                        <div>
                            <h1 className="text-2xl font-semibold">Answer Key Preview</h1>
                            <p className="text-muted-foreground">
                                {answerKey.subject} • {answerKey.semester} • {answerKey.schoolYear}
                            </p>
                        </div>
                    </div>

            <Badge className={statusColors[answerKey.status]}>
                {answerKey.status}
            </Badge>

            </div>



            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card className='bg-background'>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <BookOpen/>
                                Exam Details
                            </CardTitle>
                        </CardHeader>

                         <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm text-muted-foreground">Subject</label>
                                    <p className="font-medium">{answerKey.subject}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground">Exam Type</label>
                                    <p className="font-medium">{answerKey.examType}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground">School Year</label>
                                    <p className="font-medium">{answerKey.schoolYear}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground">Semester</label>
                                    <p className="font-medium">{answerKey.semester}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-muted-foreground">Created</label>
                                    <p className="font-medium">{answerKey.createdDate}</p>
                                </div>
                            </div>
                        </CardContent>

                    </Card>

                    {/* Exam Parts */}
                    <div className="space-y-4">
                    <h2 className="text-xl font-semibold">Answer Key Breakdown</h2>
                        {answerKey.parts.map((part) => {
                        const Icon = examPartIcons[part.type];
                        const partPoints = part.questions.reduce((sum, q) => sum + q.points, 0);

                        return (
                            <Card key={part.id} className="border-l-4 border-l-primary bg-background">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                                        <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <span>{part.type}</span>
                                            <Badge variant="secondary" className="font-mono text-white">
                                            {part.questions.length} questions • {partPoints} points
                                            </Badge>
                                        </div>
                                        </div>
                                    </CardTitle>
                                </CardHeader>

                                <CardContent>
                                <div className="space-y-3">
                                    {part.questions.map((question) => (
                                    <div key={question.id} className="p-4 bg-muted/30 rounded-lg">
                                        <div className="flex items-start gap-4">
                                        <Badge variant="outline" className="font-mono mt-1">
                                            {question.number}
                                        </Badge>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-4">
                                            <span className="text-sm text-muted-foreground">
                                                Points: <span className="font-medium text-foreground">{question.points}</span>
                                            </span>
                                            </div>
                                            
                                            <div>
                                            <span className="text-sm text-muted-foreground">Correct Answer: </span>
                                            <span className="font-medium">{question.answer}</span>
                                            </div>
                                            

                                            
                                        </div>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                                </CardContent>
                            </Card>
                        )
                        })}


                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Actions */}
                    <Card className="bg-background">
                        <CardHeader>
                            <CardTitle className="text-lg">Actions</CardTitle>
                        </CardHeader>

                        <CardContent>
                            <div className="flex gap-2">
                            {/* Main Call-to-Action */}
                            <Button className="flex-1 gap-2 cursor-pointer">
                                <Edit className="w-4 h-4" />
                                Edit Answer Key
                            </Button>

                            {/* Dropdown for other actions */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button
                                    variant="link"
                                    className="gap-2 border-none hover:text-primary hover:no-underline cursor-pointer text-gray-400 hover:font-semibold"
                                >
                                    <MoreHorizontal className="w-4 h-4" />
                                    More
                                </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent className="w-auto">
                                    <DropdownMenuItem
                                        className="cursor-pointer data-[highlighted]:bg-gray-200 data-[highlighted]:text-black hover:font-semibold"
                                    >
                                        <Download className="w-4 h-4 mr-2" />
                                        Export PDF
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="cursor-pointer data-[highlighted]:bg-gray-200 data-[highlighted]:text-black hover:font-semibold"
                                    >
                                        <Archive className="w-4 h-4 mr-2" />
                                        Archive
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                        className="cursor-pointer text-red-600 data-[highlighted]:bg-red-500 data-[highlighted]:text-white hover:font-semibold"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2 hover:text-white" />
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>

                            </DropdownMenu>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats */}
                    <Card className='bg-background'>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <span className="text-sm">Total Sections</span>
                            </div>
                            <span className="font-semibold">{answerKey.parts.length}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Hash className="w-4 h-4 text-green-600" />
                                <span className="text-sm">Total Questions</span>
                            </div>
                            <span className="font-semibold">{answerKey.parts.reduce((acc, part) => acc + part.questions.length, 0)}</span>
                            </div>
                            
                            <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-purple-600" />
                                <span className="text-sm">Total Points</span>
                            </div>
                            <span className="font-semibold">{answerKey.parts.reduce((acc, part) => acc + part.questions.reduce((acc, question) => acc + question.points, 0), 0)}</span>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-600" />
                                <span className="text-sm">Last Modified</span>
                            </div>
                            <span className="text-sm">{answerKey.lastModified}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Section Breakdown */}
                    <Card className='bg-background'>
                        <CardHeader>
                            <CardTitle className="text-lg">Section Breakdown</CardTitle>
                        </CardHeader>
                       <CardContent className="space-y-3">
                            {answerKey.parts.map((part) => {
                            const Icon = examPartIcons[part.type];
                            const partPoints = part.questions.reduce((sum, q) => sum + q.points, 0);
                            
                            return (
                                <div key={part.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Icon className="w-4 h-4 text-primary" />
                                    <div>
                                    <div className="font-medium text-sm">{part.type}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {part.questions.length} questions
                                    </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-sm">{partPoints}</div>
                                    <div className="text-xs text-muted-foreground">points</div>
                                </div>
                                </div>
                            );
                            })}
                        </CardContent>
                    </Card>


                </div>


            </div>


        </div>





    </main>
  )
}

export default ExamPreviewPage