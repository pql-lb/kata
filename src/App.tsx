import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "./components/molecules/Loader";
const Products = lazy(() => import("./components/pages/products"));

function App() {
    return (
        <Router>
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Products />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
