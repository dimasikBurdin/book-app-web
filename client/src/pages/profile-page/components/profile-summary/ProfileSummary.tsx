import { FC } from "react";
import tempAvatar from "./Ellipse45.svg";
import styles from "./ProfileSummary.module.scss";

interface Props {
  name: string | null | undefined;
  userId: number;
}

export const ProfileSummary: FC<Props> = ({ name = "Читатель", userId }) => {
  return (
    <div className={styles.main}>
      <img className={styles.avatar} src={tempAvatar} alt="" />
      <div className={styles.info}>
        <div className={styles.name}>Привет, {name}</div>
        <div className={styles.id}>@id{userId}</div>
      </div>
    </div>
  );
};
