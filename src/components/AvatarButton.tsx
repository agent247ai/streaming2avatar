import React, { useState, useEffect } from "react";
import { ArrowRight, X, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface AvatarButtonProps {
  className?: string;
}

const AvatarButton: React.FC<AvatarButtonProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle modal open
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsLoading(true);
    
    // Simulate avatar loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsLoading(false);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Avatar Launch Button */}
      <button
        onClick={handleOpenModal}
        className={cn(
          "group relative inline-flex items-center justify-center",
          "px-6 py-3 rounded-2xl font-medium text-white",
          "bg-gradient-to-r from-blue-600 to-blue-700",
          "hover:from-blue-700 hover:to-blue-800",
          "active:from-blue-800 active:to-blue-900",
          "shadow-lg hover:shadow-xl",
          "transition-all duration-200 ease-out",
          "transform hover:scale-105 active:scale-95",
          "border border-blue-500/20",
          className
        )}
      >
        <Play className="mr-2 w-4 h-4 transition-transform group-hover:scale-110" />
        Launch Avatar
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">AI Avatar Interface</h2>
                <p className="text-gray-600 mt-1">Experience real-time AI interaction</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            
            {/* Avatar Content Area */}
            <div className="relative h-96 bg-gradient-to-br from-gray-50 to-gray-100">
              {isLoading ? (
                // Loading State
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading Avatar...</p>
                    <p className="text-gray-500 text-sm mt-1">Initializing AI interface</p>
                  </div>
                </div>
              ) : (
                // Avatar Interface (Placeholder)
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Avatar Ready</h3>
                    <p className="text-gray-600 mb-4">Your AI avatar is now active and ready for interaction.</p>
                    <div className="flex gap-3 justify-center">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Start Conversation
                      </button>
                      <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Powered by Advanced AI Technology</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Connected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarButton;

