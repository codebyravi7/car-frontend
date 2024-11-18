import React from "react";
import { Car } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Main Loading Container */}
      <div className="text-center p-8 rounded-lg">
        {/* Animated Car Icon */}
        <div className="relative">
          <Car
            className="w-16 h-16 text-blue-600 animate-bounce mx-auto mb-4"
            strokeWidth={1.5}
          />

          {/* Animated Lines beneath the car */}
          <div className="flex justify-center gap-1 mt-2">
            <div className="w-8 h-1 bg-blue-400 rounded-full animate-pulse" />
            <div
              className="w-8 h-1 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.075s" }}
            />
            <div
              className="w-8 h-1 bg-blue-600 rounded-full animate-pulse"
              style={{ animationDelay: "0.15s" }}
            />
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-semibold text-blue-900 mt-6 mb-2">
          Loading
        </h2>

        {/* Loading Message */}
        <p className="text-blue-600 text-sm animate-pulse">
          Please wait while we do the magic...
        </p>

        {/* Loading Progress Bar */}
        <div className="mt-8 w-64 h-1.5 bg-blue-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full animate-loading-progress" />
        </div>
      </div>

      <style>{`
        @keyframes loading-progress {
          0% {
            width: 0%;
            transform: translateX(-100%);
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
            transform: translateX(100%);
          }
        }
        .animate-loading-progress {
          animation: loading-progress 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
