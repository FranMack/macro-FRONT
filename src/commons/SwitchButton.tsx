import { useContext, useState } from 'react';
import axios from "axios";
import { UserContext } from '../context/userContext';

interface SwitchOptions{
  active:boolean,
  category:string,
  subCategory:string
}

const SwitchButton = ({active,category,subCategory}:SwitchOptions) => {

  const {username}=useContext(UserContext)
  const [isOn, setIsOn] = useState(active);
  console.log("yyyyyyyyyyyyyyyyyy",subCategory)
  console.log("zzzzzzzzzzzzzzzzzzzzz",category)

  const toggleSwitch = () => {
    axios.patch(`http://localhost:3000/api/preferences/update`,{
      username,
      category:category,
      preferences:{
        [subCategory]:!isOn
      }
    })
    setIsOn(!isOn);
  };

  return (
    <div className="switch-container" onClick={toggleSwitch}>
      <div className={`switch ${isOn ? 'on' : 'off'}`}>
        <div className="switch-circle"></div>
      </div>
    </div>
  );
};

export default SwitchButton;