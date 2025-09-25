import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router"

const Signup = () => {

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      const domain = import.meta.env.DOMAIN_NAME
      ? (import.meta.env.VITE_DOMAIN_NAME as string)
      : 'http://localhost:8080'

      console.log ("Domain Name: ", domain);

      const response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({
          email,
          password,
          name
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup Failed");
      }

      setMessage (data.Message);
      setIsError(false);
      setEmail('');
      setPassword('');
      setName('');

      navigate('/dashboard')
      
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      setMessage(message);
      setIsError(true);
    }
  }
  return (
    <div className='h-screen w-screen flex flex-row items-center justify-center gap-10 bg-emerald-950'>
      <form className="flex flex-col items-center justify-start gap-y-2 px-8" onSubmit={handleSubmit}>
        <label htmlFor="name" className="text-gray-400">Name</label>
        <input 
          type="text"
          id="name"
          name="name"
          className="border rounded-lg p-2 text-center"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          placeholder="Enter a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </form>
    </div>
  )
}

export default Signup