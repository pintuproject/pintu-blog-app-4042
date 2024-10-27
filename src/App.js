 
import './App.css';
import Login from './components/Login';
import { Routes,Route } from 'react-router-dom';
import Signup from './components/Signup';
import Home from './components/Home';
import { UserProvider } from './components/UserContext';
import BlogEditor from './components/BlogEditor';
import PrivateRoutes from './components/PrivateRoutes';
import BlogDetail from './components/BlogDetail';

function App() {
  return (
    <>
    <UserProvider>
     <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blog-detail/:id" element={<BlogDetail/>}/>
        <Route element={<PrivateRoutes />}>
            {" "}
            <Route path="/create-blog" element={<BlogEditor />} />
          </Route>
      </Routes>
      </UserProvider>
    </>
  )
}

export default App;
