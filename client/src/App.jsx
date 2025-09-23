import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userContext/UserContext';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
    <UserProvider>
      <Header/>
      <BrowserRouter>   
        <Main className='main'/>
      </BrowserRouter> 
      <Footer/>
    </UserProvider>  
    </>
  )
}

export default App
