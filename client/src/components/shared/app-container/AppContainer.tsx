import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { BottomNavigationComponent } from "../bottom-navigation";
import styles from "./AppContainer.module.scss";

const routes: { [key: number | string]: string } = {
  // TO DO
  0: "/",
  1: "/my-books",
  2: "/popular",
  3: "profile",
};

export const AppContainer: FC<PropsWithChildren> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(-1);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    Object.keys(routes).forEach((key) => {
      if (routes[key] === pathname) {
        setActiveTab(+key);
        return;
      }
    });
  }, [pathname]);

  const changePage = useCallback(
    (tab: number) => {
      setActiveTab(tab);
      navigate(routes[tab]);
    },
    [navigate]
  );

  return (
    <div className={styles.main}>
      {children}
      <div className={styles.navigation}>
        <BottomNavigationComponent
          activeTab={activeTab}
          onChangeTab={changePage}
        />
      </div>
    </div>
  );
};
