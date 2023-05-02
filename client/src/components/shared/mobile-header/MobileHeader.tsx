import { IconButton } from "@mui/material";
import type { FC } from "react";
import { BackIcon, FavoriteNotFilledIcon, SettingsIcon } from "../icons";
import styles from "./MobileHeader.module.scss";

interface Props {
  title: string;
  onClickBack?: () => void;
  typeRightButton?: "favorite" | "settings";
  onClickRightButton?: () => void;
}

export const MobileHeader: FC<Props> = ({
  title,
  onClickBack,
  onClickRightButton,
  typeRightButton,
}) => {
  return (
    <div className={styles.main}>
      {onClickBack && (
        <IconButton className={styles.backButton} onClick={onClickBack}>
          <BackIcon />
        </IconButton>
      )}
      <div className={styles.title}>{title}</div>
      {typeRightButton && typeRightButton === "favorite" && (
        <IconButton className={styles.rightButton} onClick={onClickRightButton}>
          <FavoriteNotFilledIcon />
        </IconButton>
      )}
      {typeRightButton && typeRightButton === "settings" && (
        <IconButton className={styles.rightButton} onClick={onClickRightButton}>
          <SettingsIcon />
        </IconButton>
      )}
    </div>
  );
};
