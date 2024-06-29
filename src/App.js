import Constrution from './Pages/Construction/Construction'
import "./App.css";
import ContactPage from "./Pages/ContactPage/ContactPage";
import HomePage from "./Pages/HomePage/HomePage";
import IntroPage from "./Pages/IntroPage/IntroPage";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminHome from './Pages/AdminHome/AdminHome';
import CustomerList from './Pages/CustomerList/CustomerList';
import AdminSettings from './Pages/AdminSettings/AdminSettings';
import ServiceProviderList from './Pages/ServiceProviderList/ServiceProviderList';
import BookingList from './Pages/BookingList/BookingList';
import AdminVerification from './Pages/AdminVerification/AdminVerification';
import AdminFeedback from './Pages/AdminFeedback/AdminFeedback';
import AdminMessages from './Pages/AdminMessages/AdminMessages';
import AdminMonitoring from './Pages/AdminMonitoring/AdminMonitoring';
import Electric from './Pages/Electric/Electric';
import Electronic from './Pages/Electronic/Electronic';
import Eventmanagement from './Pages/Eventmanagement/Eventmanagement';


function App() {
  return (
    <div className="app">
       <Router>
        <Routes>
          <Route path="/" exact Component={IntroPage} />
          <Route path="/home" exact Component={HomePage} />
          <Route path="/contact" exact Component={ContactPage} />
          <Route path="/construction" exact Component={Constrution} />
          <Route path="/electric" exact Component={Electric} />
          <Route path="/electronic" exact Component={Electronic} />
          <Route path="/eventmanagement" exact Component={Eventmanagement} />
          <Route path="/adminhome" exact Component={AdminHome} />
          <Route path="/admincustomerlist" exact Component={CustomerList} />
          <Route path="/adminproviderlist" exact Component={ServiceProviderList} />
          <Route path="/adminsettings" exact Component={AdminSettings} />
          <Route path="/adminbookings" exact Component={BookingList} />
          <Route path="/adminverification" exact Component={AdminVerification} />
          <Route path="/adminfeedbacks" exact Component={AdminFeedback} />
          <Route path="/adminmessages" exact Component={AdminMessages} />
          <Route path="/adminmonitoring" exact Component={AdminMonitoring} />
        </Routes>
       </Router>
    </div>
  );
}

export default App;
