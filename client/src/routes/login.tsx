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

      <label htmlFor="email" className="text-gray-400">Email</label>
      <input 
      type="email"
      id="email"
      name="email"
      className="border rounded-lg p-2 text-center"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      />

      <label htmlFor="password" className="text-gray-400">Password</label>
      <input 
      type="password"
      id="password"
      name="password"
      className="border rounded-lg p-2 text-center"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      />

      <button 
        type="submit"
        className="bg-[#E2848C] text-white rounded-lg p-2 mt-4 hover:bg-[#d8737b] transition-colors"
      >
        Login
      </button>

      {message && (
        <div className={`mt-2 p-2 rounded ${isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message}
        </div>
      )}
      </form>
    </div>
  )
}

export default Login