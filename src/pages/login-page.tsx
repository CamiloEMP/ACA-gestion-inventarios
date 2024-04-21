import { Form as RouterForm } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { GoogleIcon } from '@/components/icons'
import { LoginSchema, type LoginSchemaType } from '@/schemas/login.schema'
import { useAuth } from '@/hooks/use-auth'

export function LoginForm() {
  const [isSignIn, setIsSignIn] = useState(true)

  const {
    sigInWithGoogle,
    createUserWithEmailAndPasswordHandler,
    signInWithEmailAndPasswordHandler,
  } = useAuth()

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: LoginSchemaType) => {
    if (isSignIn) {
      await signInWithEmailAndPasswordHandler(data.email, data.password)

      return
    }
    await createUserWithEmailAndPasswordHandler(data.email, data.password)
  }

  const handleIsSignIn = () => {
    setIsSignIn(prev => !prev)
  }

  return (
    <main className="grid min-h-screen place-content-center bg-muted">
      <Card className="mx-auto w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-black">
            {isSignIn ? 'Registrarse' : 'Iniciar sesión'}
          </CardTitle>
          <CardDescription>
            {isSignIn ? 'Registrate para acceder a la plataforma' : 'Inicia sesión para continuar'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <RouterForm className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Correo electrónico
                      <span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contraseña
                      <span className="ml-1 text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                {isSignIn ? 'Registrarse' : 'Iniciar sesión'}
              </Button>
              <Button className="w-full" type="button" variant="outline" onClick={sigInWithGoogle}>
                <GoogleIcon className="w-4 h-4 mr-2" />
                Iniciar con Google
              </Button>
            </RouterForm>
          </Form>
          <div className="mt-4 text-xs text-center">
            {isSignIn ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
            <Button
              className="px-0 text-xs font-semibold w-fit"
              variant="link"
              onClick={handleIsSignIn}
            >
              {isSignIn ? 'Registrate' : 'Iniciar sesión'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
