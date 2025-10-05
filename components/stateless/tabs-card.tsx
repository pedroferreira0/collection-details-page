"use client"

import type React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabConfig {
  value: string
  label: string
  icon?: React.ReactNode
  count?: number
}

interface TabsCardProps {
  tabs: TabConfig[]
  defaultValue: string
  children: React.ReactNode
  className?: string
}

export function TabsCard({ tabs, defaultValue, children, className }: TabsCardProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className || "w-full"}>
      <TabsList className="w-full">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="flex-1">
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && ` (${tab.count})`}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  )
}

interface TabsCardContentProps {
  value: string
  children: React.ReactNode
}

export function TabsCardContent({ value, children }: TabsCardContentProps) {
  return <TabsContent value={value}>{children}</TabsContent>
}

export default TabsCard
