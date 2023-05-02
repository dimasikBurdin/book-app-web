import { FC } from "react";
import styles from "./ProfileStatistic.module.scss";

interface Props {
  info: {
    boardCount: number;
    subscriptionCount: number;
    subscriberCount: number;
  };
}

export const ProfileStatistic: FC<Props> = ({
  info: { boardCount, subscriberCount, subscriptionCount },
}) => {
  return (
    <div className={styles.main}>
      <Container count={boardCount} title="полок" />
      <Container count={subscriptionCount} title="подписок" />
      <Container count={subscriberCount} title="подписчиков" />
    </div>
  );
};

interface ContainerProps {
  count: number;
  title: string;
}

const Container: FC<ContainerProps> = ({ count, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.count}>{count}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
