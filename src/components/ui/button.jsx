import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

/* GOLD THEME BUTTON STYLES */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {

        /* PRIMARY GOLD BUTTON */
        default:
          "text-black bg-gradient-to-r from-[#F5A623] via-[#FFCF6B] to-[#E8940A] shadow-md hover:shadow-[0_10px_28px_rgba(245,166,35,.45)] hover:-translate-y-[2px] active:translate-y-0",

        /* OUTLINE GOLD */
        outline:
          "border border-[#F5A623]/30 bg-transparent text-[#F5A623] hover:bg-[#F5A623]/10",

        /* SECONDARY SOFT */
        secondary:
          "bg-[#141209] text-[#F9F5E8] border border-[rgba(245,166,35,.15)] hover:bg-[#1b180e]",

        /* GHOST BUTTON */
        ghost:
          "text-[#F5A623] hover:bg-[#F5A623]/10",

        /* LINK STYLE */
        link:
          "text-[#F5A623] underline-offset-4 hover:underline",

        /* DANGER */
        destructive:
          "bg-red-500 text-white hover:bg-red-600 shadow-sm",
      },

      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 p-0",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {

    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }