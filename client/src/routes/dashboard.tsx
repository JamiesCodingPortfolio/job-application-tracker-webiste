import { useNavigate } from "react-router";

const Dashboard = () => {

    const navigate = useNavigate();

    // const fetchDashboard = async () => {
    //     try {
    //         const response = await fetch('/api/applications', {
    //             method: 'GET',
    //             credentials: 'include'
    //         });
    //     } catch (error) {
            
    //     }
    // }

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
        <div className='h-screen w-screen flex flex-col items-center justify-center gap-10 bg-emerald-950'>
            <div className="top-header flex w-full h-10% absolute top-0 justify-center">
                <button 
                    onClick={handleLogout}
                    className='absolute right-8 top bg-[#E2848C] text-white rounded-lg p-3 hover:bg-[#d8737b] transition-colors cursor-pointer shadow-md hover:shadow-lg active:scale-95'
                >
                    <h2>Logout</h2>
                </button>
            </div>
            <h1>
                Dashboard
            </h1>
        </div>
    )
}

export default Dashboard