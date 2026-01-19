import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { useToast } from "../components/toast/ToastProvider";
import { register } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const AuthForm = () => {
  const { login, loading, isAuthenticated } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username:"",
  });

  const toast = useToast();
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
      console.log("Logging in with:", {
        email: formData.email,
        password: formData.password,
      });

      await login({ email: formData.email, password: formData.password });
      
      
      
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!");
        return;
      }
      await register({ formData });
      console.log("Registering with:", formData);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* left Side - Simple Form */}
        <div className="w-full flex-1/2 overflow-scroll no-scrollbar">
          <div className="w-full bg-white">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mr-3"
                  style={{ backgroundColor: "#FD7B41" }}
                >
                  <span className="text-xl font-bold text-white">S</span>
                </div>
                {/* <div>
                  <h1
                    className="text-2xl font-bold"
                    style={{ color: "#3C4044" }}
                  >
                    Spectrum
                  </h1>
                  <p className="text-sm" style={{ color: "#3C4044" }}>
                    Authentication
                  </p>
                </div> */}
              </div>
              <h2 className="text-2xl font-bold" style={{ color: "#3C4044" }}>
                {isLogin ? "Welcome Back" : "Join Us"}
              </h2>
            </div>

            {/* Form Container */}
            <div className="p-4 flex-col justify-items-center">
              {/* Toggle */}
              <div className="flex mb-8 w-[80%]">
                <button
                  onClick={() => setIsLogin(true)}
                  disabled={loading}
                  className={`flex-1 py-3 text-center font-medium rounded-l-xl transition-colors flex justify-center items-center ${
                    isLogin ? "text-white" : ""
                  }`}
                  style={{
                    backgroundColor: isLogin ? "#FD7B41" : "#F5F5F5",
                    color: isLogin ? "white" : "#3C4044",
                  }}
                >
                  Sign In
                </button>

                <button
                  onClick={() => setIsLogin(false)}
                  disabled={loading}
                  className={`flex-1 py-3 text-center font-medium rounded-r-xl transition-colors flex justify-center items-center ${
                    !isLogin ? "text-white" : ""
                  }`}
                  style={{
                    backgroundColor: !isLogin ? "#FD7B41" : "#F5F5F5",
                    color: !isLogin ? "white" : "#3C4044",
                  }}
                >
                  Sign Up
                </button>
              </div>

              {/* Simple Form */}
              <form onSubmit={handleSubmit} className="space-y-6 w-[80%]">
                {!isLogin && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 w-full"
                      style={{ color: "#3C4044" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#F9F9F9",
                        borderColor: "#EDBF9B",
                        color: "#3C4044",
                      }}
                      placeholder="Enter your name"
                    />
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2 w-full"
                      style={{ color: "#3C4044" }}
                    >
                      User Name
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#F9F9F9",
                        borderColor: "#EDBF9B",
                        color: "#3C4044",
                      }}
                      placeholder="Enter your username"
                    />
                  </div>
                )}

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#3C4044" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "#F9F9F9",
                      borderColor: "#EDBF9B",
                      color: "#3C4044",
                    }}
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "#3C4044" }}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                    style={{
                      backgroundColor: "#F9F9F9",
                      borderColor: "#EDBF9B",
                      color: "#3C4044",
                    }}
                    placeholder="Enter your password"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "#3C4044" }}
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required={!isLogin}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
                      style={{
                        backgroundColor: "#F9F9F9",
                        borderColor: "#EDBF9B",
                        color: "#3C4044",
                      }}
                      placeholder="Confirm your password"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2"
                        style={{ accentColor: "#FD7B41" }}
                      />
                      <span className="text-sm" style={{ color: "#3C4044" }}>
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium hover:underline"
                      style={{ color: "#FD7B41" }}
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg font-medium transition-all hover:shadow-lg"
                  style={{ backgroundColor: "#FD7B41", color: "white" }}
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
                    className="text-xs text-center mt-4"
                    style={{ color: "#3C4044" }}
                  >
                    By signing up, you agree to our{" "}
                    <button
                      type="button"
                      className="font-medium hover:underline"
                      style={{ color: "#FD7B41" }}
                    >
                      Terms
                    </button>{" "}
                    and{" "}
                    <button
                      type="button"
                      className="font-medium hover:underline"
                      style={{ color: "#FD7B41" }}
                    >
                      Privacy Policy
                    </button>
                  </p>
                )}
              </form>

              {/* Divider */}
              <div className="my-8 relative">
                <div className="absolute inset-0 flex items-center">
                  <div
                    className="w-full border-t"
                    style={{ borderColor: "#EDBF9B" }}
                  ></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white" style={{ color: "#3C4044" }}>
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className="flex-1 py-3 px-4 rounded-lg border flex items-center justify-center font-medium transition-colors hover:shadow"
                  style={{
                    borderColor: "#EDBF9B",
                    color: "#3C4044",
                    backgroundColor: "#F9F9F9",
                  }}
                >
                  <span className="mr-2">G</span>
                  Google
                </button>
                <button
                  type="button"
                  className="flex-1 py-3 px-4 rounded-lg border flex items-center justify-center font-medium transition-colors hover:shadow"
                  style={{
                    borderColor: "#EDBF9B",
                    color: "#3C4044",
                    backgroundColor: "#F9F9F9",
                  }}
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
                  className="text-sm font-medium hover:underline"
                  style={{ color: "#FD7B41" }}
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
          className="hidden flex-1/2 lg:flex lg:w-1/2 relative overflow-hidden justify-center items-center"
          // style={{ backgroundColor: "#3C4044" }}
        >
          <img
            src="public/images/Auth.png"
            alt="bg image"
            className="w-fit h-fit bg-no-repeat"
          />
          <div className="absolute inset-0 mt-10">
            <h1 className="text-3xl font-bold font-sans text-center text-[#3C4044]">
              {isLogin ? <p>Welcome back</p> : <p>Join us</p> }
            </h1>
            <h1 className="text-6xl font-bold font-sans text-center text-shadow-[#FD7B41] text-shadow-lg/30">
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
