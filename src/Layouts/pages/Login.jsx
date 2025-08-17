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

  // Email & Password Login
  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;

      // Get user with role
      const userRes = await axiosInstance.get(`/users?email=${user.email}`);
      console.log("User fetched from DB:", userRes.data);
      const fullUser = userRes.data[0];

      if (!fullUser) {
        throw new Error("User not found in database.");
      }

      // JWT Token Get
      const res = await axiosInstance.post("/jwt", fullUser);
      localStorage.setItem("fit-access-token", res.data.token);

      toast.success("Login successful!");
      navigate(from);
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error("Invalid email or password.");
    }
  };

  // Google Login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userInfo = {
        name: user.displayName || "Unknown",
        email: user.email,
        role: "member",
        photo: user.photoURL || "",
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      // Check if user exists in DB
      const userRes = await axiosInstance.get(`/users?email=${user.email}`);
      const existingUser = userRes.data[0];

      // If not found, add new user
      if (!existingUser) {
        await axiosInstance.post("/users", userInfo);
      }

      // Fetch again to get role + ID
      const updatedUserRes = await axiosInstance.get(
        `/users?email=${user.email}`
      );
      const fullUser = updatedUserRes.data[0];

      // Generate JWT
      const jwtRes = await axiosInstance.post("/jwt", fullUser);
      localStorage.setItem("fit-access-token", jwtRes.data.token);

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.error("Google Sign-In Error:", err.message);
      toast.error("Google Sign-In failed");
    }
  };

  return (
    <>
      <CustomHelmet title="Login" />
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage: `url('https://i.postimg.cc/DZgpbNZh/kike-vega-F2qh3yjz6-Jk-unsplash.jpg')`,
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
