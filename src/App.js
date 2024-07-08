import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
// import Header from './components/common/Header';
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/Home';
import AddPost from "./pages/addPost";
import Header from './components/common/Header';
// import { route } from '../server/routers/postRoutes';
import ProfilePage from './pages/profile';
import UserInfo from "./pages/userInfo";
import SearchFriend from './components/general/searchUser';
import NotificationsPage from './components/general/notification';


function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/addpost" element={<AddPost/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/info" element={<UserInfo/>} />
        <Route path='/search' element={<SearchFriend/>} />
        <Route path='/notifications' element={<NotificationsPage/>} />

      </Routes>
    </div>
  );
}

export default App;
