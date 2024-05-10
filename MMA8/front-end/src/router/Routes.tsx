import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../components/HomePage/HomePage";
import MemberDetails from "../components/MemberDetails/MemberDetails";
import MemberList from "../components/MemberList/MemberList";
import Login from "../components/account/Login";
import Register from "../components/account/Register";
import RequireAuth from "../components/account/RequireAuth";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            // authenticated routes
            {
                element: <RequireAuth />, children: [
                    {path: '', element: <HomePage />}
                ]
            },
            // admin routes
            {
                element: <RequireAuth roles={['Admin','Member']} />, children: [
                    {path: 'members', element: <MemberList />}
                ]
            },
            {path: '', element: <HomePage />},
            {path: 'members', element: <MemberList />},
            {path: 'members/:id', element: <MemberDetails />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])


