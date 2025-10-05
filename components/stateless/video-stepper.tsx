import { Check } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

interface VideoStepperProps {
  steps: string[]
  currentStep: number
}

export function VideoStepper({ steps, currentStep }: VideoStepperProps) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep
        const isPending = index > currentStep

        return (
          <div key={index} className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isCompleted && "bg-primary text-primary-foreground",
                  isCurrent && "border-2 border-primary bg-background text-primary",
                  isPending && "border border-muted-foreground/30 bg-muted text-muted-foreground",
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" weight="bold" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-sm font-medium transition-colors hidden sm:inline",
                  isCurrent && "text-foreground",
                  (isCompleted || isPending) && "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn("h-[2px] w-8 transition-colors", isCompleted ? "bg-primary" : "bg-muted-foreground/30")}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
