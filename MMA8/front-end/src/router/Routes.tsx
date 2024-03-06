import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Members from "../components/MemberList/MemberList";
import HomePage from "../components/HomePage/HomePage";
import MemberDetails from "../components/MemberDetails/MemberDetails";
import MemberForm from "../components/MemberList/MemberList";
import MemberList from "../components/MemberList/MemberList";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'members', element: <MemberList />},
            {path: 'members/:id', element: <MemberDetails />},
            {path: '*', element: <Navigate replace to='/not-found' />}
        ]
    }
])


