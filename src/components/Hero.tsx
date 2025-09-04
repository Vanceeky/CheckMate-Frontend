import React from "react"

const Hero = () => {
  return (
    <div className="p-6">
      <div className="font-sans text-lg flex flex-col-reverse lg:flex-row items-center lg:justify-between gap-10">
        {/* Left Section (Text) */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <p className="font-sans text-3xl md:text-4xl">Smarter Exams,</p>
          <p className="font-mono text-4xl md:text-5xl mt-4">Faster Results</p>

          <p className="mt-5 text-base md:text-lg text-muted-foreground">
            CheckMate is your AI-powered exam assistant—designed to scan answer
            sheets, record answers, and evaluate them instantly. Bringing
            efficiency and accuracy to every classroom.
          </p>

          {/* Powered By Section */}
          <div className="mt-6">
            <p className="text-sm font-medium mb-3">Powered By:</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button className="bg-black text-sm text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md hover:opacity-90 transition cursor-pointer">
                <img
                  src="/open_cv.svg"
                  alt="OpenCV Logo"
                  className="h-6 w-6 object-contain"
                />
                OpenCV
              </button>

              <button className="bg-white border text-sm text-black px-4 py-2 rounded-md flex items-center gap-2 shadow-sm hover:bg-gray-50 transition cursor-pointer">
                <img
                  src="/google_cloud-icon.svg"
                  alt="Google Vision API Logo"
                  className="h-6 w-6 object-contain"
                />
                Cloud Vision API
              </button>
            </div>
          </div>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img
            src="/hero.png"
            alt="Illustration"
            className="max-h-[400px] w-auto object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
