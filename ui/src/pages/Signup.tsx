import React, { useEffect } from "react";
import Card from "../components/Card";

import { useForm, type FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center">
      <div className="mt-40">
        <Card>
          <h1 className="text-center text-4xl font-semibold text-emerald-600">
            Signup
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col mt-2 gap-2">
              <label>Email</label>
              <input
                {...register("email")}
                className="px-2 py-4 bg-slate-100 rounded border border-neutral-200"
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col mt-2 gap-2 ">
              <label>Password</label>
              <input
                type="password"
                {...register("password")}
                className="px-2 py-4 bg-slate-100 rounded border border-neutral-200"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 rounded-md text-slate-200 font-semibold text-lg mt-4 hover:bg-emerald-700 cursor-pointer border-neutral-200"
            >
              Signup
            </button>

            <p className="">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
