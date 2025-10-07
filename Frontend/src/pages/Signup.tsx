import Particles from "@/components/Particles";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useRef, useState } from "react";
import React from "react";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [error, setError] = useState<boolean>(false);
  const url = "http://localhost:3000";

  const formRef = useRef<HTMLFormElement>(null);

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    if (password != cnfPassword) {
      setError(true);
      return;
    }

    const formData = new FormData(formRef.current);
      console.log(formData.entries());
       const jsonData = Object.fromEntries(formData.entries());

    for (const [key, value] of formData.entries()) {
      console.log(key, ": ", value);
    }

    try {
     const res = await fetch(`${url}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         },
        credentials: "include",
        body: JSON.stringify(jsonData),
      })
    
        const data = await res.json()
        
        console.log(data.message)
        if (data.success) {
            navigate("/login")
        }
        
        
      console.log("Data received");
    } catch (error) {
        console.error("Sign Up failed", error);
        setError(true)
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Background Particles */}
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

      {/* Signup Form */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Card className="w-full max-w-md p-6 bg-black/50">
          <CardHeader className="relative">
            <CardTitle className="text-center text-2xl">
              Sign Up for Chatify
            </CardTitle>
            <div
              onClick={() => navigate("/login")}
              className="absolute right-0 top-0 underline cursor-pointer"
            >
              Log In
            </div>
          </CardHeader>
          <CardContent>
            <form ref={formRef} onSubmit={createUser} className="space-y-4">
              <label htmlFor="name" className="ml-2">
                Name
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                id="name"
                placeholder="Enter your name"
              />
              <label htmlFor="name" className="ml-2">
                Username
              </label>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                id="Username"
                placeholder="Enter username"
              />
              <label htmlFor="email" className="ml-2">
                Email
              </label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                type="email"
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
              <label htmlFor="confirmPassword" className="ml-2">
                Confirm Password
              </label>
              <Input
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
                name="ConfirmPassword"
                id="confirmPassword"
                type="password"
                placeholder="Enter your password"
              />
              {error && (
                <div className="text-red-500 text-center border-red-700 border-2 rounded-2xl bg-red-500/10 w-full">
                  {"Confirm Password does not match"}
                </div>
              )}
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
