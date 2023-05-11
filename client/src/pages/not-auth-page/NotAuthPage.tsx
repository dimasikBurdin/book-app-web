import { Button, Input } from "@mui/material";
import { useFormik } from "formik";
import { FC, useCallback, useState } from "react";
import { Hidder } from "../../components/shared/hidder";
import { ManIcon } from "../../components/shared/icons";
import styles from "./NotAuthPage.module.scss";

type Tabs = "signIn" | "signUp" | null;

interface SignInData {
  email: string | null;
  password: string | null;
}
interface SignUpData {
  name: string | null;
  email: string | null;
  password: string | null;
  secondPassword: string | null;
}

interface FormikData {
  signIn: SignInData;
  signUp: SignUpData;
}

export const NotAuthPage: FC = () => {
  const [currentTab, setCurrentTab] = useState<Tabs>(null);

  const changeTab = useCallback((tab: Tabs) => {
    setCurrentTab(tab);
  }, []);

  const { values, handleChange, submitForm } = useFormik<FormikData>({
    initialValues: {
      signIn: {
        email: null,
        password: null,
      },
      signUp: {
        name: null,
        email: null,
        password: null,
        secondPassword: null,
      },
    },
    validate: () => {},
    onSubmit: () => {},
  });

  return (
    <div className={styles.main}>
      <Hidder condition={!currentTab}>
        <div className={styles.content}>
          <ManIcon />
          <div className={styles.buttons}>
            <Button
              fullWidth
              variant="outlined"
              style={{ borderRadius: 20 }}
              onClick={() => changeTab("signUp")}
            >
              Регистрация
            </Button>
            <Button
              fullWidth
              variant="contained"
              style={{ borderRadius: 20 }}
              onClick={() => changeTab("signIn")}
            >
              Вход
            </Button>
          </div>
        </div>
      </Hidder>
      <Hidder condition={currentTab === "signIn"}>
        <div className={styles.signIn}>
          <div>Вход</div>
          <div className={styles.inputs}>
            <Input
              placeholder="email"
              name="signIn.email"
              onChange={handleChange}
            />
            <Input
              placeholder="password"
              name="signIn.password"
              onChange={handleChange}
            />
          </div>
          <Button fullWidth variant="contained" style={{ borderRadius: 20 }}>
            Вход
          </Button>
        </div>
      </Hidder>
      <Hidder condition={currentTab === "signUp"}>
        <div className={styles.signUp}>
          <div>Регистрация</div>
          <div className={styles.inputs}>
            <Input
              placeholder="Введите ваше имя"
              name="signUp.name"
              onChange={handleChange}
            />
            <Input
              placeholder="Введите свой e-mail"
              name="signUp.email"
              onChange={handleChange}
              type="email"
            />
            <Input
              placeholder="Придумайте пароль"
              type="password"
              name="signUp.password"
              onChange={handleChange}
            />
            <Input
              placeholder="Повторите пароль еще раз"
              type="password"
              name="signUp.secondPassword"
              onChange={handleChange}
            />
          </div>
          <Button fullWidth variant="contained" style={{ borderRadius: 20 }}>
            Cоздать аккаунт
          </Button>
        </div>
      </Hidder>
    </div>
  );
};
