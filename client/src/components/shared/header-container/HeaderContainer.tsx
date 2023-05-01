import type { FC, PropsWithChildren } from "react";
import styles from "./HeaderContainer.module.scss";

export const HeaderContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};
