"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useState } from "react";
import { login, getCurrentUser } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

    const { setUser } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await login({ username, password }); // sets cookies
    const currentUser = await getCurrentUser(); // fetch user info
    setUser(currentUser); // save globally
    setError("");

    // redirect based on role
    const BASE_PATHS = {
      SUPERADMIN: "/checkmate-super",
      INSTITUTION_HEAD: "/checkmate-institution",
      ADVISER: "/checkmate-teacher",
      STUDENT: "/checkmate-student",
      INSTRUCTOR: "/checkmate-instructor",
      SECRETARY: "/department-secretary",
    } as const;

    const redirectPath =
      BASE_PATHS[currentUser.role as keyof typeof BASE_PATHS] || "/";

    router.push(redirectPath);

  } catch {
    setError("Invalid credentials");
    toast.error("Invalid credentials");
  }
};



  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username and password below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="username" type="text" placeholder="johndoe" required         
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </div>
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
          <Input id="password" type="password" placeholder="••••••••••••" required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>


      </div>

    </form>
  )
}
