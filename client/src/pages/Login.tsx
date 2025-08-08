import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { setUser, setToken } from "../states/slice";
import { AlertCircle, Loader, BrainCog } from "lucide-react";
import Register from "../components/Register";

function Login() {
  const [pageType, setPageType] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const apiUrl = import.meta.env.VITE_SERVER_URL;

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const registerSchema = yup.object().shape({
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const initialValuesLogin = { email: "", password: "" };
  const initialValuesRegister = { name: "", email: "", password: "" };

  async function handleLogin(values: any, onSubmitProps: any) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");
      if (data.user && data.token) {
        dispatch(setUser(data.user));
        dispatch(setToken(data.token));
        onSubmitProps.resetForm();
        navigate("/");
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegister(values: any, onSubmitProps: any) {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");
      setPageType("login");
      setError("Registration successful! Please login.");
      onSubmitProps.resetForm();
    } catch (err) {
      setError("Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleFormSubmit(values: any, onSubmitProps: any) {
    isLogin ? await handleLogin(values, onSubmitProps) : await handleRegister(values, onSubmitProps);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto mb-4 w-fit p-3 bg-blue-600 rounded-full">
            <BrainCog className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">{isLogin ? "Sign In" : "Register"}</h1>
          <p className="text-sm text-gray-400">{isLogin ? "Enter your credentials" : "Create a new account"}</p>
        </div>

        {error && (
          <div className="mb-4 flex items-start space-x-2 bg-red-900/50 border border-red-700 rounded-lg p-3">
            <AlertCircle className="text-red-400 mt-0.5" size={18} />
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
          validationSchema={isLogin ? loginSchema : registerSchema}
          enableReinitialize
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm }) => (
            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <Register
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                />
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  placeholder="Enter your email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  type="email"
                  disabled={isLoading}
                  className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                />
                {touched.email && errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  placeholder="Enter your password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  disabled={isLoading}
                  className="w-full p-3 rounded-md bg-slate-700 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                />
                {touched.password && errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader className="animate-spin" size={18} />
                    <span>{isLogin ? "Signing In..." : "Creating Account..."}</span>
                  </>
                ) : (
                  <span>{isLogin ? "Sign In" : "Create Account"}</span>
                )}
              </button>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setPageType(isLogin ? "register" : "login");
                    resetForm();
                    setError("");
                  }}
                  disabled={isLoading}
                  className="text-blue-400 hover:text-blue-300 text-sm underline disabled:opacity-50"
                >
                  {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
