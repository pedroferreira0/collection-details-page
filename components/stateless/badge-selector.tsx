"use client"

import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

export interface BadgeSelectorOption {
  value: string
  label: string
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

interface BadgeSelectorProps {
  value: string
  onChange: (value: string) => void
  options: BadgeSelectorOption[]
  className?: string
}

export function BadgeSelector({ value, onChange, options, className }: BadgeSelectorProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-auto border-0 p-0 h-auto shadow-none ${className || ""}`}>
        <Badge
          variant={selectedOption?.variant || "outline"}
          className={`cursor-pointer hover:bg-muted ${selectedOption?.className || ""}`}
        >
          {selectedOption?.label || value}
        </Badge>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
