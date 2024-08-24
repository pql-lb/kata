import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loader } from "./components/molecules/Loader";
import ErrorBoundary from "./components/molecules/Error";
import { MainTemplate } from "./components/templates/Main";
const NotFound = lazy(() => import("./components/pages/NotFound"));
const Products = lazy(() => import("./components/pages/Products"));
const Checkout = lazy(() => import("./components/pages/Checkout"));

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
                        <Route
                            path="/checkout-page"
                            element={
                                <MainTemplate>
                                    <Checkout />
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
