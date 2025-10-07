import React from 'react'
import Particles from "@/components/Particles";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import { useAppDispatch } from '@/hooks';
import { setUser } from '@/features/user/userSlice';

const Login = () => {

  const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement>(null)
    const url = "http://localhost:3000";
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("")

    const login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!formRef.current) return
        
        const formData = new FormData(formRef.current)
        const jsonData = Object.fromEntries(formData.entries())

        try {
            const res =await fetch(`${url}/api/v1/user/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(jsonData)
                }
            )

            const data = await res.json()
            console.log(data)
          console.log(data.message)
          console.log(data.user)
          if (data.success) {
              dispatch(setUser(data.user))
                navigate("/chat")
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error(error)
                setError(true)
                setErrorMsg(error.message)
            }
                
            }
    }

  return (
    <div className="relative w-full h-screen">
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={true}
      />

     
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-black/50">
          <CardHeader className="relative">
            <CardTitle className="text-center text-2xl">
              Log In to Chatify
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={login} className="space-y-4">
              <label htmlFor="email" className="ml-2">
                Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="emailUsername"
                id="email"
                type="text"
                placeholder="Enter your email"
              />
              <label htmlFor="password" className="ml-2">
                Password
              </label>
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
              {error && (
                <div className="text-red-500 text-center border-red-700 border-2 rounded-2xl bg-red-500/10 w-full">
                  {errorMsg}
                </div>
              )}
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Login