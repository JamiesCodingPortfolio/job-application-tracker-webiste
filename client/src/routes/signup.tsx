import { useState, FormEvent } from "react";
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
          "Content type": "application/json",
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

    </div>
  )
}

export default Signup