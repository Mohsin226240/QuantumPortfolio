import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 relative",

        orientation === "horizontal"
          ? "h-[1px] w-full bg-gradient-to-r from-transparent via-[#F5A623]/40 to-transparent"
          : "w-[1px] h-full bg-gradient-to-b from-transparent via-[#F5A623]/40 to-transparent",

        className
      )}
      {...props}
    />
  )
)

Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }