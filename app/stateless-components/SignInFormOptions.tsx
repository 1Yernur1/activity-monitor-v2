import { Checkbox, FormControlLabel, Grid, Link } from "@mui/material";

export const SignInFormOptions = ({
  onCheckRememberMe,
}: {
  onCheckRememberMe: () => void;
}) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs>
        <FormControlLabel
          control={<Checkbox />}
          label="Remember me"
          onChange={onCheckRememberMe}
        />
      </Grid>
      <Grid item xs className="text-right">
        <Link href="auth/email-verification">Forgot password?</Link>
      </Grid>
    </Grid>
  );
};
