import type { FC, PropsWithChildren } from "react";
import styles from "./ContentContainer.module.scss";

export const ContentContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};
