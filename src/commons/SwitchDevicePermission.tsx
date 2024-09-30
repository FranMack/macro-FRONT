import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

interface DeviceOptions {
  device: string;
}

export const SwitchDevicePermission = ({ device }: DeviceOptions) => {
  const [isOn, setIsOn] = useState(false);  // Estado del switch
  const [micAccess, setMicAccess] = useState(false);  // Estado del permiso de micrófono
  const [locationAccess, setLocationAccess] = useState(false);  // Estado del permiso de ubicación
  const [error, setError] = useState<string | null>(null); // Manejo de errores
  const [micStream, setMicStream] = useState<MediaStream | null>(null); // Guardar el stream del micrófono
  const [position, setPosition] = useState<GeolocationPosition | null>(null); // Guardar la posición GPS

  useEffect(() => {
    return () => {
      if (micStream) {
        micStream.getTracks().forEach(track => track.stop()); // Limpiar el stream al desmontar el componente
      }
    };
  }, [micStream]);

  const requestAccess = async () => {
    if (isOn) {
      // Si el micrófono o GPS está encendido, desactiva el acceso
      if (device === "gps") {
        setPosition(null);  // Limpiar la posición
        console.log("Acceso a la ubicación desactivado");
      } else if (micStream) {
        micStream.getTracks().forEach(track => track.stop()); // Detener el stream
        setMicStream(null);
        console.log("Acceso al micrófono desactivado");
      }
      setIsOn(false);
      setMicAccess(false);
      setLocationAccess(false);
    } else {
      // Si el dispositivo está apagado, solicita acceso
      if (device === "gps") {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setPosition(pos);  // Guardar la posición del GPS
              setLocationAccess(true);
              setIsOn(true);
              console.log("Acceso a la ubicación concedido", pos);
            },
            (err) => {
              setLocationAccess(false);
              setError(err.message);
              console.error("Error al acceder a la ubicación:", err);
            }
          );
        } else {
          setError("Geolocalización no soportada en este navegador");
        }
      } else {
        // Para micrófono y otros dispositivos
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ [device]: true });
          setMicStream(stream);  // Guardamos el stream para poder detenerlo más tarde
          setMicAccess(true);
          setIsOn(true);
          console.log(`Acceso al ${device} concedido`, stream);
        } catch (err: any) {
          setMicAccess(false);
          setError(err.message);
          console.error(`Error al acceder al ${device}:`, err);
        }
      }
    }
  };

  return (
    <div className="switch-container" onClick={requestAccess}>
      <div className={`switch ${isOn ? "on" : "off"}`}>
        <div className="switch-circle"></div>
      </div>
     
      
    </div>
  );
};
