import type { FC } from "react";
import bookIcon from "./img/book.svg";
import compassIcon from "./img/compass.svg";
import friendsIcon from "./img/friends.svg";
import profileIcon from "./img/profile.svg";
import styles from "./icons.module.scss";

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
