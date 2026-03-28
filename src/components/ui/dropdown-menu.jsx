import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

/* Sub trigger */

const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-default outline-none",
      "hover:bg-[#F5A623]/10 focus:bg-[#F5A623]/10",
      "transition-colors",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto text-[#F5A623]" />
  </DropdownMenuPrimitive.SubTrigger>
))

/* Sub content */

const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] rounded-xl border shadow-xl p-1",
      "bg-[#FFFDF5] text-[#1A1710] border-[rgba(245,166,35,.18)]",
      "dark:bg-[#141209] dark:text-[#F9F5E8]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      className
    )}
    {...props}
  />
))

/* Main dropdown */

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 6, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[10rem] rounded-xl border shadow-2xl p-1",
        "bg-[#FFFDF5] text-[#1A1710] border-[rgba(245,166,35,.22)]",
        "dark:bg-[#141209] dark:text-[#F9F5E8] dark:border-[rgba(245,166,35,.18)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))

/* Items */

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "flex items-center gap-2 rounded-md px-3 py-2 text-sm outline-none cursor-default",
      "hover:bg-[#F5A623]/10 focus:bg-[#F5A623]/10",
      "transition-colors",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))

/* Checkbox */

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    checked={checked}
    className={cn(
      "relative flex items-center rounded-md py-2 pl-8 pr-3 text-sm",
      "hover:bg-[#F5A623]/10 focus:bg-[#F5A623]/10",
      className
    )}
    {...props}
  >
    <span className="absolute left-2">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-[#F5A623]" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))

/* Radio */

const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex items-center rounded-md py-2 pl-8 pr-3 text-sm",
      "hover:bg-[#F5A623]/10 focus:bg-[#F5A623]/10",
      className
    )}
    {...props}
  >
    <span className="absolute left-2">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-[#F5A623]" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-3 py-2 text-sm font-semibold text-[#F5A623]", inset && "pl-8", className)}
    {...props}
  />
))

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("my-1 h-[1px] bg-[rgba(245,166,35,.15)] dark:bg-[rgba(245,166,35,.2)]", className)}
    {...props}
  />
))

const DropdownMenuShortcut = ({ className, ...props }) => (
  <span className={cn("ml-auto text-xs opacity-60", className)} {...props} />
)

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}