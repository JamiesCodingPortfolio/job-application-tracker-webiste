import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";

const Login = () => {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
      const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok){
        throw new Error(data.message || 'Login Failed');
      }

      setMessage(data.message);
      setIsError(false);
      setEmail('');
      setPassword('');

      navigate('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occured';
      setMessage(message);
      setIsError(true);
    }
  }
  return (
    <div className='h-screen w-screen flex flex-row items-center justify-center gap-10 bg-emerald-950'>
      <form className="flex flex-col items-center justify-start gap-y-2 px-8" onSubmit={handleSubmit}>

      </form>
    </div>
  )
}

export default Login