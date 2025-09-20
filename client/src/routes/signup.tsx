import { useState, FormEvent } from "react";

const Signup = () => {

  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      
    } catch (error) {
      
    }
  }
  return (
    <div>Signup</div>
  )
}

export default Signup