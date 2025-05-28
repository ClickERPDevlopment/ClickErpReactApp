import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AuthContextType, useAuth } from "@/lib/auth-provider";

export default function LoginForm() {
  const [input, setInput] = React.useState({
    username: "",
    password: "",
  });

  const auth: AuthContextType | null = useAuth();

  const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      await auth?.loginAction(input);
      return;
    }
    alert("pleae provide a valid input");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmitEvent}>
      <Card className="w-[350px] bg-white">
        <CardHeader>
          <CardTitle className="text-center">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="mail@example.com"
                aria-describedby="username"
                aria-invalid="false"
                onChange={handleInput}
                autoComplete="off"
              />
              <CardDescription>Please enter a valid username.</CardDescription>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                aria-describedby="password"
                aria-invalid="false"
                onChange={handleInput}
              />
              <CardDescription>Please enter a valid password.</CardDescription>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <Button className="w-full" type="submit" disabled={auth?.isLoading}>
            Sign in
          </Button>
          {auth?.message ? (
            <CardDescription>
              {auth?.message.includes("invalid_username_or_password") ? (
                <span className="font-bold text-red-600">
                  Invalid Username or Password
                </span>
              ) : (
                auth?.message
              )}
            </CardDescription>
          ) : null}
        </CardFooter>
      </Card>
    </form>
  );
}
