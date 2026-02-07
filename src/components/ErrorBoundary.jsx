import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-gray-900">
          <div className="rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
            <h1 className="mb-4 text-4xl font-bold text-red-500">Oops!</h1>
            <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
              Something went wrong.
            </p>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-black p-2 rounded max-w-md overflow-auto">
               {this.state.error?.message || "Unknown error"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
