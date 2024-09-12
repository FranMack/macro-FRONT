import home from "../assets/nav-icons/inicio_icn_off.png";
import consults from "../assets/nav-icons/comprobantes_icn_off.png";
import transfers from "../assets/nav-icons/transferencias_icn_off.png"
import payments from "../assets/nav-icons/pagos_icn_off.png";
import reloads from "../assets/nav-icons/recarga_icn_off.png";
import ensurence from "../assets/nav-icons/seguros_icn_off.png";
import more from "../assets/nav-icons/mas_icn_off.png";
import investments from "../assets/nav-icons/invertir_icn_off.png"
import preference from "../assets/nav-icons/preferences.png"
import privacy from "../assets/nav-icons/privacy-icon.svg"
import { MacroLogo,ConfigureIcon,MailIcon } from "../commons/icons"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"


interface IconsOptions{
    title:string,
    icon:string,
    path:string
}


const icons:IconsOptions[]=[
    {title:"Inicio",icon:home,path:"/bancainternet"},
    {title:"Transferencias",icon:transfers,path:""},
    {title:"Pagós",icon:payments,path:""},
    {title:"Recargas",icon:reloads,path:""},
    {title:"Inversiones",icon:investments,path:""},
     {title:"Segúros",icon:ensurence,path:""},
     {title:"Consultas y Solicitudes",icon:consults,path:""},
     {title:"Privacidad",icon:privacy,path:"/privacy"},
     {title:"Más",icon:more,path:""},

]


export const Navbar = () => {
    const navigate=useNavigate()
    const linkTo=(path:string)=>{
        navigate(path)
    }
    const{name,lastname,email,cleanUserInfo}=useContext(UserContext)

    const handleLogout=()=>{
        localStorage.removeItem('userData');
        cleanUserInfo()
        navigate("/login")

        
    }
  return (
    <nav>
        <div className='navbar-top-container'>
            <div className='navbar-top-left-container'>
                <MacroLogo/>
            </div>

            <div className='navbar-top-right-container'>
                <div className="navbar-top-info-container">
                    <strong>{`${name} ${lastname}`}</strong>
                    <p>Último ingreso 01/08/2024 a travéz de banca internet</p>

                </div>
                <div className="icon-container"><ConfigureIcon/></div>
                <div className="icon-container"><MailIcon/></div>
                {email && <button className="logout-button" onClick={handleLogout}>Salir</button>}
                    
     
            </div>

        </div>

        <div className='navbar-botton-container'>
            {
                icons.map((item,i)=>{
                    return(
                        <div key={i} className="card" onClick={()=>linkTo(item.path)}>
                            <img src={item.icon} alt={item.title}/>
                            <p>{item.title}</p>

                        </div>
                    )
                })
            }
           
            </div>

    </nav>
  )
}
