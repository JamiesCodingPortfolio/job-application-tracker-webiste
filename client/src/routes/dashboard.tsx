import { useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {

    const navigate = useNavigate();

    useEffect(() => {
      fetchDashboard();
    })

    const fetchDashboard = async () => {
        try {
            const response = await fetch('/api/applications', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (error) {
            
        }
    }

    const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

    return (
      <div className='h-screen w-screen flex flex-col items-center justify-center gap-10 p-[2.5%]'>
        <div className="top-header relative w-full flex justify-end">
            <button 
                onClick={handleLogout}
                className='right-8 bg-[#E2848C] text-white rounded-lg p-3 hover:bg-[#d8737b] transition-colors cursor-pointer shadow-md hover:shadow-lg active:scale-95'
            >
                <h2>Logout</h2>
            </button>
        </div>
        <div>
          <h1>
              Dashboard
          </h1>
        </div>
      </div>
    )
}

export default Dashboard