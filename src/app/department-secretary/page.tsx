"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, FileText, PencilLine, Hash, Search, LogOut, User, MapPin, Users, Eye, Upload, UserPlus  } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import CardSummary from "../checkmate-instructor/CardSummary";
import { Separator } from "@/components/ui/separator";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { DialogTrigger } from "@/components/ui/dialog";
import UploadBulkStudent from "@/components/UploadBulkStudent";

const Secretary = () => {


  const handleSave = (students: any[]) => {
    console.log("Saving students:", students);

    // Example: send to backend API
    fetch("/api/students/bulk-import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(students),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Saved successfully:", data);
      })
      .catch((err) => console.error("Error saving:", err));
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-6 py-4 max-w-7xl">
          {/* Institution section with logo + name + address */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f9/L-NU_LOGO.png"
              alt="Lyceum Logo"
              className="h-12 w-12 object-contain"
            />

            {/* Institution details */}
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Lyceum-Northwestern University
              </h2>

              {/* Address */}
              <div className="mt-1 flex items-start text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 mt-0.5" />
                <p>123 Education Street, Springfield, IL 62701</p>
              </div>
            </div>
          </div>


          {/* User Section */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.png" alt="Maria Rodriguez" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800">Maria Rodriguez</p>
                  <p className="text-xs text-gray-500">Department Secretary</p>
                </div>
              </button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-48 p-2">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2 text-red-600 hover:text-red-700">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto p-6 max-w-7xl">
        <div>
          <h2 className="text-2xl font-semibold">Course Management</h2>
          <p className="text-muted-foreground">Manage courses under CICS</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">

            <CardSummary title="Number of Courses" value={120} icon={FileText} />
            <CardSummary title="Total Students" value={120} icon={CheckCircle} color="text-green-500" />
            <CardSummary title="Active Year Levels" value={120} icon={PencilLine} color="text-orange-500" />
            <CardSummary title="Current Semester" value={120} icon={Hash} color="text-purple-500" />

        </div>


        <div className="flex-1 relative mt-4 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
            placeholder="Search Course by name or code"
            className="bg-transparent pl-10 w-full"
            />
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                    Bachelor of Science in Information Technology
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    
                  </p>
                </div>
              <Badge className="bg-gray-400 text-white">
                BSIT
              </Badge>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-500"/>
                  <div>
                      <p className="text-sm font-medium">300</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                </div>
              </div>

              <Separator className="my-3"/>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                  {/* View Details button (wider with text) */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>

                  {/* Upload (icon only with tooltip) */}

                  <UploadBulkStudent
                    trigger={

                              <Button
                                variant="outline"
                                size="sm"
                                className="p-0 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                              >
                                <Upload className="w-4 h-4" />
                                Upload 
                              </Button>

                    }
                    courseId="123"
                    courseName="Bachelor of Science in Information Technology"
                    onSave={handleSave}
                  />




                  {/* Add (icon only with tooltip) */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-9 h-9 p-0 flex items-center justify-center hover:bg-gray-200 cursor-pointer"
                        >
                          <UserPlus className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add Student</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </main>
  );
};

export default Secretary;


