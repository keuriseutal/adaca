import {Button, Input} from '@atoms';
import {useState} from 'react';

export const LoginSignupTemplate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupMode, setIsSignupMode] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here, e.g., making an API call
    console.log('Logging in with email:', email, 'and password:', password);
  };

  const handleSignup = () => {
    // Implement your signup logic here, e.g., making an API call
    console.log('Signing up with email:', email, 'and password:', password);
  };

  return (
    <div>
      <h2>{isSignupMode ? 'Signup' : 'Login'}</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <Button onClick={isSignupMode ? handleSignup : handleLogin}>
        {isSignupMode ? 'Signup' : 'Login'}
      </Button>
      <p onClick={() => setIsSignupMode(!isSignupMode)}>
        {isSignupMode
          ? 'Already have an account? Login'
          : "Don't have an account? Signup"}
      </p>
    </div>
  );
};
