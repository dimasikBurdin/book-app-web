import { Button, Input } from "@mui/material";
import { useFormik } from "formik";
import { FC, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { Hidder } from "../../components/shared/hidder";
import { ManIcon } from "../../components/shared/icons";
import { loginUserAsync, registerUserAsync } from "../../redux-store/actions";
import { useAppDispatch } from "../../redux-store/store-manager";
import { LoginUserPayload, RegisterUserPayload } from "../../typing/user";
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
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const changeTab = useCallback((tab: Tabs) => {
    setCurrentTab(tab);
  }, []);

  const { values, handleChange } = useFormik<FormikData>({
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

  const loginUserRequest = useCallback(
    async ({ email, password }: LoginUserPayload) => {
      await dispatch(
        loginUserAsync({
          email: email,
          password: password,
        })
      );
      navigate("/");
    },
    [dispatch, navigate]
  );

  const registerUserRequest = useCallback(
    async ({ email, name, password }: RegisterUserPayload) => {
      await dispatch(
        registerUserAsync({
          email: email,
          name: name,
          password: password,
        })
      );
      loginUserRequest({
        email: email,
        password: password,
      });
    },
    [dispatch, loginUserRequest]
  );

  const registerUser = useCallback(() => {
    if (
      values.signUp.email &&
      values.signUp.name &&
      values.signUp.password &&
      values.signUp.secondPassword
    ) {
      registerUserRequest({
        email: values.signUp.email,
        name: values.signUp.name,
        password: values.signUp.password,
      });
    }
  }, [
    registerUserRequest,
    values.signUp.email,
    values.signUp.name,
    values.signUp.password,
    values.signUp.secondPassword,
  ]);

  const loginUser = useCallback(() => {
    if (values.signIn.email && values.signIn.password) {
      loginUserRequest({
        email: values.signIn.email,
        password: values.signIn.password,
      });
    }
  }, [loginUserRequest, values.signIn.email, values.signIn.password]);

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
              type="email"
            />
            <Input
              placeholder="password"
              name="signIn.password"
              onChange={handleChange}
              type="password"
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            style={{ borderRadius: 20 }}
            onClick={loginUser}
          >
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
          <Button
            fullWidth
            variant="contained"
            style={{ borderRadius: 20 }}
            onClick={registerUser}
          >
            Cоздать аккаунт
          </Button>
        </div>
      </Hidder>
    </div>
  );
};
