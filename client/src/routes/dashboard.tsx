import { useNavigate } from "react-router";

const Dashboard = () => {

    const navigate = useNavigate();

    const fetchDashboard = async () => {
        try {
            const response = await fetch('/api/applications', {
                method: 'GET',
                credentials: 'include'
            });
        } catch (error) {
            
        }
    }

    return (
        <div>Dashboard</div>
    )
}

export default Dashboard