import { Routes, Route } from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/Home";
import Todo from "../pages/Todo";
import Coin from "../pages/Coin";
import Movie from "../pages/Movie";
import Board from "../pages/Board";
import Rocket from "../pages/Rocket";
import Book from "../pages/Book";


const AppRouter = () => {
    return (
         <Routes>
            <Route path="/" element={<Main />}>
                <Route index element={<Home />} />
                <Route path="/todo" element={<Todo />} />
                <Route path="/coin" element={<Coin />} />
                <Route path="/movie" element={<Movie />} />
                <Route path="/board" element={<Board />} />
                <Route path="/Rocket" element={<Rocket />} />
                <Route path="/book" element={<Book />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;
