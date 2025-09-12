import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            CheckMate
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-2xl shadow-md">
        {/* Small Image */}
        <img
          src="/minimal.svg"
          alt="Illustration"
          className="h-120 w-120 object-contain"
        />

        {/* Header */}
        <h2 className="text-2xl font-bold">Welcome to CheckMate</h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-md">
          CheckMate is a smart exam evaluation system that scans answer sheets, 
          records student responses, and automatically checks them with precision.
        </p>
      </div>

    </div>
  )
}
