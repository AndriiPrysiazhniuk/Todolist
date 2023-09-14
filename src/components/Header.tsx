import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import {Menu} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";

export const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
<<<<<<< HEAD
    );
};

=======
    )
}
>>>>>>> aad54870e7e1c8c5d77cb75c3e55744128cd9e1a
