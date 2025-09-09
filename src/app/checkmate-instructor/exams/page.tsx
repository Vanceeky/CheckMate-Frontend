"use client";
import React from 'react'


import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

import { CheckCircle, Edit, FileText, PencilLine, Hash, Filter, Search } from 'lucide-react'

import CardSummary from '../CardSummary'
import SummaryBreakdown from '../SummaryBreakdown'
import AnswersCard from './AnswersCard'

import dummyAnswerKeys from '@/data/answerKeys'

const Exams = () => {
  return (
    <div className="p-4 lg:p-6 grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-9">
            <div className="p-4">
                {/* Institution name */}
                <span className="text-2xl font-semibold text-foreground">
                Exam Answer Keys
                </span>

                {/* Address */}
                <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <Edit className="mr-2 h-4 w-4 mt-0.5" />
                <p className='text-lg'>Create and manage answer keys for your exams</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    
                <CardSummary title="Total Answer Keys" value={120} icon={FileText} />
                <CardSummary title="Published" value={120} icon={CheckCircle} color="text-green-500" />
                <CardSummary title="Draft" value={120} icon={PencilLine} color="text-orange-500" />
                <CardSummary title="Total Questions" value={120} icon={Hash} color="text-purple-500" />

            </div>



            {/* Search Filter */}       
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">

                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                    placeholder="Search Subject"
                    className="bg-transparent pl-10 w-full"
                    />
                </div>

            {/* Filters */}
                <div className="flex flex-row sm:flex-row items-center gap-2 w-full sm:w-auto">
                    <Filter className="h-5 w-5 text-muted-foreground hidden sm:block" />

                    <Select>
                
                    <SelectTrigger className="w-full sm:w-[190px]">
                        <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="prelim">Prelim</SelectItem>
                        <SelectItem value="midterm">Midterm</SelectItem>
                        <SelectItem value="semifinals">Semi-finals</SelectItem>
                        <SelectItem value="finals">Finals</SelectItem>
                        <SelectItem value="summer">Summer Class</SelectItem>
                    </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full sm:w-[140px]">
                            <SelectValue placeholder="Filter by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Published</SelectItem>
                            <SelectItem value="inactive">Draft</SelectItem>
                        </SelectContent>
                    </Select>



                </div>



        



            </div>



            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-4">
                
                {dummyAnswerKeys.map((key) => (
                    <AnswersCard
                    key={key.id}
                    answerKey={key}
                    onView={(data) => alert(`View: ${data.title}`)}
                    onDuplicate={(data) => alert(`Duplicate: ${data.title}`)}
                    onEdit={(data) => alert(`Edit: ${data.title}`)}
                    />
                ))}

            </div>






        </div>



        <div className="lg:col-span-3">

            <SummaryBreakdown/>

        </div>
    </div>
  )
}

export default Exams