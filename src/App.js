import Constrution from './Pages/MainWebPages/Construction/Construction'
import "./App.css";
import ContactPage from "./Pages/MainWebPages/ContactPage/ContactPage";
import HomePage from "./Pages/MainWebPages/HomePage/HomePage";
import IntroPage from "./Pages/IntroPage/IntroPage";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminHome from './Pages/AdminDashboard/AdminHome/AdminHome';
import CustomerList from './Pages/AdminDashboard/CustomerList/CustomerList';
import AdminSettings from './Pages/AdminDashboard/AdminSettings/AdminSettings';
import ServiceProviderList from './Pages/AdminDashboard/ServiceProviderList/ServiceProviderList';
import BookingList from './Pages/AdminDashboard/BookingList/BookingList';
import AdminVerification from './Pages/AdminDashboard/AdminVerification/AdminVerification';
import AdminFeedback from './Pages/AdminDashboard/AdminFeedback/AdminFeedback';
import AdminMonitoring from './Pages/AdminDashboard/AdminMonitoring/AdminMonitoring';
import Electric from './Pages/MainWebPages/Electric/Electric';
import Electronic from './Pages/MainWebPages/Electronic/Electronic';
import Eventmanagement from './Pages/MainWebPages/Eventmanagement/Eventmanagement';
import ProviderHome from './Pages/ServiceProviderDashboard/ProviderHome/ProviderHome';
import ProviderFeedback from './Pages/ServiceProviderDashboard/ProviderFeedback/ProviderFeedback';
import ProviderNotifications from './Pages/ServiceProviderDashboard/ProviderNotifications/ProviderNotifications';
import ProviderFinance from './Pages/ServiceProviderDashboard/ProviderFinance/ProviderFinance';
import CustomerMain from './Pages/CustomerDashboard/CustomerMain/CustomerMain';
import CustomerNotification from './Pages/CustomerDashboard/CustomerNotifications/CustomerNotification';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import ProviderContact from './Pages/ServiceProviderDashboard/ProviderContact/ProviderContact';
import ProviderIntro from './Pages/ServiceProviderDashboard/ProviderIntro';
import CustomerFeedbackSection from './Pages/CustomerDashboard/CustomerFeedbackSection/CustomerFeedbackSection';
import ProviderFeedbackSection from './Pages/ServiceProviderDashboard/ProviderFeedbackSection';


function App() {
  return (
    <div className="app">
       <Router>
        <ScrollToTop />
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
          <Route path="/adminmonitoring" exact Component={AdminMonitoring} />
          <Route path='/providerIntro' exact Component={ProviderIntro} />
          <Route path='/providerhome' exact Component={ProviderHome} />
          <Route path='/providerfeedback' exact Component={ProviderFeedback} />
          <Route path='/providernotifications' exact Component={ProviderNotifications} />
          <Route path='/providerfinance' exact Component={ProviderFinance} />
          <Route path='/providercontact' exact Component={ProviderContact} />
          <Route path='/providerfeedbacksection' exact Component={ProviderFeedbackSection} />
          <Route path='/customeraccountsettings' exact Component={CustomerMain} />
          <Route path='/customernotifications' exact Component={CustomerNotification} />
          <Route path='/customerfeedbacksection' exact Component={CustomerFeedbackSection} />
        </Routes>
       </Router>
    </div>
  );
}

export default App;
