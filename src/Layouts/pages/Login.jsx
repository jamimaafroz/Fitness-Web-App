import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"; // if you're using shadcn/ui
import { Input } from "@/components/ui/input"; // assuming you have this component too
import { Label } from "@/components/ui/label"; // optional but cute
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import CustomHelmet from "../../components/ui/Meta/CustomHelmet";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signIn, signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const form = location.state?.from || "/";

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // You can handle login logic here
    signIn(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Logged in successfully!");
        navigate(form);
      })
      .catch((error) => console.log(error));
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google Sign In Result:", result.user);
        toast.success("Logged in successfully!");
        navigate(form);
      })
      .catch((error) => console.error("Google Sign In Error:", error));
  };
  console.log("Login page rendering");
  return (
    <>
      <CustomHelmet title="Login" />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/DZgpbNZh/kike-vega-F2qh3yjz6-Jk-unsplash.jpg')",
        }}
      >
        {/* Blurry overlay for nice effect */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>

        {/* Form container */}
        <div className="relative z-10 w-full max-w-md p-8 rounded-xl bg-white/30 backdrop-blur-md border border-white/30 shadow-lg space-y-6 mx-4">
          <h2 className="text-2xl font-bold text-center text-primary">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full border-[0.5px] border-[rgba(0,0,0,0.15)] bo shadow-2xl hover:cursor-pointer"
              >
                Login
              </Button>
              <Button
                type="submit"
                className="w-full border-[0.5px] border-[rgba(0,0,0,0.15)] bo shadow-2xl hover:cursor-pointer"
                onClick={handleGoogleSignIn}
              >
                <span>
                  <FcGoogle />
                </span>
                Sign in with Google
              </Button>
            </div>

            <p className="text-sm text-black text-center">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register Now!
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
