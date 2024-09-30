import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SwitchDevicePermission } from "../commons/SwitchDevicePermission";
import { envs } from "../config/envs";
import { UserContext } from "../context/userContext";
import { ConsetManagementCard } from "./ConsetManagementCard";
import { BeatLoader } from "react-spinners";

export interface Card1Options {
  title: string;
  value: string;
  category: string;
}

export const ConsentManagement = () => {
  const [requiredInfo, setRequiredInfo] = useState(false);
  const [isLoading,setIsLoading]=useState<boolean>(false)

  const { username, token, email } = useContext(UserContext);

  const handleRequiredInfo = () => {
    setIsLoading(true)
    axios
      .post(
        `${envs.API_DOMAIN}/api/preferences/send-client-data`,
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false)
        setRequiredInfo(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

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
          const info = response.data;
          const filterinfo = info.filter((item: Card1Options) => {
            if (item.category !== "email") {
              return item;
            }
          });

          setUserInfo(filterinfo);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [username]);

  return (
    <div className="consent-management-container">
      <h2>Gestión de mi consentimiento</h2>
      <hr />

      <div className="top-container">
        <h3>Acceder / Rectificar</h3>

        {userInfo.map((item, i) => {
          return <ConsetManagementCard key={i} {...item} />;
        })}

        <div className="input-card-container">
          <label htmlFor="">Microfóno</label>
          <p>Permitir el uso de microfono</p>
          <SwitchDevicePermission device="audio" />
        </div>
        <div className="input-card-container">
          <label htmlFor="">Camara</label>
          <p>Permitir el uso de la camara</p>
          <SwitchDevicePermission device="video" />
        </div>
        <div className="input-card-container">
          <label htmlFor="">Ubicación</label>
          <p>Permitir acceder a servicios de ubicación</p>
          <SwitchDevicePermission device="gps" />
        </div>
      </div>

      <div className="top-container">
        <h3>Informar</h3>
        <p>
          Brindar informacion que tiene el banco, permitir al cliente descargar
          en pdf o poder enviar una casilla donde ser enviada la informacion.
        </p>
        <button onClick={handleRequiredInfo}> {isLoading ? <BeatLoader color="#ffff" speedMultiplier={0.4}/> :"Solicitar información"}</button>
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
