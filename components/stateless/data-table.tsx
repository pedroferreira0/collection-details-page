"use client"

import { type ReactNode, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DotsThree, DotsSixVertical } from "@phosphor-icons/react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

export interface Column<T> {
  key: string
  header: string
  width?: string
  align?: "left" | "center" | "right"
  render: (item: T) => ReactNode
}

export interface Action<T> {
  label: string
  icon?: ReactNode
  onClick: (item: T) => void
  variant?: "default" | "destructive"
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  actions?: Action<T>[]
  enableDragDrop?: boolean
  enableCheckbox?: boolean
  onReorder?: (newData: T[]) => void
  getItemId: (item: T) => string
}

function SortableRow<T>({
  item,
  columns,
  actions,
  enableCheckbox,
  getItemId,
}: {
  item: T
  columns: Column<T>[]
  actions?: Action<T>[]
  enableCheckbox?: boolean
  getItemId: (item: T) => string
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: getItemId(item),
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <TableRow ref={setNodeRef} style={style} className={`bg-background border-b ${isDragging ? "relative z-50" : ""}`}>
      <TableCell className="w-12 py-4">
        <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded">
          <DotsSixVertical className="h-5 w-5 text-muted-foreground" />
        </div>
      </TableCell>
      {enableCheckbox && (
        <TableCell className="w-12 py-4">
          <Checkbox />
        </TableCell>
      )}
      {columns.map((column) => (
        <TableCell
          key={column.key}
          className={`py-4 ${column.width ? column.width : ""} ${
            column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""
          }`}
        >
          {column.render(item)}
        </TableCell>
      ))}
      {actions && actions.length > 0 && (
        <TableCell className="w-16 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <DotsThree className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(item)}
                  className={action.variant === "destructive" ? "text-destructive" : ""}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  )
}

function RegularRow<T>({
  item,
  columns,
  actions,
  enableCheckbox,
}: {
  item: T
  columns: Column<T>[]
  actions?: Action<T>[]
  enableCheckbox?: boolean
}) {
  return (
    <TableRow className="bg-background border-b">
      {enableCheckbox && (
        <TableCell className="w-12 py-4">
          <Checkbox />
        </TableCell>
      )}
      {columns.map((column) => (
        <TableCell
          key={column.key}
          className={`py-4 ${column.width ? column.width : ""} ${
            column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""
          }`}
        >
          {column.render(item)}
        </TableCell>
      ))}
      {actions && actions.length > 0 && (
        <TableCell className="w-16 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <DotsThree className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {actions.map((action, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => action.onClick(item)}
                  className={action.variant === "destructive" ? "text-destructive" : ""}
                >
                  {action.icon && <span className="mr-2">{action.icon}</span>}
                  {action.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      )}
    </TableRow>
  )
}

export function DataTable<T>({
  data,
  columns,
  actions,
  enableDragDrop = false,
  enableCheckbox = false,
  onReorder,
  getItemId,
}: DataTableProps<T>) {
  const [items, setItems] = useState(data)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => getItemId(item) === active.id)
        const newIndex = items.findIndex((item) => getItemId(item) === over?.id)

        const newItems = arrayMove(items, oldIndex, newIndex)
        onReorder?.(newItems)
        return newItems
      })
    }
  }

  const tableContent = (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted/50 hover:bg-muted/50">
          {enableDragDrop && <TableHead className="w-12"></TableHead>}
          {enableCheckbox && <TableHead className="w-12"></TableHead>}
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={`font-semibold text-foreground ${column.width ? column.width : ""} ${
                column.align === "center" ? "text-center" : column.align === "right" ? "text-right" : ""
              }`}
            >
              {column.header}
            </TableHead>
          ))}
          {actions && actions.length > 0 && <TableHead className="w-16"></TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {enableDragDrop ? (
          <SortableContext items={items.map(getItemId)} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableRow
                key={getItemId(item)}
                item={item}
                columns={columns}
                actions={actions}
                enableCheckbox={enableCheckbox}
                getItemId={getItemId}
              />
            ))}
          </SortableContext>
        ) : (
          <>
            {items.map((item) => (
              <RegularRow
                key={getItemId(item)}
                item={item}
                columns={columns}
                actions={actions}
                enableCheckbox={enableCheckbox}
              />
            ))}
          </>
        )}
      </TableBody>
    </Table>
  )

  if (enableDragDrop) {
    return (
      <div className="rounded-lg border overflow-hidden">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          {tableContent}
        </DndContext>
      </div>
    )
  }

  return <div className="rounded-lg border overflow-hidden">{tableContent}</div>
}
