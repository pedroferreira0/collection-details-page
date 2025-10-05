"use client"

import { useState } from "react"
import { CollectionDetails } from "@/components/CollectionDetails"
import { PageDrawer } from "@/components/stateless/page-drawer"
import { Button } from "@/components/ui/button"

export default function Home() {

  return (
    <div className="min-h-screen bg-background">
   
      <PageDrawer
       title="Coleção de vídeos"
       open={true}
       onOpenChange={() => {}}
      >   <CollectionDetails />
      </PageDrawer>
    </div>
  )
}
