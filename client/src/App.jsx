import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext/UserContext';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
    <UserProvider>
      <BrowserRouter> 
        <Header/>
        <Main className='main'/>
        <Footer/>
      </BrowserRouter>
    </UserProvider>  
    </>
  )
}

export default App
