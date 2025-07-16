import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { updateProfile } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import CustomHelmet from "../../components/ui/Meta/CustomHelmet";
import { toast } from "react-toastify";
import axios from "axios";
import useAxios from "../../Hooks/useAxios";

const Register = () => {
  const { createUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const storage = getStorage();

  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // const auth = getAuth();
  // const storage = getStorage();

  // Helper to save user in backend & get JWT
  const saveUserAndGetToken = async (email, photoURL) => {
    const userinfo = {
      email,
      role: "user",
      created_at: new Date().toISOString(),
      last_log_in: new Date().toISOString(),
      photoURL,
    };
    await axiosInstance.post("/users", userinfo);
    const { data } = await axios.post("http://localhost:3000/jwt", { email });
    localStorage.setItem("fit-access-token", data.token);
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      const file = data.photo[0]; // Get the uploaded file

      // 1. Create user in Firebase
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // 2. Upload profile pic to Firebase Storage
      const storageRef = ref(
        storage,
        `profilePictures/${user.uid}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          toast.error("Image upload failed");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await updateProfile(user, {
            displayName: data.name,
            photoURL: downloadURL,
          });

          await saveUserAndGetToken(user.email, downloadURL);

          toast.success("Registered & logged in successfully!");
          setUploading(false);
          navigate("/");
        }
      );
    } catch (error) {
      console.error("Registration error:", error.message);
      toast.error("Registration failed. Please try again.");
      setUploading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      // Save user & JWT, photoURL from Firebase user profile
      await saveUserAndGetToken(user.email, user.photoURL || "");

      toast.success("Signed in with Google successfully!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign In Error:", error);
      toast.error("Google sign-in failed");
    }
  };

  return (
    <>
      <CustomHelmet title="Register" />
      <div
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-24"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/DZgpbNZh/kike-vega-F2qh3yjz6-Jk-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm z-0" />

        <div className="relative z-10 w-full max-w-md bg-[rgba(255,255,255,0.15)] backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/30 space-y-6 mx-4">
          <h2 className="text-3xl font-bold text-center text-primary">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your full name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Profile Picture Upload */}
            <div>
              <Label htmlFor="photo">Upload Profile Picture</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                {...register("photo", {
                  required: "Profile picture is required",
                })}
              />
              {errors.photo && (
                <p className="text-sm text-red-500">{errors.photo.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                disabled={uploading}
                className="w-full border-[0.5px] border-[rgba(0,0,0,0.15)] shadow-2xl hover:cursor-pointer"
              >
                {uploading ? "Uploading..." : "Register"}
              </Button>

              <Button
                type="button"
                className="w-full border-[0.5px] border-[rgba(0,0,0,0.15)] shadow-2xl hover:cursor-pointer flex items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
              >
                <FcGoogle size={20} />
                Sign in with Google
              </Button>
            </div>

            <p className="text-sm text-center text-black">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login now!
              </Link>
            </p>

            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Or explore without signing up
              </p>
              <Button
                variant="ghost"
                className="text-blue-500 hover:underline text-sm"
                onClick={() => navigate("/")}
              >
                View Site as Guest
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
