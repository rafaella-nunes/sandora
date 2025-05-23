"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "./logo"

interface AuthLayoutProps {
  children: ReactNode
  title: string
  subtitle: string
  formTitle: string
}

export function AuthLayout({ children, title, subtitle, formTitle }: AuthLayoutProps) {
  const pathname = usePathname()
  const isRegister = pathname.includes("register")

  return (
    // Adicionado role="main" para indicar o conteúdo principal da página
    <div className="relative min-h-screen md:flex md:flex-row" role="main"> 
      {/* Mobile layout - stacked with form in the middle */}
      <div className="md:hidden">
        {/* Top half - white */}
        <div className="flex h-[50vh] w-full flex-col items-center bg-white px-6 pt-10">
          {/* Logo */}
          <div className="flex w-full justify-center">
            {/* aria-label já está presente, o que é ótimo! */}
            <Link href="/" aria-label="Ir para página inicial">
              <Logo/>
            </Link>
          </div>
          {/* Adicionado um título para o layout mobile para melhor contexto, invisível visualmente mas lido por leitores de tela */}
          <h1 className="sr-only"> 
            {isRegister ? "Cadastro de Conta" : "Página de Login"}
          </h1>

          <div className="absolute bottom-0 left-0 right-0 h-16 w-full overflow-hidden">
              <svg
                className="absolute bottom-0 w-full text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                  fill="currentColor"
                  opacity="0.25"
                ></path>
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                  fill="currentColor"
                  opacity="0.5"
                ></path>
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
        </div>

        {/* Bottom half - purple */}
        <div className="h-[50vh] w-full bg-roxo-sandora"></div>

        {/* Centered form card */}
        <div
          className="absolute left-1/2 top-1/2 w-full max-w-[90%] -translate-x-1/2 -translate-y-1/2 px-4"
          // Adicionado role="region" e aria-label para dar contexto ao leitor de tela sobre a área do formulário
          role="region" 
          aria-label={`${formTitle} do Usuário`} 
        >
          <div className="rounded-2xl bg-gradient-to-b from-roxo-sandora to-gradient-end p-[1px] shadow-lg">
            <div className="rounded-xl bg-white p-6">
              {/* O h2 já é bom, mas garantindo que seja o título principal do formulário */}
              <h2 className="mb-6 text-center text-2xl font-semibold">{formTitle}</h2>
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop layout - side by side */}
      <div className="hidden md:flex md:min-h-screen md:w-full">
        {/* Left side - white */}
        <div className="flex w-1/2 flex-col items-start bg-white px-10 py-12 lg:px-16 xl:px-20">
          {/* Logo */}
          <div className="w-full flex justify-center md:justify-start">
            <Link href="/" aria-label="Ir para página inicial">
              <Logo className="mx-auto md:mx-0" />
            </Link>
          </div>

          {/* Title and subtitle - com margem automática */}
          <div className="w-full space-y-4 my-auto">
            {isRegister ? (
              <>
                {/* O h1 é crucial para acessibilidade, é o título principal da página */}
                <h1 className="text-5xl font-bold leading-snug text-[#353434]">
                  {title.split(" ").slice(0, -1).join(" ")}
                  <br />
                  <span className="text-roxo-sandora">{title.split(" ").slice(-1)}</span>
                </h1>
                <p className="text-2xl text-gray-700">
                  <span className="text-roxo-sandora font-normal">Crie sua conta em poucos segundos</span> e comece
                  <br />
                  sua jornada de aprendizado.
                </p>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold leading-snug text-[#353434]">{title}</h1>
                <p className="text-2xl text-[#383838]">{subtitle}</p>
              </>
            )}
          </div>
        </div>

        {/* Right side - purple */}
        <div
          className="flex w-1/2 flex-col items-center justify-center bg-roxo-sandora p-8"
          // Adicionado role="region" e aria-label para dar contexto ao leitor de tela sobre a área do formulário
          role="region" 
          aria-label={`${formTitle} do Usuário`} 
        >
          {/* Form card */}
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-gradient-to-b from-roxo-sandora to-gradient-end p-[1px] shadow-md">
              <div className="rounded-xl bg-white p-8">
                {/* O h2 já é bom, mas garantindo que seja o título principal do formulário dentro desta região */}
                <h2 className="mb-6 text-2xl font-semibold">{formTitle}</h2>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}