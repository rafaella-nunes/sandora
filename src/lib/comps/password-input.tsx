"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/lib/components/ui/input"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showStrengthMeter?: boolean
}

export function PasswordInput({ className, showStrengthMeter = false, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const [strength, setStrength] = React.useState(0)

  const calculateStrength = (password: string) => {
    if (!password) return 0

    let score = 0

    // Comprimento mínimo
    if (password.length >= 6) score += 1
    if (password.length >= 10) score += 1

    // Complexidade
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    return Math.min(score, 5)
  }

  // Atualiza a força da senha quando o valor muda
  React.useEffect(() => {
    if (showStrengthMeter && props.value) {
      setStrength(calculateStrength(props.value as string))
    }
  }, [props.value, showStrengthMeter])

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          {...props}
          onChange={(e) => {
            if (props.onChange) props.onChange(e)
            if (showStrengthMeter) setStrength(calculateStrength(e.target.value))
          }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {showStrengthMeter && props.value && (
        <div className="space-y-1">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div
                key={level}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors",
                  strength >= level
                    ? strength < 3
                      ? "bg-red-500"
                      : strength < 5
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    : "bg-gray-200",
                )}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">
            {strength < 3 ? "Senha fraca" : strength < 5 ? "Senha média" : "Senha forte"}
          </p>
        </div>
      )}
    </div>
  )
}
