import './App.css'
import { BrowserRouter, Routes, Route, Link } from "react-router";
import Login from "./routes/login"; 
import Signup from "./routes/signup";
import Dashboard from './routes/dashboard';

function Home() {
  return (
    <div className='h-screen w-screen flex flex-row items-center justify-center gap-10 bg-emerald-950'>
      <Link
        to="/login"
        className="w-[30%] h-[20%] flex items-center justify-center text-center bg-gray-100 rounded-lg"
      >
        <h1 className="text-2xl">Login</h1>
      </Link>
      <Link
        to="/signup"
        className="w-[30%] h-[20%] flex items-center justify-center text-center bg-gray-100 rounded-lg"
      >
        <h1 className="text-2xl">Signup</h1>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="h-screen w-screen flex flex-col items-center justify-center gap-10 bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
