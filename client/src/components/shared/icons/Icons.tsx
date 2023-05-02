import type { FC } from "react";
import bookIcon from "./img/book.svg";
import compassIcon from "./img/compass.svg";
import friendsIcon from "./img/friends.svg";
import profileIcon from "./img/profile.svg";
import backIcon from "./img/ArrowBack.svg";
import favoriteNotFilledIcon from "./img/favoriteNotFilled.svg";
import favoriteFilledIcon from "./img/favoriteFilled.svg";
import settingsIcon from "./img/settings.svg";

export const BooksIcon: FC = () => {
  return <img src={bookIcon} alt="" />;
};

export const CompassIcon: FC = () => {
  return <img src={compassIcon} alt="" />;
};

export const FriendsIcon: FC = () => {
  return <img src={friendsIcon} alt="" />;
};

export const ProfileIcon: FC = () => {
  return <img src={profileIcon} alt="" />;
};

export const BackIcon: FC = () => {
  return <img src={backIcon} alt="" />;
};

export const FavoriteFilledIcon: FC = () => {
  return <img src={favoriteFilledIcon} alt="" />;
};

export const FavoriteNotFilledIcon: FC = () => {
  return <img src={favoriteNotFilledIcon} alt="" />;
};

export const SettingsIcon: FC = () => {
  return <img src={settingsIcon} alt="" />;
};
