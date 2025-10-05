import { Check } from "@phosphor-icons/react"

interface VideoStepperProps {
  currentStep: number
  steps: string[]
}

export function VideoStepper({ currentStep, steps }: VideoStepperProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const stepNumber = index + 1
        const isCompleted = stepNumber < currentStep
        const isCurrent = stepNumber === currentStep

        return (
          <div key={stepNumber} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                  isCompleted
                    ? "bg-blue-600 border-blue-600 text-white"
                    : isCurrent
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-300 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" weight="bold" />
                ) : (
                  <span className="text-sm font-medium">{stepNumber}</span>
                )}
              </div>
              <span className={`mt-2 text-xs font-medium ${isCurrent ? "text-blue-600" : "text-gray-500"}`}>
                {step}
              </span>
            </div>
            {stepNumber < steps.length && (
              <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? "bg-blue-600" : "bg-gray-300"}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
