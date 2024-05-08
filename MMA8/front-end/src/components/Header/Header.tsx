import { AppBar, Box, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import './styles.css';
import { useAppSelector } from "../../store/store";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
    { title: 'members', path: '/members' },
];

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
];

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
        color: "grey.500",
    },
    "&.active": {
        color: "text.secondary",
    },
};

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}


export default function Header({ darkMode, handleThemeChange }: Props) {

    const { user } = useAppSelector(state => state.account);

    return (
        <>
            <AppBar position="static" sx={{ mb: 7 }}>
                <Toolbar
                    sx={{
                        dispaly: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box display='flex' alignItems='center'>
                        <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
                            MMA Forces
                        </Typography>
                        <Switch checked={darkMode} onChange={handleThemeChange} />
                    </Box>

                    <ul className="mid">
                        {midLinks.map((link) => (
                            <ListItem
                                component={NavLink}
                                to={link.path}
                                key={link.path}
                                sx={navStyles}
                            >
                                {link.title.toUpperCase()}
                            </ListItem>
                        ))}
                    </ul>

                    <Box>
                        {user ? (
                            <SignedInMenu />
                        ) : (
                            <ul className="right">
                                {rightLinks.map((link) => (
                                    <ListItem
                                        component={NavLink}
                                        to={link.path}
                                        key={link.path}
                                        sx={navStyles}
                                    >
                                        {link.title.toUpperCase()}
                                    </ListItem>
                                ))}
                            </ul>
                        )}

                    </Box>

                </Toolbar>
            </AppBar>
        </>
    );


}