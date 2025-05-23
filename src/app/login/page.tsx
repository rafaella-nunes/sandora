"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { AuthLayout } from "@/lib/comps/auth-layout"
import { Button } from "@/lib/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/lib/components/ui/form"
import { Input } from "@/lib/components/ui/input"
import { PasswordInput } from "@/lib/comps/password-input"
import { type LoginInput, loginSchema } from "@/lib/validate/auth"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push('/register');
  };

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false, 
    },
    mode: "onChange",
  })

  async function onSubmit(data: LoginInput) {
    setIsLoading(true)
    try {
      console.log("Dados do login:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/dashboard")
    } catch (error) {
      console.error("Erro ao fazer login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Bem-vindo(a) de volta!"
      subtitle="Faça login com seu e-mail para acessar seus cursos."
      formTitle="Login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[14px]">Email</FormLabel> 
                <FormControl>
                  <Input
                    id="email" 
                    placeholder="Insira seu email cadastrado"
                    type="email"
                    className="h-11 text-xs"
                    {...field}
                    aria-required="true" 
                    aria-invalid={form.formState.errors.email ? "true" : "false"} 
                    aria-describedby={form.formState.errors.email ? "email-error" : undefined} 
                    autoComplete="email"
                  />
                </FormControl>
                {form.formState.errors.email && ( 
                  <FormMessage id="email-error" /> 
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[14px]">Senha</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="password" 
                    placeholder="Insira sua senha"
                    className="h-11 text-xs"
                    {...field}
                    aria-required="true" 
                    aria-invalid={form.formState.errors.password ? "true" : "false"} 
                    aria-describedby={form.formState.errors.password ? "password-error" : undefined} 
                    autoComplete="current-password"
                  />
                </FormControl>
                {form.formState.errors.password && ( 
                  <FormMessage id="password-error" /> 
                )}
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <Link
              href="#"
              className="text-xs text-avisos underline"
              aria-label="Esqueci minha senha. Clique para redefinir." 
            >
              Esqueci minha senha
            </Link>
          </div>

          <Button
            type="submit"
            className="h-11 w-full bg-roxo-sandora text-sm font-semibold"
            disabled={isLoading || !form.formState.isValid}
            aria-label={isLoading ? "Processando login" : "Fazer login no Sandora"} 
          >
            {isLoading ? "PROCESSANDO..." : "FAZER LOGIN"}
          </Button>

          <div className="text-center text-sm text-avisos underline">
            <a href="/register" onClick={handleClick} aria-label="Não possui conta? Clique para se cadastrar"> 
              Não possui conta? Cadastre-se
            </a>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}