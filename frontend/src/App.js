import "./App.css";
import Home from "./pages/home/home.js";
import Login from "./pages/login_register/login.js";
import Register from "./pages/login_register/register.js";
import NewCard from "./pages/newcard/newcard.js";
import Review from "./components/review/review.js";
import EditCard from "./pages/editannounce/editannounce.js";
import AddReview from "./pages/review/review.js";
import EditReview from "./pages/editreview/editreview.js";
import NotFound from "./pages/notfound/notfound.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AnnounceView from "./pages/announceview/announceview.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/login" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />
          <Route path="/add" element={<NewCard></NewCard>} />
          <Route path="/review" element={<Review></Review>} />
          <Route path="/announce/:id" element={<AnnounceView></AnnounceView>} />
          <Route path="/announce/edit/:id" element={<EditCard></EditCard>} />
          <Route
            path="/announce/:id/review"
            element={<AddReview></AddReview>}
          />
          <Route
            path="/announce/:idannounce/review/edit/:id"
            element={<EditReview></EditReview>}
          />
          <Route path="*" element={<NotFound></NotFound>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
