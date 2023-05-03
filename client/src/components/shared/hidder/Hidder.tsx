import { Box, CircularProgress } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

interface Props {
  isLoading?: boolean;
  condition?: boolean;
}

export const Hidder: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading = false,
  condition = true,
}) => {
  if (condition && !isLoading) {
    return <>{children}</>;
  }
  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return null;
};
