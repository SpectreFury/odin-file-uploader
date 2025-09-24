import Card from "../components/Card";

import { useForm, type FieldValues } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="mt-40">
        <Card>
          <h1 className="text-center text-4xl font-semibold text-emerald-600">
            Login
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
                {...register("password")}
                className="px-2 py-4 bg-slate-100 rounded border border-neutral-200"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-emerald-600 rounded-md text-slate-200 font-semibold text-lg mt-4 hover:bg-emerald-700 cursor-pointer border-neutral-200"
            >
              Login
            </button>

            <p className="">Don't have an account? <a>Sign up</a></p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
