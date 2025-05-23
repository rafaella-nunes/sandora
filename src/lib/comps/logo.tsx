import { cn } from "@/lib/utils"
import Image  from "next/image"


interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2 text-primary", className)}>
      <Image src={"/image.png"} alt={"Logo"} width={149} height={36}/>
    </div>
  )
}
