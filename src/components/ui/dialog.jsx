"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

function useDark() {
  const [dark, setDark] = React.useState(() => document.documentElement.dataset.theme === "dark")

  React.useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.dataset.theme === "dark")
    )
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => obs.disconnect()
  }, [])

  return dark
}

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
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
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(
  ({ className, children, hideClose = false, ...props }, ref) => {

    const dark = useDark()

    return (
      <DialogPortal>
        <DialogOverlay />

        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg",
            "translate-x-[-50%] translate-y-[-50%]",
            "grid gap-4 p-6 shadow-2xl rounded-2xl",
            "border overflow-hidden",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-1/2",
            "duration-150",

            dark
              ? "bg-[#141209] text-[#F9F5E8] border-[rgba(245,166,35,.18)]"
              : "bg-[#FFFDF5] text-gray-900 border-[rgba(245,166,35,.18)]",

            className
          )}
          {...props}
        >

          {/* shimmer line */}
          <div
            className="absolute top-0 left-0 right-0 h-[1px]"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(245,166,35,.6),transparent)",
            }}
          />

          {children}

          {!hideClose && (
            <DialogPrimitive.Close
              className="absolute right-4 top-4 p-2 rounded-lg hover:bg-[#F5A623]/15 transition"
            >
              <X className="h-4 w-4 text-[#F5A623]" />
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}

        </DialogPrimitive.Content>
      </DialogPortal>
    )
  }
)

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-left", className)} {...props} />
)

const DialogFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
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
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}