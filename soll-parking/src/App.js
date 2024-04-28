import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from './page/MainPage';
import LoginPage from './page/LoginPage';
import AppContainer from './layout/AppContainer';
import SearchPage from './page/SearchPage';

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
    path : '/search',
    element : <SearchPage/>
  }
]);


function App() {
  return (
    <AppContainer>
      <RouterProvider router={router}/>
    </AppContainer>

  );
}

export default App;
