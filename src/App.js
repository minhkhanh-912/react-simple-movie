import { Fragment , lazy , Suspense} from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import 'swiper/css';
import Banner from "./components/Banner/Banner";
import Main from "./components/layout/Main";
import MoviesPage1 from "./pages/MoviesPage1";

const HomePage = lazy(() => import("./pages/HomePage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
// import HomePage from "./pages/HomePage";
// import MovieDetailsPage from "./pages/MovieDetailsPage";
// import MoviesPage from "./pages/MoviesPage";
function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/" element={<Main></Main>}>
            <Route path="/" element={<>
              <Banner></Banner>
              <HomePage></HomePage>
            </>}></Route>
            <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
            <Route path="/movies1" element={<MoviesPage1></MoviesPage1>}></Route>
            <Route path="/movies/:movieId" element={<MovieDetailsPage></MovieDetailsPage>}></Route>
          </Route>
        </Routes>      
      </Suspense>
    </Fragment>
  );
}

export default App;
