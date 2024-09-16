import { useContext } from "react";
import {  PrivacySectionContext } from "../context/privacySections.context";
import { useNavigate } from "react-router";

const table2Info = [
  {
    column1: "Información personal",
    column2:
      "Útilizamos tús datos personales para validar tu identidad para acceder y operar la app y para prevención de fraudes y delitos finacieros.",
    column3: "Macro no comparte esta información",
  },
  {
    column1: "Información financiera",
    column2:
      "Útilizamos tús datos financieros para operar en la app y para prevención de fraudes y delitos finacieros.",
    column3: "Macro no comparte esta información",
  },
  {
    column1: "Mensajes (correo electrónico)",
    column2:
      "Utilizamos tu información de correo electrónico para las comunicaciones institucionales, validar tu identidad y para prevención de fraudes y delitos financieros",
    column3: "Macro no comparte esta información",
  },
  {
    column1: "Cámara",
    column2:
      "Utilizamos la cámara de tus dispositivos para validar tu identidad y contrastarla con la base de datos biométricos.",
    column3: "Macro no comparte esta información",
  },
  {
    column1: "Archivos y documentos multimedia",
    column2:
      "Utilizamos el acceso a archivos y documentos multimedia para funciones de la app, para la descarga de documentos (PDF, PNG).",
    column3: "Macro no comparte esta información",
  },
  {
    column1: "Contactos",
    column2:
      "Recolectamos de manera temporal tu agenda de contactos, para contrastar con la información de usuarios adheridos a MODO, en el clujo de envío de dinero.",
    column3: "Macro no comparte esta información",
  },
  {
    column1: "Dispositivos u otros ID",
    column2:
      "Utilizamos tus datos personales para identificar tus dispositivos con el objetivo de prevenir fraudes y delitos financieros.",
    column3: "Macro no comparte esta información",
  },
  {
    column1: "Ubicación",
    column2:
      "Utilizamos información de tu localización para mostrar el mapa de sucursales y cajeros, mapa de comercios MODO.",
    column3: "Macro no comparte esta información",
  },
];

export const ComplementaryInfo = () => {


  const linkToMail = () => {
    window.location.href = "mailto:info@macro.com";
  };
  const{setPrivacySection}=useContext(PrivacySectionContext)
  
  return (
    <div className="complementary-info-container">
      <h2>Informacion complementaria para los consumidores</h2>
      <hr />
      <br />
      <table className="table1-container">
        <thead>
          <tr>
            <th colSpan={2}>RECOPILACIÓN DE DATOS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>¿Cómo manejamos tu información ?</td>
            <td>
              El banco XXX maneja la información de sus clientes de manera
              responsable, conforme a la Ley 25.326 de Protección de Datos
              Personales. Esto implica obtener el consentimiento de los clientes
              para recopilar sus datos, utilizarlos solo para los fines
              especificados, proteger la información de accesos no autorizados,
              y permitir que los clientes accedan, corrijan o eliminen su
              información. Usamos y protegemos tus datos solo para los fines
              especificados en nuestra política de privacidad. No compartiremos
              tu información personal con terceros sin tu consentimiento, a
              menos que lo exija la ley o lo pidan las autoridades.
            </td>
          </tr>
          <tr>
            <td>¿Qué información? </td>
            <td>
              Únicamente recopilamos información para cumplir con los servicios
              ofrecidos por el banco. No compartiremos información que pueda
              identificar a las personas con ninguna otra entidad sin su
              consentimiento, a menos que lo exija la ley o lo soliciten las
              autoridades competentes. También tenemos la obligación de no
              recopilar y operar datos sensibles
            </td>
          </tr>
        </tbody>
      </table>

      <p className="table2-intro">
        Esta tabla explica que información recopila Macro de su dispositivo,
        cómo la utiliza y si la comparte. En algunos casos, por ejemplo al
        recoger su ubicación por GPS, los contactos almacenados en su
        dispositivo o las fotos que tome con su dispositivo, Macro primero le
        pedirá permiso.
      </p>
      <table className="table2-container">
        <thead>
          <tr>
            <th>Info recopilada</th>
            <th>Para qué se útiliza</th>
            <th>Cómo se comparte</th>
          </tr>
        </thead>
        <tbody>
          {table2Info.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.column1}</td>
                <td>{item.column2}</td>

                <td>{item.column3}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className="table3-container">
        <thead>
          <tr>
            <th>Acceder</th>
            <th>Asuntos</th>
            <th>Medios de gestíon</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rectificar </td>
            <td className="second-column">
              Podes revisar la información que esta en la plataforma{" "}
            </td>

            <td rowSpan={4} className="final-column">
              <p onClick={()=>setPrivacySection("consent_management")}>Gestion de mi consentimiento</p>
              <p onClick={linkToMail}>info@macro.com.ar</p>
            </td>
          </tr>
          {/*<tr>
          <td>Limitar </td>
          <td className="second-column">Mientras se verifica si la información es correcta. Cuando Banco Macro ya no necesite tus datos, pero tú los necesites para hacer o defender un reclamo. Si te opones a que se utilicen tus datos para cumplir una tarea de interes público p un objetivo legitimo, puedes pedir que se limite el uso de tus datos mientras se determina si el motivo de precisar tus datos es mas importante que tu objeción.</td>
          
          
          </tr>*/}
          <tr>
            <td>Informar </td>
            <td className="second-column">
              Podes revisar la información que esta en la plataforma{" "}
            </td>
          </tr>
          <tr>
            <td>Acceder </td>
            <td className="second-column">
              Podes requerir todos tus datos procesados{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
