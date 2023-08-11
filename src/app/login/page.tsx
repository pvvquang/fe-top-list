"use client";

import { useState } from "react";
import TextField from "@/components/atoms/inputs/TextField";

interface LoginFormState {
  email: string;
  password: string;
}
const initialFormState = {
  email: "",
  password: "",
};

function Login() {
  const [form, setForm] = useState<LoginFormState>(initialFormState);

  const handleFieldChange = (value: string, keyName: string) => {
    setForm((prev) => ({ ...prev, [keyName]: value }));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
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
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
