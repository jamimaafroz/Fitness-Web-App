import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";
import CustomHelmet from "../../components/ui/Meta/CustomHelmet";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn, signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();

  // Email/Password Login Handler
  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;

      // 🔥 Fetch full user info including role
      const userRes = await axiosInstance.get(`/users?email=${user.email}`);
      const fullUser = userRes.data[0];

      // ✅ Pass full user with role to the /jwt endpoint
      const res = await axiosInstance.post("/jwt", fullUser);
      localStorage.setItem("fit-access-token", res.data.token);

      toast.success("Logged in successfully!");
      navigate(from);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    }
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userinfo = {
        email: user.email,
        role: "member", // or set default role here
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userinfo);

      // 🔥 Fetch full user info from DB
      const userRes = await axiosInstance.get(`/users?email=${user.email}`);
      const fullUser = userRes.data[0];

      // ✅ Send full user to /jwt
      const jwtRes = await axiosInstance.post("/jwt", fullUser);
      localStorage.setItem("fit-access-token", jwtRes.data.token);

      toast.success("Signed in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google sign-in failed");
    }
  };

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
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

        <div className="relative z-10 w-full max-w-md p-8 rounded-xl bg-white/30 backdrop-blur-md border border-white/30 shadow-lg space-y-6 mx-4">
          <h2 className="text-2xl font-bold text-center text-primary">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <div className="space-y-4">
              <Button type="submit" className="w-full border shadow-2xl">
                Login
              </Button>
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full border shadow-2xl flex items-center justify-center gap-2"
              >
                <FcGoogle />
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
