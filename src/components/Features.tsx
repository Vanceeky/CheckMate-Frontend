import React from "react"
import { BackgroundRippleEffect } from "./ui/background-ripple-effect"

interface Feature {
  icon: string
  title: string
  description: string
  link: string
}

const features: Feature[] = [
  {
    icon: "/qr-code.png",
    title: "Scan Exams Instantly",
    link: "https://www.flaticon.com/free-icons/qr-code",
    description: "Scan student answer sheets quickly and accurately using CheckMate.",
  },
  {
    icon: "/execution.png",
    title: "Automated Checking",
    link: "https://www.flaticon.com/free-icons/automatic",
    description: "Compare scanned answers against the teacher's answer key automatically.",
  },
  {
    icon: "/log.png",
    title: "Generate Records",
    link: "https://www.flaticon.com/free-icons/log",
    description: "Automatically create student performance records for easy tracking.",
  },
  {
    icon: "/cloud-storage.png",
    title: "Export Results",
    link: "https://www.flaticon.com/free-icons/import",
    description: "Download results anytime for offline access or reporting.",
  },
  {
    icon: "/cloud-access.png",
    title: "Offline Access",
    link: "https://www.flaticon.com/free-icons/cloud-access",
    description: "Access previously scanned exam records even without an internet connection.",
  },
  {
    icon: "/website-error.png",
    title: "Error Reduction",
    link: "https://www.flaticon.com/free-icons/wesbite",
    description: "Reduce human error with automated evaluation and validation.",
  },
]

const FeaturesSection = () => {
  return (
    <div className="mt-12 p-5 relative flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">

        <BackgroundRippleEffect/>

      {/* Header */}
      <div className="text-center mb-12 max-w-4xl mx-auto z-1000">
        <h2 className="text-3xl md:text-4xl font-bold">
          Everything you need to evaluate exams with speed and accuracy
        </h2>
        <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
          CheckMate takes the hassle out of exam checking by scanning answer sheets, recording student responses, and instantly comparing them against teacher-provided keys.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-1000">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-3 p-4">
            <a href={feature.link}>
                <img src={feature.icon} alt={feature.title} className="h-12 w-12 object-contain" />
            </a>
            <h3 className="font-semibold text-lg">{feature.title}</h3>
            <p className="text-muted-foreground text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="flex justify-center gap-4 mt-12">
        <button className="px-6 py-3 border border-black rounded-md hover:bg-black hover:text-white transition">
          Discover more features
        </button>
        <button className="px-6 py-3 bg-black text-white rounded-md hover:opacity-90 transition">
          See video
        </button>
      </div>
    </div>
  )
}

export default FeaturesSection
