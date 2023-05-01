import { IconButton } from "@mui/material";
import type { FC } from "react";
import { BackIcon } from "../icons";
import styles from "./MobileHeader.module.scss";

interface Props {
  title: string;
  onClickBack?: () => void;
}

export const MobileHeader: FC<Props> = ({ title, onClickBack }) => {
  return (
    <div className={styles.main}>
      {onClickBack && (
        <IconButton className={styles.backButton} onClick={onClickBack}>
          <BackIcon />
        </IconButton>
      )}
      <div className={styles.title}>{title}</div>
    </div>
  );
};
