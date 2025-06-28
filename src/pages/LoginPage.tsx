
import React from "react";
import { SignIn1 } from "@/components/ui/modern-stunning-sign-in";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleModeChange = (mode: 'signin' | 'signup') => {
    if (mode === 'signup') {
      navigate('/signup');
    }
  };

  return <SignIn1 mode="signin" onModeChange={handleModeChange} />;
};

export default LoginPage;
