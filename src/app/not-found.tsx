"use client"; // ✅ Important: This makes it a Client Component

import React from "react";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PageNotFound = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-4">
      <AlertCircle className="w-16 h-16 text-red-500 mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-center text-gray-600 mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Button
        onClick={() => router.push("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default PageNotFound;
