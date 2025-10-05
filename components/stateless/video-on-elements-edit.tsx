"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, X } from "lucide-react"
import Image from "next/image"

type ElementType = "products" | "button"

interface Product {
  id: string
  name: string
  image: string
}

interface ButtonConfig {
  text: string
  link: string
}

interface VideoOnElementsEditProps {
  initialType?: ElementType
  initialProducts?: Product[]
  initialButton?: ButtonConfig
  onProductsChange?: (products: Product[]) => void
  onButtonChange?: (button: ButtonConfig) => void
}

export function VideoOnElementsEdit({
  initialType = "products",
  initialProducts = [],
  initialButton = { text: "", link: "" },
  onProductsChange,
  onButtonChange,
}: VideoOnElementsEditProps) {
  const [elementType, setElementType] = useState<ElementType>(initialType)
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(initialProducts)
  const [buttonConfig, setButtonConfig] = useState<ButtonConfig>(initialButton)
  const [searchQuery, setSearchQuery] = useState("")

  // Mock products for demonstration
  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Stick Cor Multifuncional",
      image: "/vestido-produto.png",
    },
    {
      id: "2",
      name: "Batom Matte Vermelho",
      image: "/vestido-produto.png",
    },
  ]

  const handleTypeChange = (value: ElementType) => {
    setElementType(value)
  }

  const handleProductToggle = (product: Product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id)
    let newProducts: Product[]

    if (isSelected) {
      newProducts = selectedProducts.filter((p) => p.id !== product.id)
    } else {
      newProducts = [...selectedProducts, product]
    }

    setSelectedProducts(newProducts)
    onProductsChange?.(newProducts)
  }

  const handleRemoveProduct = (productId: string) => {
    const newProducts = selectedProducts.filter((p) => p.id !== productId)
    setSelectedProducts(newProducts)
    onProductsChange?.(newProducts)
  }

  const handleButtonTextChange = (text: string) => {
    const newConfig = { ...buttonConfig, text }
    setButtonConfig(newConfig)
    onButtonChange?.(newConfig)
  }

  const handleButtonLinkChange = (link: string) => {
    const newConfig = { ...buttonConfig, link }
    setButtonConfig(newConfig)
    onButtonChange?.(newConfig)
  }

  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h3 className="text-lg font-semibold">Defina o que aparece no vídeo</h3>
      </div>

      {/* Element Type Selection */}
      <RadioGroup value={elementType} onValueChange={handleTypeChange} className="space-y-3">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="products" id="products" />
          <Label htmlFor="products" className="cursor-pointer font-normal">
            Produtos neste vídeo
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="button" id="button" />
          <Label htmlFor="button" className="cursor-pointer font-normal">
            Botão
          </Label>
        </div>
      </RadioGroup>

      {/* Conditional Content */}
      {elementType === "products" ? (
        <div className="space-y-4">
          {/* Search Field */}
          <div className="relative">
            <Input
              placeholder="Busque onde aparece ou cole o link"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Search Results (when searching) */}
          {searchQuery && filteredProducts.length > 0 && (
            <div className="border rounded-lg p-2 space-y-2">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 p-2 hover:bg-muted rounded-md cursor-pointer"
                  onClick={() => handleProductToggle(product)}
                >
                  <Checkbox
                    checked={selectedProducts.some((p) => p.id === product.id)}
                    onCheckedChange={() => handleProductToggle(product)}
                  />
                  <div className="relative h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <span className="text-sm">{product.name}</span>
                </div>
              ))}
            </div>
          )}

          {/* Selected Products List */}
          <div className="space-y-2">
            {selectedProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Nenhum produto selecionado ainda.</p>
            ) : (
              selectedProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Checkbox checked={true} />
                  <div className="relative h-10 w-10 rounded overflow-hidden bg-muted flex-shrink-0">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <span className="text-sm flex-1">{product.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Configurations Section */}
          <div>
            <h4 className="font-semibold mb-4">Configurações</h4>

            <div className="space-y-4">
              {/* Button Text */}
              <div className="space-y-2">
                <Label htmlFor="button-text">Texto do botão</Label>
                <div className="bg-black text-white p-3 rounded-md text-center italic">
                  {buttonConfig.text || "Exemplo: Ver todas as blusas"}
                </div>
                <Input
                  id="button-text"
                  value={buttonConfig.text}
                  onChange={(e) => handleButtonTextChange(e.target.value)}
                  placeholder="Digite o texto do botão"
                  className="mt-2"
                />
              </div>

              {/* Button Link */}
              <div className="space-y-2">
                <Label htmlFor="button-link">Link do Botão</Label>
                <div className="relative">
                  <Input
                    id="button-link"
                    value={buttonConfig.link}
                    onChange={(e) => handleButtonLinkChange(e.target.value)}
                    placeholder="Cole o link que o botão direcionará"
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
