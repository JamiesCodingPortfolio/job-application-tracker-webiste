import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface Application {
  jobName: string,
  jobDesc: string,
  state: string,
  createdAt: Date
}

const Dashboard = () => {
  
  const [apps, setApps] = useState<Application[]>([]);
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

      if (response.status === 401){
        throw new Error (response.statusText);
      }

      const data = await response.json();

      if(Array.isArray(data.applications)) {
        setApps(data.applications);
        if(data.applications.length === 0){
          navigate('/new-application');
        }
      } else {
        console.error('Invalid applications data:', data.applications);
        setApps([]);
        navigate('/new-application');
      }

      console.log(data);
    } catch (error) {
      console.error("An error occured:", error);
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
    <div className='h-screen w-screen flex flex-col items-center justify-start gap-10 p-[1%]'>
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
            Application Dashboard
        </h1>
      </div>
      <div className="h-full mt-4 overflow-scroll">
        {apps.length === 0 ?  (
          <div className="text-gray-500 text-center">No applications created!</div>
        ) : (
          apps.map((app, index) => (
            <div
            key={index}
            className="application-card bg-gray-50 rounded-lg p-4 mb-3"
            >
              <div className="application-content">
                <div className="font-semibold text-lg text-[#E2848C]">
                  <h1>Job Name: {app.jobName}</h1>
                </div>
                <div>
                  <h1>Description: {app.jobDesc}</h1>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard