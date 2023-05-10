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
        <BottomNavigationAction
          label="Библиотека"
          icon={<CompassIcon isActive={activeTab === 0} />}
        />
        <BottomNavigationAction
          label="Мои книги"
          icon={<BooksIcon isActive={activeTab === 1} />}
        />
        <BottomNavigationAction
          label="Что читают"
          icon={<FriendsIcon isActive={activeTab === 2} />}
        />
        <BottomNavigationAction
          label="Профиль"
          icon={<ProfileIcon isActive={activeTab === 3} />}
        />
      </BottomNavigation>
    </div>
  );
};
