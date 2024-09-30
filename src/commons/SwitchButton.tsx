import axios from "axios";
import { useContext, useState } from "react";
import { envs } from "../config/envs";
import { UserContext } from "../context/userContext";
import { Slide, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


interface SwitchOptions {
  active: boolean;
  category: string;
  subCategory: string;
}

const SwitchButton = ({ active, category, subCategory }: SwitchOptions) => {
  const { username,token } = useContext(UserContext);
  const [isOn, setIsOn] = useState(active);


  const toggleSwitch = () => {
    axios.patch(`${envs.API_DOMAIN}/api/preferences/update`, {
      username,
      category: category,
      preferences: {
        [subCategory]: !isOn,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
    
  );
    
    toast(isOn ?"Notificación desactivada":"Notificación activada",{autoClose: 2000,transition:Slide,hideProgressBar: true,style:{backgroundColor:"#40a9d5",color:"#ffff",fontSize:"1.5rem"}})
    setIsOn(!isOn);
  };

  return (
    <div className="switch-container" onClick={toggleSwitch}>
      <div className={`switch ${isOn ? "on" : "off"}`}>
        <div className="switch-circle"></div>
      </div>
    </div>
  );
};

export default SwitchButton;
