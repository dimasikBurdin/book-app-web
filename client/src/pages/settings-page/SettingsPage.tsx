import { Box, CircularProgress } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { MobileHeader } from "../../components/shared/mobile-header";
import { ROUTES } from "../../config/routes";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./SettingsPage.module.scss";

export const SettingsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changePage = useCallback(
    (page: ROUTES) => {
      navigate(`/${page}`);
    },
    [navigate]
  );

  return (
    <div className={styles.main}>
      <HeaderContainer>
        <MobileHeader
          title="Настройки"
          onClickBack={() => changePage(ROUTES.PROFILE)}
        />
      </HeaderContainer>
      <div className={styles.content}>
        <ContentContainer>
          <Box display={"flex"} gap={8}>
            <div>Настройки в разработке</div> <CircularProgress size={24} />
          </Box>
        </ContentContainer>
      </div>
    </div>
  );
};
