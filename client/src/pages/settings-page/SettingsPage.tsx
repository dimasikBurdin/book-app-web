import { Box, Button, CircularProgress } from "@mui/material";
import { FC, useCallback } from "react";
import { useNavigate } from "react-router";
import { ContentContainer } from "../../components/shared/content-container";
import { HeaderContainer } from "../../components/shared/header-container";
import { MobileHeader } from "../../components/shared/mobile-header";
import { ROUTES } from "../../config/routes";
import { logoutUserAction } from "../../redux-store/actions";
import { useAppDispatch } from "../../redux-store/store-manager";
import styles from "./SettingsPage.module.scss";

export const SettingsPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changePage = useCallback(
    (page: ROUTES | number) => {
      if (!Number.isNaN(+page)) {
        navigate(page as number);
      } else {
        navigate(`/${page}`);
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    dispatch(logoutUserAction());
    navigate("/auth");
  }, [dispatch, navigate]);

  return (
    <div className={styles.main}>
      <HeaderContainer>
        <MobileHeader title="Настройки" onClickBack={() => changePage(-1)} />
      </HeaderContainer>
      <div className={styles.content}>
        <ContentContainer>
          <Box display={"flex"} gap={8}>
            <div>Настройки в разработке</div> <CircularProgress size={24} />
          </Box>
          <Button variant="contained" onClick={logout}>
            Выйти
          </Button>
        </ContentContainer>
      </div>
    </div>
  );
};
