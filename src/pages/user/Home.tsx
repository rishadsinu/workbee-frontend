import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import Navbar from "@/components/user/navbar";

const Home = () => {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar/>
      <h1>Home Page</h1>

      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button onClick={() => navigate("/login")}>Login</Button>
      </div>
      
    </div>
  );
};

export default Home;
