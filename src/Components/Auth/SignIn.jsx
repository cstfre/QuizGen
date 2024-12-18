import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
} from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();

  const signIn = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when signing in

    // Check if the email exists in the database


    // Email exists, proceed with sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false); // Set loading to false after successful login
        navigate("/main");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setLoading(false); // Set loading to false if login fails
        setNotification("Incorrect email or password. Please try again.");
        // hide notification after 3 seconds
        setTimeout(() => {
          setNotification("");
        }, 3000);
      });
  };

  // sign in with google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Signed in with Google, redirect to Dashboard
        navigate("/main");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        setNotification(
          "An error occurred while signing in with Google. Please try again."
        );
        // hide notification after 3 seconds
        setTimeout(() => {
          setNotification("");
        }, 3000);
      });
  };

  return (
    <div className="fullscreen">
      <section className="flex flex-col md:flex-row h-screen items-center">
        {/* Left Side */}
        <div className="bg-blue-600 hidden lg:block w-full md:w-1/2">
          <img
            src="/Assets/Extra-Assets/Quote2.jpg"
            alt="img of quote"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side */}
        <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
          <div className="w-full h-100">
            <img
              src="/Assets/Extra-Assets/Logo.png"
              alt="logo"
              width={150}
              height={200}
              className="mx-auto"
            />

            <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
              Log in to your account
            </h1>

            <form className="mt-6" onSubmit={signIn}>
              {/* Email input */}
              <div>
                <label className="block text-gray-700">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="off"
                  required
                />
              </div>

              {/* Password input */}
              <div className="mt-4">
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  minLength="6"
                  className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  required
                />
              </div>

              {/* Forgot password link */}
              <div className="text-right mt-2">
                {/* Update the link to navigate to the "Forgot Password" page */}
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            {/* Sign in with Google button */}
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300 mt-4"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible" />
                  </clipPath>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
                <span className="ml-4">Log in with Google</span>
              </div>
            </button>

            {/* Sign up link */}
            <p className="mt-8">
              Need an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Create an account
              </Link>
            </p>

            {/* Display notification */}
            {notification && (
              <div className="fixed bottom-0 left-0 right-0 bg-red-500 text-white text-center py-2">
                {notification}
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-50 z-50">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
