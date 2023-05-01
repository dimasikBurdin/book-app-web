import { CircularProgress } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

interface Props {
  isLoading?: boolean;
  condition?: boolean;
}

export const Hidder: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading,
  condition = true,
}) => {
  if (condition && !isLoading) {
    return <>{children}</>;
  }
  if (isLoading) {
    return <CircularProgress />;
  }

  return null;
};
