import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SwitchButton from "../commons/SwitchButton";
import { envs } from "../config/envs";
import { UserContext } from "../context/userContext";
import { ConsetManagementCard } from "./ConsetManagementCard";

interface Card1Options {
  title: string;
  value: string;
  category: string;
}

export const ConsentManagement = () => {
  const [requiredInfo, setRequiredInfo] = useState(false);
  const handleRequiredInfo = () => {
    setRequiredInfo(true);
  };

  const { username, token } = useContext(UserContext);

  const [userInfo, setUserInfo] = useState<Card1Options[]>([]);

  useEffect(() => {
    if (username) {
      axios
        .get(`${envs.API_DOMAIN}/api/auth/info/${username}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [username]);

  console.log("token", token);

  return (
    <div className="consent-management-container">
      <h2>Gestión de mi consentimiento</h2>
      <hr />

      <div className="top-container">
        <h3>Acceder / Rectificar</h3>

        {userInfo.map((item, i) => {
          return <ConsetManagementCard key={i} {...item} />;
        })}

        <div className="input-container">
          <label htmlFor="">Microfóno</label>
          <p>Permitir el uso de microfono</p>
          <SwitchButton active={false} category="" subCategory="" />
        </div>
        <div className="input-container">
          <label htmlFor="">Camara</label>
          <p>Permitir el uso de la camara</p>
          <SwitchButton active={false} category="" subCategory="" />
        </div>
        <div className="input-container">
          <label htmlFor="">Ubicación</label>
          <p>Permitir acceder a servicios de ubicación</p>
          <SwitchButton active={false} category="" subCategory="" />
        </div>
      </div>

      <div className="top-container">
        <h3>Informar</h3>
        <p>
          Brindar informacion que tiene el banco, permitir al cliente descargar
          en pdf o poder enviar una casilla donde ser enviada la informacion.
        </p>
        <button onClick={handleRequiredInfo}> Solicitar información</button>
        {requiredInfo && (
          <h5>
            Solicitud enviada: En los proximos 5 días habiles recibirás un email
            con la información solicitada
          </h5>
        )}
      </div>
    </div>
  );
};
