import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "./components/molecules/Loader";
import ErrorBoundary from "./components/molecules/Error";
import { MainTemplate } from "./components/templates/Main";
const NotFound = lazy(() => import("./components/pages/NotFound"));
const Products = lazy(() => import("./components/pages/Products"));

function App() {
    return (
        <Router>
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <MainTemplate>
                                    <Products />
                                </MainTemplate>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </ErrorBoundary>
        </Router>
    );
}

export default App;
