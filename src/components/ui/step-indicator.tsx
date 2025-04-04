import { cn } from "@/lib/utils";

interface Step {
  label: string;
  completed: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function StepIndicator({ steps, currentStep, className }: StepIndicatorProps) {
  return (
    <div className={cn("flex items-center w-full", className)}>
      {steps.map((step, index) => {
        const isActive = index + 1 === currentStep;
        const isCompleted = step.completed;
        
        return (
          <div key={index} className="flex items-center flex-1">
            {/* Step circle */}
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium border",
                {
                  "bg-blue-600 text-white border-blue-600": isActive,
                  "bg-green-600 text-white border-green-600": isCompleted,
                  "bg-white text-gray-500 border-gray-300": !isActive && !isCompleted,
                }
              )}
            >
              {isCompleted ? (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* Step label */}
            <span
              className={cn("ml-2 text-sm font-medium", {
                "text-blue-600": isActive,
                "text-green-600": isCompleted,
                "text-gray-500": !isActive && !isCompleted,
              })}
            >
              {step.label}
            </span>
            
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn("flex-1 h-0.5 mx-4", {
                  "bg-green-600": isCompleted,
                  "bg-gray-300": !isCompleted,
                })}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
