"use client";

import { registerUser } from "@/app/actions/authActions";
import { RegisterSchema, registerSchema } from "@/lib/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const result = await registerUser(data);
      if (result.status === "sucess") {
        console.log("USER REGISTER SUCCESSFULLY");
      } else {
        if (Array.isArray(result.error)) {
          result.error.forEach((e) => {
            const fieldName = e.path.join(".") as "email" | "name" | "password";
            setError(fieldName, { message: e.message });
          });
        } else {
          setError("root.serverError", { message: result.error });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <Card className="w-5/6 sm:w-2/5 mx-auto">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-2 items-center text-secondary">
          <div className="flex flex-row items-center gap-3">
            <FaLock size={20} />
            <h1 className="text-xl font-semibold">Register</h1>
          </div>
          <p className="text-sm text-neutral-500">Welcome back to NextMatch</p>
        </div>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 md:space-y-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              {...register("email")}
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
            />
            <Input
              label="Password"
              className="w-full"
              placeholder="Enter your password"
              {...register("password")}
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            {errors.root?.serverError && (
              <p className="text-danger text-sm">
                {errors.root.serverError.message}
              </p>
            )}
            <Button
              fullWidth
              color="secondary"
              isLoading={isSubmitting}
              type="submit"
              className="rounded-md"
              isDisabled={!isValid}
            >
              Sign up
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
