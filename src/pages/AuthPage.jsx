import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const AuthForm = () => {
  const { login, loading, isAuthenticated } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [isRemember, setIsRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
  });
  // console.log(isRemember);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // console.log("Logging in with:", {
      //   email: formData.email,
      //   password: formData.password,
      // });

      await login({ email: formData.email, password: formData.password, }, isRemember);



    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.warn("Passwords don't match!");
        return;
      }

      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(formData.password)) {
        toast.warn("Password must be at least 8 characters, include uppercase, lowercase, number, and special character.");
        return;
      }

      await register({ formData });

      toast.success("Registration successful! Please check your email to verify your account.");

      navigate("/");
    }
  };

  return (
    <div className="min-h-screen sm:pt-10 transition-colors duration-300 bg-white dark:bg-gray-900">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* left Side - Simple Form */}
        <div className="w-full flex-1/2 overflow-scroll no-scrollbar bg-white dark:bg-gray-900">
          <div className="w-full bg-white dark:bg-gray-900">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8 pt-8">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 bg-[#FD7B41]"
                >
                  <span className="text-xl font-bold text-white">S</span>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-[#3C4044] dark:text-white">
                {isLogin ? "Welcome Back" : "Join Us"}
              </h2>
            </div>

            {/* Form Container */}
            <div className="p-4 flex flex-col items-center w-full">
              {/* Toggle */}
              <div className="flex mb-8 w-full max-w-md">
                <button
                  onClick={() => setIsLogin(true)}
                  disabled={loading}
                  className={`flex-1 py-3 text-center font-medium rounded-l-xl transition-colors flex justify-center items-center ${isLogin ? "text-white bg-[#FD7B41]" : "text-[#3C4044] dark:text-gray-300 bg-[#F5F5F5] dark:bg-gray-800"
                    }`}
                >
                  Sign In
                </button>

                <button
                  onClick={() => setIsLogin(false)}
                  disabled={loading}
                  className={`flex-1 py-3 text-center font-medium rounded-r-xl transition-colors flex justify-center items-center ${!isLogin ? "text-white bg-[#FD7B41]" : "text-[#3C4044] dark:text-gray-300 bg-[#F5F5F5] dark:bg-gray-800"
                    }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Simple Form */}
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                {!isLogin && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 w-full text-[#3C4044] dark:text-gray-200"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-[#F9F9F9] dark:bg-gray-800 border-[#EDBF9B] dark:border-gray-700 text-[#3C4044] dark:text-white dark:focus:ring-[#FD7B41]"
                      placeholder="Enter your name"
                    />
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 w-full text-[#3C4044] dark:text-gray-200"
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-[#F9F9F9] dark:bg-gray-800 border-[#EDBF9B] dark:border-gray-700 text-[#3C4044] dark:text-white dark:focus:ring-[#FD7B41]"
                      placeholder="Enter your username"
                    />
                  </div>
                )}

                <div>
                  <label
                    className="block text-sm font-medium mb-2 text-[#3C4044] dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-[#F9F9F9] dark:bg-gray-800 border-[#EDBF9B] dark:border-gray-700 text-[#3C4044] dark:text-white dark:focus:ring-[#FD7B41]"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2 text-[#3C4044] dark:text-gray-200"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-[#F9F9F9] dark:bg-gray-800 border-[#EDBF9B] dark:border-gray-700 text-[#3C4044] dark:text-white dark:focus:ring-[#FD7B41]"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#FD7B41]"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 text-[#3C4044] dark:text-gray-200"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={!isLogin}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all bg-[#F9F9F9] dark:bg-gray-800 border-[#EDBF9B] dark:border-gray-700 text-[#3C4044] dark:text-white dark:focus:ring-[#FD7B41]"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#FD7B41]"
                      >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name='isRemember'
                        checked={isRemember}
                        onChange={(e) => setIsRemember(e.target.checked)}
                        className="w-4 h-4 mr-2 accent-[#FD7B41]"
                      />
                      <span className="text-sm text-[#3C4044] dark:text-gray-300">
                        Remember me for seven day
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => navigate('/forgot-password')}
                      className="text-sm font-medium hover:underline text-[#FD7B41]"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-medium transition-all hover:shadow-lg bg-[#FD7B41] text-white"
                >
                  {loading ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin"
                    />
                  ) : (
                    <>{isLogin ? "Sign In" : "Create Account"}</>
                  )}
                </button>

                {!isLogin && (
                  <p
                    className="text-xs text-center mt-4 text-[#3C4044] dark:text-gray-400"
                  >
                    By signing up, you agree to our{" "}
                    <button
                      type="button"
                      className="font-medium hover:underline text-[#FD7B41]"
                    >
                      Terms
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-medium hover:underline text-[#FD7B41]"
                    >
                      Privacy Policy
                    </button>
                  </p>
                )}
              </form>

              {/* Divider */}
              <div className="my-8 relative w-full max-w-md">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="w-full border-t border-[#EDBF9B] dark:border-gray-700"
                  ></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-[#3C4044] dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="flex space-x-4 w-full max-w-md">
                <button
                  type="button"
                  className="flex-1 py-3 px-4 rounded-lg border flex items-center justify-center font-medium transition-colors hover:shadow border-[#EDBF9B] dark:border-gray-700 text-[#3C4044] dark:text-gray-200 bg-[#F9F9F9] dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span className="mr-2">G</span>
                  Google
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 px-4 rounded-lg border flex items-center justify-center font-medium transition-colors hover:shadow border-[#EDBF9B] dark:border-gray-700 text-[#3C4044] dark:text-gray-200 bg-[#F9F9F9] dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <span className="mr-2">Git</span>
                  GitHub
                </button>
              </div>

              {/* Toggle Link */}
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm font-medium hover:underline text-[#FD7B41]"
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* right Side - Pattern Section */}
        <div
          className="hidden flex-1/2 lg:flex lg:w-1/2 relative overflow-hidden justify-center items-center bg-white dark:bg-gray-900"
        >
          <img
            src="https://img.berojgarfounder.com/website.content/Auth.png"
            alt="bg image"
            className="w-fit h-fit bg-no-repeat dark:hidden"
          />
          <img
            src="https://img.berojgarfounder.com/website.content/Auth_dark.png"
            alt="bg image"
            className="w-fit h-fit bg-no-repeat hidden dark:block "
          />
          <div className="absolute inset-0 mt-10">
            <h1 className="text-3xl font-bold font-sans text-center text-[#3C4044] dark:text-white">
              {isLogin ? <p>Welcome back</p> : <p>Join us</p>}
            </h1>
            <h1 className="text-6xl font-bold font-sans text-center text-shadow-[#FD7B41] text-shadow-lg/30 text-black dark:text-white">
              {" "}
              <span className="text-red-500">Be</span>rojgar Founder
            </h1>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
