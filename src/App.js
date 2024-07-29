import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MyDispatchContext , MyUserContext} from './configs/Context';
import MyUserReducer from './configs/Reducers';
import {useReducer } from 'react';
import './index.css'; 
import Header from "./component/Header";
import Footer from "./component/Footer";
import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SignUp";
// import RegisterApplicant from "./pages/Register/RegisterApplicant";
// import RegisterEmployer from "./pages/Register/RegisterEmployer";
import Home from "./pages/Home";
import Destination from "./pages/Destination/Destination"
import DestinationDetail from './pages/Destination/DestinationDetail';
import PlaceDetail from './pages/Place/PlaceDetail';

function MyTab() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="19411555949-o6cesuh7bg7rl8u06v5679ldjssbeg59.apps.googleusercontent.com">
        <div>
          <Header />
          <main className="flex-grow mt-16">
            <Routes>
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<SignUp />} />
              {/* <Route path="/register-applicant" element={<RegisterApplicant />} />
              <Route path="/register-employer" element={<RegisterEmployer />} /> */}
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destination/>} />
              <Route path="/destination-detail/:destinationId" element={<DestinationDetail/>} />
              <Route path="/destination/:destinationId/places/:placeId" element={<PlaceDetail/>} />

              <Route path="*" element={() => <div>404 Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GoogleOAuthProvider>
    </Router>
  );
}

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <MyTab />
        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
  );
};

export default App;