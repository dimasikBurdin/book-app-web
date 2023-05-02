import { FC } from "react";
import tempAvatar from "./Ellipse45.svg";
import styles from "./ProfileSummary.module.scss";

interface Props {}

export const ProfileSummary: FC<Props> = ({}) => {
  return (
    <div className={styles.main}>
      <img className={styles.avatar} src={tempAvatar} alt="" />
      <div className={styles.info}>
        <div className={styles.name}>Привет, Анастасия</div>
        <div className={styles.id}>@id31</div>
      </div>
    </div>
  );
};
