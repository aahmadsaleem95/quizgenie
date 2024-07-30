import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Pages/Login";
import { Home } from "./Pages/Home";
import { Course } from "./Pages/Course";
import { Quiz } from "./Pages/Quiz";
import { Dashboard } from "./Pages/Dashboard";
import { QuizStart } from "./Pages/QuizStart";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Home PageComponent={Dashboard} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/course"
          element={
            <ProtectedRoutes>
              <Home PageComponent={Course} />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoutes>
              <Home PageComponent={Quiz} />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/quiz/:id"
          element={
            <ProtectedRoutes>
              <QuizStart />
            </ProtectedRoutes>
          }
        />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
