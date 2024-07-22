import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login'
import Signup from './pages/signup'
import Home from './pages/Home';
import AddPost from "./pages/addPost";
import Header from './components/common/Header';
import ProfilePage from './pages/profile';
import UserInfo from "./pages/userInfo";
import SearchFriend from './components/general/searchUser';
import NotificationsPage from './components/general/notification';
import FriendProfile from './pages/friendProfile';
// import LoadingComponent from './components/general/loding';
// import PreHome from './pages/preHome';
import UserCommunication from './components/common/UserCommunication';
import Message from './pages/message';
import Footer from './components/general/footer';

function App() {

  const userId = '668b941b170fb944533bf0b1'
  const friendId = '668b957c170fb944533bf13e'
  return (
    <div className="App">
      <Header/>
      <Routes>
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}

        {/* <Route path="/" element={<Abc/>} /> */}
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/addpost" element={<AddPost/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/info" element={<UserInfo/>} />
        <Route path='/search' element={<SearchFriend/>} />
        <Route path='/notifications' element={<NotificationsPage/>} />
        <Route path='/message' element={<Message/>} />
         <Route path="/friendProfile/:friendId/:friendName" element={<FriendProfile />} />
         <Route path="/communication/:friendId/:friendName" element={<UserCommunication/>} />

         <Route path = "/footer" element={<Footer/>}/>


         {/* <Route path="message" element={<ChatComponent userId={userId} friendId={friendId} />} /> */}






         {/* <Route path="/" element={<LoadingComponent/>} /> */}
         {/* <Route path="/communication/:friendId/:friendName" element={<Message/>} /> */}

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
