import * as React from "react"
import { cn } from "@/lib/utils"

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

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  const dark = useDark()

  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex w-full h-10 rounded-xl px-4 py-2 text-sm transition-all duration-200",
        "placeholder:text-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "focus:outline-none",

        dark
          ? "bg-[#141209] text-[#F9F5E8] border border-[rgba(245,166,35,.18)] focus:ring-2 focus:ring-[#F5A623]/40"
          : "bg-[#FFFDF5] text-gray-900 border border-[rgba(245,166,35,.18)] focus:ring-2 focus:ring-[#F5A623]/30",

        "focus:shadow-[0_0_0_2px_rgba(245,166,35,.15)]",

        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"

export { Input }