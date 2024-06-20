import "./home.css";
import Card from "../../components/card/card.js";
import Navbar from "../../components/navbar/navbar.js";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/add");
  };

  return (
    <div className="home">
      <Navbar />
      <div className="content">
        <button className="new_card_button" onClick={handleClick}>
          New Card
        </button>
      </div>
      <Card />
    </div>
  );
}

export default Home;
