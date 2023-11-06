import Avatar from "@mui/material/Avatar/Avatar";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

export const EmailVerifiedFormAvatar = () => {
  return (
    <Avatar sx={{ bgcolor: "white" }}>
      <CheckCircleOutlinedIcon color="primary" fontSize="large"/>
    </Avatar>
  );
};
