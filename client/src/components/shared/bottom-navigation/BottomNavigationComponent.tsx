import { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
  BooksIcon,
  CompassIcon,
  FriendsIcon,
  ProfileIcon,
} from "../icons/Icons";
import styles from "./BottomNavigationComponent.module.scss";

interface Props {
  activeTab: number; // TO DO
  onChangeTab: (tab: number) => void;
}

export const BottomNavigationComponent: FC<Props> = ({
  activeTab,
  onChangeTab,
}) => {
  return (
    <div className={styles.main}>
      <BottomNavigation
        showLabels
        value={activeTab}
        onChange={(_, newValue) => {
          onChangeTab(newValue);
        }}
      >
        <BottomNavigationAction label="Библиотека" icon={<CompassIcon />} />
        <BottomNavigationAction label="Мои книги" icon={<BooksIcon />} />
        <BottomNavigationAction label="Что читают" icon={<FriendsIcon />} />
        <BottomNavigationAction label="Профиль" icon={<ProfileIcon />} />
      </BottomNavigation>
    </div>
  );
};
