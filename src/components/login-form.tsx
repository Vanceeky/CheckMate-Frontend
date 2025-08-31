"use client";

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogIn } from "lucide-react"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [role, setRole] = useState<"student" | "instructor" | null>(null)

  if (!role) {
    // Step 1: Ask the user role first
    return (
      <div className={cn("flex flex-col gap-6 items-center", className)}>
        <h1 className="text-2xl font-bold text-center">Who are you?</h1>
        <p className="text-muted-foreground text-sm text-center">
          Select your role to continue login.
        </p>

        <div className="flex gap-4 mt-4">
          <Button onClick={() => setRole("student")} className="px-6 cursor-pointer">
            I’m a Student
          </Button>
          <Button onClick={() => setRole("instructor")} variant="secondary" className="text-white px-6 cursor-pointer">
            I’m an Instructor
          </Button>
        </div>
      </div>
    )
  }

  // Step 2: Show the login form depending on role
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          Login as {role === "student" ? "Student" : "Instructor"}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your {role === "student" ? "Student ID" : "Instructor ID"} and password below
        </p>
      </div>

      <div className="grid gap-6">
        {/* User ID */}
        <div className="grid gap-3">
          <Label htmlFor="user_id">
            {role === "student" ? "Student ID" : "Instructor ID"}
          </Label>
          <Input
            id="user_id"
            type="text"
            placeholder={role === "student" ? "18-9398-54S" : "INST-1234"}
            required
          />
        </div>

        {/* Password */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full cursor-pointer">
          <LogIn/>
          Login as {role === "student" ? "Student" : "Instructor"}
        </Button>

        {/* Back Option */}
        <Button variant="link" type="button" onClick={() => setRole(null)} className="cursor-pointer">
          ← Back
        </Button>
      </div>
    </form>
  )
}
