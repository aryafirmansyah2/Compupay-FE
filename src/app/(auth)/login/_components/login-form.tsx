"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import request from "@/utils/request";

const LoginForm = () => {
  const router = useRouter();

  const FormSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email({ message: "Please enter a valid email address." }),
    password: z.string().min(1, "password is required"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    toast.loading("Loading...");
    toast.dismiss();

    try {
      const response = await request.post("/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (response.data) {
        Cookies.set("token", response.data.data.access_token);
        Cookies.set("role", response.data.data.role);
        toast.dismiss();
        toast.success("Success Login", { position: "top-center" });
        router.push("/employee");
      }
    } catch (error: any) {
      // Check if the error has a response object
      if (error.response) {
        // Handle different status codes gracefully
        if (error.response.status === 400) {
          toast.dismiss();
          toast.error("Invalid login credentials. Please try again.", {
            position: "top-center",
          });
        } else {
          toast.dismiss();
          toast.error("Something went wrong. Please try again later.", {
            position: "top-center",
          });
        }
      } else {
        // In case of network errors or other issues
        console.error("Error:", error);
        toast.dismiss();
        toast.error("Network error. Please check your internet connection.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <Card className="w-full  shadow-none bg-transparent space-y-6 border-0">
      <CardHeader className="p-0 text-center">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-xs space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
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
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
