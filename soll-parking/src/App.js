import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import AppContainer from './layout/AppContainer';
import SearchPage from './page/SearchPage';
import SignupPage from './page/SignupPage';
import FindPasswordPage from './page/FIndPasswordPage';
import FavoritePage from './page/FavoritePage';
import AroundSearchPage from './page/AroundSearchPage';
<<<<<<< HEAD
import CustomParkingPage from './page/CustomParkingPage';

=======
>>>>>>> 5d634bfd2e0a3e6cfe6f6fe6ac8582c3fe804386
import LoginProvider from './store/LoginProvider';
import PlaceDetailPage from './page/PlaceDetailPage';
// Router를 통해 URL마다 페이지 제작
const router = createBrowserRouter([

  { path : '/' , 
    element : <MainPage/>, 
  },
  {
    path : '/login',
    element : <LoginPage/>
  },
  {
    path : '/signup',
    element : <SignupPage/>
  },
  {
    path : '/findPassword',
    element : <FindPasswordPage/>
  },
  {
    path : '/search',
    element : <SearchPage/>
  }, 
  {
    path : '/favorite',
    element : <FavoritePage/>
  },
  {
    path : '/around',
    element : <AroundSearchPage/>
  },
  {
<<<<<<< HEAD
    path: '/custom',
    element : <CustomParkingPage/>
  },
=======
    path : '/detail',
    element : <PlaceDetailPage/>
  },

>>>>>>> 5d634bfd2e0a3e6cfe6f6fe6ac8582c3fe804386

]);


function App() {
  return (
    <LoginProvider>
      <AppContainer>
        <RouterProvider router={router}/>
      </AppContainer>
    </LoginProvider>
  );
}

export default App;
