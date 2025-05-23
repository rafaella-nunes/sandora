
import * as z from "zod"

export const registerSchema = z
  .object({
    name: z.string().min(3, {
      message: "Nome deve ter pelo menos 3 caracteres",
    }),
    company: z.string().min(2, {
      message: "Empresa deve ter pelo menos 2 caracteres",
    }),
    email: z.string().email({
      message: "Email inválido",
    }),
    password: z
      .string()
      .min(6, {
        message: "Senha deve ter pelo menos 6 caracteres",
      })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

export type RegisterInput = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email inválido",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória",
  }),
  rememberMe: z.boolean().optional(),
})

export type LoginInput = z.infer<typeof loginSchema>