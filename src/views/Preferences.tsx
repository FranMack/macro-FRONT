import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  CheckIcon,
  CreditCardIcon,
  DiscountIcon,
  DollarIcon,
  InvestmentsIcon,
  OfertsIcon,
  PaymentsIcons,
} from "../commons/icons";
import { Dropdown, DropdownOptions } from "../components/Dropdown";
import { envs } from "../config/envs";
import { UserContext } from "../context/userContext";
import { Card1Options } from "../components/ConsentManagement";

interface Preferences {
  ahorrosYbeneficios: boolean;
  ofertasYseguros: boolean;
  todoSobreTuCuenta: boolean;
  tarjetasCreditoYdebito: boolean;
  pagoDeServicios: boolean;
  inversiones: boolean;
  cheques: boolean;
}
import { ConsetManagementCard } from "../components/ConsetManagementCard";

export const Preferences = () => {
  const { email, username, token } = useContext(UserContext);

  const [preferences, setPreferences] = useState<any>({});




  const [userInfo, setUserInfo] = useState<Card1Options>({title:"",category:"",value:""});

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

          const info=response.data;
          const filterinfo=info.filter((item:Card1Options)=>{
            if(item.category==="email"){
              return item
            }
          })

          setUserInfo(filterinfo[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [username]);

  useEffect(() => {
    if (username) {
      axios
        .get(`${envs.API_DOMAIN}/api/preferences/list/${username}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          setPreferences(result.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [email]);




  const dropDown1: DropdownOptions = {
    title: "Ahorros  beneficios para tus compras y mucho más",
    image: <DiscountIcon />,
    items: [
      {
        title: "Ahorros y promociones para tus compras y salidas",
        description:
          "Incluye beneficios en sumermercados y gastronomia,combustible,indumentaria,espectaculos y mucho más",
        category: "ahorrosYbeneficios",
        subCategory: "ahorros_y_promociones",

        active:
          preferences.ahorrosYbeneficios &&
          preferences.ahorrosYbeneficios.noticias_institucionales,
      },
      {
        title: "Ofertas de capacitación y becas universitarias",
        description: "",
        category: "ahorrosYbeneficios",
        subCategory: "capacitacion_y_becas",
        active:
          preferences.ahorrosYbeneficios &&
          preferences.ahorrosYbeneficios.ahorros_y_promociones,
      },
      {
        title: "Noticias institucionales",
        description:
          "Conoce todas las acciones que impulsamos para ser un banco cada vez más responsable",
        category: "ahorrosYbeneficios",
        subCategory: "noticias_institucionales",

        active:
          preferences.ahorrosYbeneficios &&
          preferences.ahorrosYbeneficios.capacitacion_y_becas,
      },
    ],
  };

  const dropDown2: DropdownOptions = {
    title: "Ofertas exclusivas y seguros",
    image: <OfertsIcon />,
    items: [
      {
        title: "Prestamos con las mejores tasas y plazos",
        description: "",
        category: "ofertasYseguros",
        subCategory: "prestamos",
        active:
          preferences.ofertasYseguros && preferences.ofertasYseguros.prestamos,
      },
      {
        title: "Seguros para proteger lo que más queres",
        description:
          "Incluye seguros de vida, accidentes personales, vivienda, auto, moto y más.",
        category: "ofertasYseguros",
        subCategory: "seguros",
        active:
          preferences.ofertasYseguros && preferences.ofertasYseguros.seguros,
      },
    ],
  };

  const dropDown3: DropdownOptions = {
    title: "Todo sobre tu cuenta",
    image: <DollarIcon />,
    items: [
      {
        title:
          "Beneficios exclusivos para cobrar tu sueldo o jubilación con nosotros",
        description: "",
        category: "tuCuenta",
        subCategory: "alerta_saldo_min",
        active: preferences.tuCuenta && preferences.tuCuenta.alerta_saldo_min,
      },
      {
        title: "Aviso semanal del saldo de tu cuenta",
        description: "",
        category: "tuCuenta",
        subCategory: "aviso_semanal_saldo",
        active:
          preferences.tuCuenta && preferences.tuCuenta.aviso_semanal_saldo,
      },
      {
        title: "Saldo en descubierto excedido del limite acordado",
        description: "",
        category: "tuCuenta",
        subCategory: "saldo_en_descubierto",
        active:
          preferences.tuCuenta && preferences.tuCuenta.saldo_en_descubierto,
      },
      {
        title: "Alerta de saldo mínimo",
        description:
          "Defini un monto y te avisaremos si tu cuenta registra un saldo menor",
        category: "tuCuenta",
        subCategory: "beneficios",
        active: preferences.tuCuenta && preferences.tuCuenta.beneficios,
      },
    ],
  };

  const dropDown4: DropdownOptions = {
    title: "Tus tarjetas de crédito y débito",
    image: <CreditCardIcon />,
    items: [
      {
        title: "Novedades y formas de pago de tus tarjetas",
        description: "Incluye avisos de aumento de limites, entre otros",
        category: "tarjetas",
        subCategory: "resumen_semanal",
        active: preferences.tarjetas && preferences.tarjetas.resumen_semanal,
      },
      {
        title: "Resumen semanal de compras con tarjeta de débito",
        description: "",
        category: "tarjetas",
        subCategory: "novedades",
        active: preferences.tarjetas && preferences.tarjetas.novedades,
      },
    ],
  };

  const dropDown5: DropdownOptions = {
    title: "Pago de servicios y débitos automáticos",
    image: <PaymentsIcons />,
    items: [
      {
        title:
          "Novedades sobre pagos de servicios, impuestos y débitos automáticos",
        description: "",
        category: "pagoServicios",
        subCategory: "novedades",
        active:
          preferences.pagoServicios && preferences.pagoServicios.novedades,
      },
      {
        title: "Servicios próximos a vencer, no adheridos a débito automático",
        description: "",
        category: "pagoServicios",
        subCategory: "servicios_proximos_vencer",
        active:
          preferences.pagoServicios &&
          preferences.pagoServicios.servicios_proximos_vencer,
      },
      {
        title: "Estado de servicios adheridos a débito automático",
        description: "",
        category: "pagoServicios",
        subCategory: "estado_servicios_adheridos",
        active:
          preferences.pagoServicios &&
          preferences.pagoServicios.estado_servicios_adheridos,
      },
    ],
  };

  const dropDown6: DropdownOptions = {
    title: "Inversiones para pontenciar tus ahorros",
    image: <InvestmentsIcon />,
    items: [
      {
        title:
          "Información de las dististintas alternativas de inversión disponibles",
        description: "",
        category: "inversiones",
        subCategory: "alternativas_inversion",
        active:
          preferences.inversiones &&
          preferences.inversiones.alternativas_inversion,
      },
      {
        title: "Aviso de vencimiento de plazo fijo",
        description: "",
        category: "inversiones",
        subCategory: "aviso_vencimiento_plazofijo",
        active:
          preferences.inversiones &&
          preferences.inversiones.aviso_vencimiento_plazofijo,
      },
      {
        title:
          "Confirmación de ejecución de órdenes de compra o venta de titulos valores",
        description: "",
        category: "inversiones",
        subCategory: "operacion_titulos_y_valores",
        active:
          preferences.inversiones &&
          preferences.inversiones.operacion_titulos_y_valores,
      },
    ],
  };
  const dropDown7: DropdownOptions = {
    title: "Gestion de cheques",
    image: <CheckIcon />,
    items: [
      {
        title: "Cheques por acreditarse",
        description: "",
        category: "cheques",
        subCategory: "cheques_por_acreditarse",
        active:
          preferences.cheques && preferences.cheques.cheques_por_acreditarse,
      },
      {
        title: "Cheques debitados",
        description: "",
        category: "cheques",
        subCategory: "cheques_debitados",
        active: preferences.cheques && preferences.cheques.cheques_debitados,
      },
      {
        title: "Cheques rechazados",
        description: "",
        category: "cheques",
        subCategory: "cheques_rechazados",
        active: preferences.cheques && preferences.cheques.cheques_rechazados,
      },
      {
        title: "Chequera disponible para retirar en tu sucursal",
        description: "",
        category: "cheques",
        subCategory: "chequera",
        active: preferences.cheques && preferences.cheques.chequera,
      },
    ],
  };

 
  console.log("xxxxxxxxxxxxx",userInfo)

  return (
    <div className="preferences-container">
      <h2>Gestión de notificaciones</h2>
      <hr />

      <div className="preferences-center-container">
        <h3>Configurá los avisos que queres recibir: </h3>
        
        <div className="preference-email-container">
       {userInfo.value && <ConsetManagementCard title="Tu correo:" value={userInfo.value} category={userInfo.category} />}
        </div>
        <br />
        <br />
        <br />

        <Dropdown {...dropDown1} />
        <Dropdown {...dropDown2} />
        <Dropdown {...dropDown3} />
        <Dropdown {...dropDown4} />
        <Dropdown {...dropDown5} />
        <Dropdown {...dropDown6} />
        <Dropdown {...dropDown7} />
        <div className="preference-bottom-container">
          <p>
            Seguirás recibiendo comunicación con información importante de tus
            productos
          </p>
        </div>
      </div>
    </div>
  );
};
