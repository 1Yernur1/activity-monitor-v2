import { Typography } from "@mui/material";
import { getFormattedTranslatorFullName } from "../service/formatter";

export const ActivityTranslator = ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  const translatorFullName = getFormattedTranslatorFullName(
    firstName,
    lastName
  );
  return (
    <div className="flex justify-between">
      <Typography variant="body1">Translator:</Typography>
      <Typography fontWeight={500}>{translatorFullName}</Typography>
    </div>
  );
};
