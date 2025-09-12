"use client";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  UploadCloud,
  FileText,
  X,
  Users,
  Info,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export interface Student {
  name: string;
  student_id: string;
  email: string;
  year_level: string;
  course_id?: string;  // FK for DB
  course?: string;     // readable course name
}

interface BulkUploadDialogProps {
  trigger: React.ReactNode;
  courseId: string;
  courseName: string;
  onSave: (students: Student[]) => void; // callback to parent for saving
}

export default function UploadBulkStudent({
  trigger,
  courseId,
  courseName,
  onSave,
}: BulkUploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 50;
  const totalPages = Math.ceil(students.length / rowsPerPage);
  const currentRows = students.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const downloadTemplate = () => {
    const csvContent =
      "Name,Student ID,Email,Year Level\n" +
      "John Doe,2024001,john.doe@email.com,1st Year\n" +
      "Jane Smith,2024002,jane.smith@email.com,2nd Year\n" +
      "Mike Johnson,2024003,mike.johnson@email.com,3rd Year";

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "student_upload_template.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFile = (file: File) => {
    setFileName(file.name);
    setLoading(true);
    setCurrentPage(1);

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) return;
      const data = new Uint8Array(e.target.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });

      const formatted: Student[] = rows.slice(1).map((row) => ({
        name: row[0] ?? "",
        student_id: row[1] ?? "",
        email: row[2] ?? "",
        year_level: row[3] ?? "",
        course_id: courseId,
        course: courseName,
      }));

      setStudents(formatted);
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveFile = () => {
    setStudents([]);
    setFileName("");
    setCurrentPage(1);
  };

  const handleSave = () => {
    if (students.length) {
      const withCourse = students.map((s) => ({
        ...s,
        course_id: courseId,
        course: courseName,
      }));
      onSave(withCourse); // send back to parent
      handleRemoveFile();
    }
  };

  return (
    <Dialog>

      {/* Page decides if it’s wrapped with DialogTrigger */}

      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>




      <DialogContent
        className="max-w-5xl max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "60vw" }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              Bulk Upload Students {" • "}
              <span className="text-muted-foreground">{courseName}</span>
            </div>

            {/* Popover for Instructions */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2 mr-4 px-2 py-1 text-gray-600 hover:text-blue-600 hover:bg-transparent cursor-pointer"
                >
                  <Info className="w-5 h-5" />
                  <span className="text-sm font-medium">Upload Instructions</span>
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-[28rem] space-y-3">
                {/* Instructions */}
                <div className="border-blue-400 bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">
                    Upload Instructions:
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upload a CSV or Excel file with student information</li>
                    <li>
                      • Required columns: Name, Student ID, Email, and Year Level
                    </li>
                    <li>• Each row represents one student</li>
                  </ul>
                </div>

                {/* Download Template */}
                <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                  <FileSpreadsheet className="w-6 h-6 text-green-600" />
                  <div className="text-sm">
                    <h4 className="font-medium">Download Template</h4>
                    <p className="text-xs text-muted-foreground">
                      Get a sample file with the correct format
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 hover:bg-gray-200 cursor-pointer"
                    onClick={downloadTemplate}
                  >
                    <Download className="w-4 h-4" />
                    Template
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Box */}
          {!fileName && (
            <Card
              className="p-6 flex items-center justify-center border-dashed border-2 border-gray-300 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Download className="w-10 h-10 text-blue-500 mr-2" />
              <span className="text-blue-500 font-medium text-center">
                Drop your file here, or click to browse
                <p className="text-sm text-muted-foreground mb-4 mt-2">
                  Supports CSV and Excel files up to 10MB
                </p>
              </span>

              <input
                type="file"
                accept=".xlsx, .xls"
                ref={fileInputRef}
                onChange={handleBrowse}
                className="hidden"
              />
            </Card>
          )}

          {/* File Preview */}
          {fileName && (
            <div className="flex items-center justify-between border px-4 py-2 rounded-md bg-white shadow-sm">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium">{fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {students.length} records found
                  </p>
                </div>
              </div>
              <button onClick={handleRemoveFile}>
                <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
              </button>
            </div>
          )}

          {/* Loading or Table */}
          {loading ? (
            <div className="flex items-center gap-2 text-blue-600 px-4 py-2">
              <svg
                className="animate-spin w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Reading Excel file...
            </div>
          ) : (
            students.length > 0 && (
              <>
                {/* Table */}
                <div className="overflow-auto max-h-[400px] border rounded-md">
                  <table className="min-w-full text-sm text-left border-collapse">
                    <thead className="sticky top-0 z-10 bg-gray-100 text-gray-700 shadow-sm">
                      <tr>
                        <th className="px-4 py-2 border-r w-12 text-center">#</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Student ID</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Year Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRows.map((s, i) => (
                        <tr key={i} className="border-t even:bg-gray-50">
                          <td className="px-4 py-2 text-center font-medium">
                            {(currentPage - 1) * rowsPerPage + i + 1}
                          </td>
                          <td className="px-4 py-2">{s.name}</td>
                          <td className="px-4 py-2">{s.student_id}</td>
                          <td className="px-4 py-2">{s.email}</td>
                          <td className="px-4 py-2">{s.year_level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-2 px-1 text-sm text-muted-foreground">
                  <div>
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * rowsPerPage + 1,
                      students.length
                    )}
                    –
                    {Math.min(currentPage * rowsPerPage, students.length)} of{" "}
                    {students.length}
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            )
          )}

          <Separator className="my-4 border-1" />

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" onClick={handleRemoveFile}>
              Cancel
            </Button>
            <div className="flex items-center gap-2">
              <Button disabled={!students.length} onClick={handleSave}>
                <Users className="w-4 h-4 mr-2" />
                Import {students.length} Voters
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
