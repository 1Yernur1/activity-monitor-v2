import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography fontSize={20} fontWeight={900}>
          Activity Monitoring
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
