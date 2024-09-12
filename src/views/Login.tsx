import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import alertIcon from "../assets/alert-icon.png";
import avatar from "../assets/cat-avatar.jpg";
import loginIcon from "../assets/icono-login_a.png";
import background from "../assets/login-image.png";
import { BackArrow, ClosedEye, Keyboard, OpenEye } from "../commons/icons";
import { envs } from "../config/envs";
import { UserContext } from "../context/userContext";

const bottomMenu: string[] = [
  "Home",
  "Contactanos",
  "Telefónos útiles",
  "Pregúntas frecuentes",
  "Seguridad",
  "Términos y condiciones",
];

export const Login = () => {
  const navigate = useNavigate();
  const { setName, setLastname, setEmail, setUsername, setToken } =
    useContext(UserContext);

  const [eyeClose, setEyeClose] = useState<boolean>(true);
  const handleEyeClose = () => {
    setEyeClose(!eyeClose);
  };

  const [errorMessage, setErrorMessage] = useState<any>("");
  const [step, setStep] = useState<string>("step1");

  const handleStep = () => {
    if (
      step === "step1" &&
      singUpForm.values.username &&
      !singUpForm.errors.username
    ) {
      setStep("step2");
      return;
    } else if (step === "step2") {
      setStep("step1");
      return;
    }
    setErrorMessage("Por favor, ingresá tu usuario.");
  };

  const singUpForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Por favor, ingresá tu usuario."),
      password: Yup.string().required("Por favor, ingresá tu contraseña."),
    }),

    onSubmit: (values) => {
      axios
        .post(`${envs.API_DOMAIN}/api/auth/login`, {
          username: values.username,
          password: values.password,
        })

        .then((response) => {
          localStorage.setItem(
            "userData",
            JSON.stringify({ ...response.data })
          );
          setName(response.data.name);
          setLastname(response.data.lastname);
          setEmail(response.data.email);
          setUsername(response.data.username);
          setToken(response.data.token);

          singUpForm.resetForm();
          navigate("/bancainternet");
        })
        .catch((error) => {
          const captureError =
            error.response.data.error ||
            error.response.data.errors[0].msg ||
            "An error occurred during registration";
          setErrorMessage(captureError);
          console.log(error);
        });
    },
  });

  return (
    <section className="section-login-container">
      <div className="section-login-top-container">
        <div className="section-login-top-internal left">
          <img src={background} alt="bacground image" />
        </div>
        <div className="section-login-top-internal right">
          <div className="internal-top">
            <div className="icon-container">
              <img src={alertIcon} alt="alert-icon" />
            </div>
            <div className="text-container">
              <p>
                ALERTA VIRUS/ESTAFAS: Si ves un mensaje de
                actualización/autenticación de datos/programas/certificados
                digitales o similares, tu computadora está infectada, NO
                INGRESES TOKEN y comunícate urgente con nosotros.
              </p>
            </div>
          </div>
          <div className="internal-bottom">
            <div className="internal-bottom-top-container">
              {step === "step1" && (
                <div className="login-icon-container">
                  <img src={loginIcon} alt="login-icon" />
                </div>
              )}
              {step === "step2" && (
                <div className="login-icon-container">
                  <div className="icon-container" onClick={handleStep}>
                    <BackArrow />
                  </div>

                  <img src={avatar} alt="cat-avatar" />
                </div>
              )}
              <h4>Ingresá a Banca internet</h4>
            </div>

            <form action="submit" onSubmit={singUpForm.handleSubmit}>
              {step === "step1" && (
                <>
                  <label
                    className={
                      (singUpForm.touched.username &&
                        singUpForm.errors.username) ||
                      errorMessage
                        ? "error"
                        : ""
                    }
                  >
                    Ingresá tu usuario
                  </label>

                  <div
                    className={
                      (singUpForm.touched.username &&
                        singUpForm.errors.username) ||
                      errorMessage
                        ? "input-container error"
                        : "input-container"
                    }
                  >
                    <input
                      id="username"
                      value={singUpForm.values.username}
                      onChange={singUpForm.handleChange}
                      onBlur={singUpForm.handleBlur}
                      type={eyeClose ? "password" : "text"}
                      placeholder="Usuario Banca Móvil/Internet"
                    />
                    {eyeClose ? (
                      <OpenEye onClick={handleEyeClose} />
                    ) : (
                      <ClosedEye onClick={handleEyeClose} />
                    )}
                  </div>
                  {singUpForm.touched.username &&
                    singUpForm.errors.username && (
                      <p className="helper-error">
                        {singUpForm.errors.username}
                      </p>
                    )}

                  <button type="button" onClick={handleStep}>
                    Ingresá
                  </button>
                </>
              )}

              {step === "step2" && (
                <>
                  <label
                    className={
                      singUpForm.touched.password && singUpForm.errors.password
                        ? "error"
                        : ""
                    }
                  >
                    Ingresá tu contraseña
                  </label>

                  <div
                    className={
                      (singUpForm.touched.password &&
                        singUpForm.errors.password) ||
                      errorMessage
                        ? "input-container error"
                        : "input-container"
                    }
                  >
                    <input
                      id="password"
                      value={singUpForm.values.password}
                      onChange={singUpForm.handleChange}
                      onBlur={singUpForm.handleBlur}
                      onKeyDown={(event) => {
                        if (event.key === "Backspace") {
                          setErrorMessage("");
                        }
                      }}
                      type={eyeClose ? "password" : "text"}
                      placeholder="Usuario Banca Móvil/Internet"
                    />
                    {eyeClose ? (
                      <OpenEye onClick={handleEyeClose} />
                    ) : (
                      <ClosedEye onClick={handleEyeClose} />
                    )}
                  </div>
                  {singUpForm.touched.password &&
                    singUpForm.errors.password && (
                      <p className="helper-error">
                        {singUpForm.errors.password}
                      </p>
                    )}

                  <button type="submit">Ingresá</button>
                  {errorMessage && (
                    <span className="error-message">{errorMessage}</span>
                  )}
                </>
              )}
            </form>

            <div className="internal-bottom-bottom-container">
              <div>
                <p>Teclado Virtual</p>
                <Keyboard />
              </div>
              <div>
                <Link to="">¿No podés ingresar o sos nuevo?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="section-login-bottom-container">
        {bottomMenu.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </ul>
    </section>
  );
};
