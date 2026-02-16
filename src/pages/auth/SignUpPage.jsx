import { SignUp } from "@clerk/clerk-react";
import React from "react";

const SignUpPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
        </div>
    );
};

export default SignUpPage;
