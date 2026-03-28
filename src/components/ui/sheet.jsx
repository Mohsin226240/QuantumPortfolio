"use client";

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

/* Detect dark mode (same system as dashboard) */

function useDark() {
  const [dark, setDark] = React.useState(
    () => document.documentElement.dataset.theme === "dark"
  )

  React.useEffect(() => {
    const observer = new MutationObserver(() =>
      setDark(document.documentElement.dataset.theme === "dark")
    )

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })

    return () => observer.disconnect()
  }, [])

  return dark
}

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

/* Overlay */

const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 backdrop-blur-sm bg-black/60",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

/* Variants */

const sheetVariants = cva(
  "fixed z-50 p-6 transition ease-in-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",

        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",

        left:
          "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",

        right:
          "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
      },
    },

    defaultVariants: {
      side: "right",
    },
  }
)

/* Content */

const SheetContent = React.forwardRef(
  ({ side = "right", className, children, ...props }, ref) => {

    const dark = useDark()

    return (
      <SheetPortal>
        <SheetOverlay />

        <SheetPrimitive.Content
          ref={ref}
          className={cn(
            sheetVariants({ side }),

            "shadow-2xl overflow-auto",

            dark
              ? "bg-[#141209] text-[#F9F5E8] border border-[rgba(245,166,35,.18)]"
              : "bg-[#FFFDF5] text-gray-900 border border-[rgba(245,166,35,.18)]",

            className
          )}
          {...props}
        >

          {/* Top gold shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(245,166,35,.6),transparent)",
            }}
          />

          {/* Close Button */}

          <SheetPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-lg p-2 transition-all",
              "hover:bg-[#F5A623]/15",
              "focus:outline-none"
            )}
          >
            <X className="h-4 w-4 text-[#F5A623]" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>

          {children}

        </SheetPrimitive.Content>
      </SheetPortal>
    )
  }
)

SheetContent.displayName = SheetPrimitive.Content.displayName

/* Header */

const SheetHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-left mb-4",
      className
    )}
    {...props}
  />
)

SheetHeader.displayName = "SheetHeader"

/* Footer */

const SheetFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6",
      className
    )}
    {...props}
  />
)

SheetFooter.displayName = "SheetFooter"

/* Title */

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn(
      "text-xl font-bold",
      "bg-gradient-to-r from-[#F5A623] via-[#FFCF6B] to-[#E8940A]",
      "bg-clip-text text-transparent",
      className
    )}
    {...props}
  />
))

SheetTitle.displayName = SheetPrimitive.Title.displayName

/* Description */

const SheetDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    <SheetPrimitive.Description
      ref={ref}
      className={cn(
        "text-sm text-gray-400",
        className
      )}
      {...props}
    />
  )
)

SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}