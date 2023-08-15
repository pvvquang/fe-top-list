"use client";

import TextField from "@/components/atoms/inputs/TextField";
import { ApiConstant, AppConstant, PathConstant } from "@/constants";
import Toast from "@/libs/toastify";
import { login } from "@/services/auth.service";
import { HttpCode } from "@/types/api.type";
import { LoginFormState } from "@/types/auth.type";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";

const initialFormState = {
  email: "",
  password: "",
};

function Login() {
  const router = useRouter();

  const [form, setForm] = useState<LoginFormState>(initialFormState);

  const handleFieldChange = (value: string, keyName: string) => {
    setForm((prev) => ({ ...prev, [keyName]: value }));
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await login(form);
      if (response.status === HttpCode.OK) {
        Toast.success({ message: response.data.message });
        router.push(PathConstant.ROUTE_ADMIN);
        localStorage.setItem(
          ApiConstant.ACCESS_TOKEN,
          response.data.accessToken
        );
        localStorage.setItem(
          ApiConstant.REFRESH_TOKEN,
          response.data.refreshToken
        );
      }
    } catch (err: any) {
      Toast.error({ message: err.response.data.message });
    }
  };

  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gradient-alchemist-lab">
      <div className="px-6 py-8 min-w-[450px] shadow-xl mx-auto mt-[-100px] rounded-xl bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <TextField
              label="Email Address"
              type="email"
              placeholder="Enter your email..."
              keyName="email"
              value={form.email}
              onChange={handleFieldChange}
            />
            <TextField
              label="Password"
              type="password"
              placeholder="Enter your password..."
              keyName="password"
              value={form.password}
              onChange={handleFieldChange}
            />

            <div>
              <button
                onClick={handleLogin}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
