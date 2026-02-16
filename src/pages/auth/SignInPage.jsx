import { SignIn } from "@clerk/clerk-react";
import React from "react";

const SignInPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
        </div>
    );
};

export default SignInPage;
