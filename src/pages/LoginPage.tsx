
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SignIn1 } from '@/components/ui/modern-stunning-sign-in';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-black"
    >
      <SignIn1 mode={mode} onToggleMode={handleToggleMode} />
    </motion.div>
  );
};

export default LoginPage;
