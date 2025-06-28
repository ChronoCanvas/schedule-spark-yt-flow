
import React from "react";
import { SignIn1 } from "@/components/ui/modern-stunning-sign-in";
import { useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleModeChange = (mode: 'signin' | 'signup') => {
    if (mode === 'signin') {
      navigate('/login');
    }
  };

  return <SignIn1 mode="signup" onModeChange={handleModeChange} />;
};

export default SignupPage;
