import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "./components/molecules/Loader";
import ErrorBoundary from "./components/molecules/Error";
const Products = lazy(() => import("./components/pages/products"));

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route path="/" element={<Products />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
