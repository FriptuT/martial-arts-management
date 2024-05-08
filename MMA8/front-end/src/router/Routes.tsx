import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/HomePage/HomePage";
import MemberDetails from "../components/MemberDetails/MemberDetails";
import MemberList from "../components/MemberList/MemberList";
import Login from "../components/account/Login";
import Register from "../components/account/Register";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'members', element: <MemberList />},
            {path: 'members/:id', element: <MemberDetails />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])


