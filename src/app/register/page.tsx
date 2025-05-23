"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { AuthLayout } from "@/lib/comps/auth-layout"
import { Button } from "@/lib/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/lib/components/ui/form"
import { Input } from "@/lib/components/ui/input"
import { PasswordInput } from "@/lib/comps/password-input"
import { type RegisterInput, registerSchema } from "@/lib/validate/auth"
import { Popover, PopoverContent, PopoverTrigger } from "@/lib/components/ui/popover"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push("/login")
  }

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  })

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true)
    try {
      console.log("Dados do formulário:", data)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/login?registered=true")
    } catch (error) {
      console.error("Erro ao registrar:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Crie sua conta e comece a aprender"
      subtitle="Crie sua conta em poucos segundos e comece sua jornada de aprendizado."
      formTitle="Cadastro"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[14px]">Nome Completo</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Como você será identificada na plataforma."
                    className="h-11"
                    {...field}
                    aria-required="true"
                    aria-invalid={form.formState.errors.name ? "true" : "false"}
                    aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                  />
                </FormControl>
                {form.formState.errors.name && <FormMessage id="name-error" />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[14px]">Empresa</FormLabel>
                <FormControl>
                  <Input
                    id="company"
                    placeholder="Insira o nome da empresa."
                    className="h-11"
                    {...field}
                    aria-required="true"
                    aria-invalid={form.formState.errors.company ? "true" : "false"}
                    aria-describedby={form.formState.errors.company ? "company-error" : undefined}
                  />
                </FormControl>
                {form.formState.errors.company && <FormMessage id="company-error" />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[14px]">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="Será usado para login e comunicações."
                    type="email"
                    className="h-11"
                    {...field}
                    aria-required="true"
                    aria-invalid={form.formState.errors.email ? "true" : "false"}
                    aria-describedby={form.formState.errors.email ? "email-error" : undefined}
                    autoComplete="email"
                  />
                </FormControl>
                {form.formState.errors.email && <FormMessage id="email-error" />}
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
                    placeholder="(mín. 6 caracteres)"
                    className="h-11"
                    {...field}
                    aria-required="true"
                    aria-invalid={form.formState.errors.password ? "true" : "false"}
                    aria-describedby={form.formState.errors.password ? "password-error" : undefined}
                    autoComplete="new-password"
                    showStrengthMeter
                  />
                </FormControl>
                {form.formState.errors.password && <FormMessage id="password-error" />}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-[14px]">Confirme Senha</FormLabel>
                <FormControl>
                  <PasswordInput
                    id="confirmPassword"
                    placeholder="(mín. 6 caracteres)"
                    className="h-11"
                    {...field}
                    aria-required="true"
                    aria-invalid={form.formState.errors.confirmPassword ? "true" : "false"}
                    aria-describedby={form.formState.errors.confirmPassword ? "confirmPassword-error" : undefined}
                    autoComplete="new-password"
                  />
                </FormControl>
                {form.formState.errors.confirmPassword && <FormMessage id="confirmPassword-error" />}
              </FormItem>
            )}
          />

          <p className="text-xs font-normal text-avisos">
            Ao criar sua conta, você concorda com nossos{" "}
            <Popover>
              <PopoverTrigger asChild>
                <Link href="#" className="text-roxo-sandora underline" aria-label="Termos de Uso do Sandora">
                  Termos de Uso
                </Link>
              </PopoverTrigger>
              <PopoverContent className="w-80 max-h-60 overflow-y-auto text-xs">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Termos de Uso</h4>
                  <p className="text-sm text-muted-foreground">
                    Este termo de consentimento foi elaborado em conformidade com a Lei Geral de Proteção de Dados
                    (LGPD). Consoante ao artigo 5º inciso XII da Lei 13.709/2018, ao cadastrar-se, o titular/
                    responsável viabiliza a manifestação livre, informada e inequívoca do tratamento de seus dados
                    pessoais. Ao se cadastrar em nossa plataforma, informações específicas sobre os usuários, como
                    endereços de protocolo de Internet (IP), navegação no site, software do usuário, juntamente com
                    outras informações semelhantes, serão armazenadas nos servidores de ML Plataformas Digitais e
                    Marketing LTDA. Essas informações serão estritamente usadas apenas para fins estatísticos e não
                    serão publicadas para acesso geral. Os dados da empresa e das pessoas denunciantes (quando se
                    identificarem) estão protegidos e são tratados com total confidencialidade.
                  </p>
                </div>
              </PopoverContent>
            </Popover>{" "}
            e{" "}
            <Link href="#" className="text-roxo-sandora underline" aria-label="Política de Privacidade do Sandora">
              Política de Privacidade
            </Link>
            .
          </p>

          <Button
            type="submit"
            className="h-11 w-full bg-roxo-sandora text-sm font-semibold"
            disabled={isLoading || !form.formState.isValid}
            aria-label={isLoading ? "Processando cadastro" : "Criar conta no Sandora"}
          >
            {isLoading ? "PROCESSANDO..." : "CRIAR CONTA"}
          </Button>

          <div className="text-center font-normal text-sm text-avisos underline">
            <a href="/login" onClick={handleClick} aria-label="Já tem uma conta? Clique para entrar">
              Já tem uma conta? Entrar
            </a>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
