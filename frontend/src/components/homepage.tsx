// pages/HomePage.tsx
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./homepage.css";

function HomePage() {
  return (
    <div className = "buttons-container">
      <h1 className="title">Profiles Management System</h1>
      <h2 className = "subtitle">HOME PAGE</h2>
      <Button 
        variant="contained" 
        className="homepageButtons" 
        component={Link} 
        to="/listpage"
      >
        User profiles List
      </Button>
      <Button 
        variant="contained" 
        className="homepageButtons" 
        component={Link} 
        to="/userDocs"
      >
        User Documents List
      </Button>
      <Button 
        variant="contained" 
        className="homepageButtons" 
        component={Link} 
        to="/upload"
      >
        Upload User Documents 
      </Button>
    </div>
  );
}

export default HomePage;
