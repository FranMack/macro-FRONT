import React, { useContext, useEffect, useRef, useState } from "react";
import { PrivacyLetter } from "../components/PrivacyLetter";
import { ComplementaryInfo } from "../components/ComplementaryInfo";
import { ConsentManagement } from "../components/ConsentManagement";
import { Preferences } from "./Preferences";
import { PrivacySectionContext } from "../context/privacySections.context";
const privacyOptions = [{
  category:"Privacidad",
  subCategories:[{title:"Política de Privacidad y Uso de Datos Personales de Banco Macro",path:"privacy_letter"},
    {title:"Informacion complementaria para los consumidores",path:"complementary_info"},
    {title:"GESTIÓN DE MI CONSENTIMIENTO",path:"consent_management"},]
},


{
  category:"Notificaciones",
  subCategories:[{title:"Gestion de notificaciones",path:"preferences_management"},]
},

  
  
 
];

export const Privacy = () => {
    
    const changePrivacySection=(section:string)=>{
        setPrivacySection(section)

    }

    const{ privacySection,setPrivacySection}=useContext(PrivacySectionContext)

    const articleRef= useRef<HTMLDivElement | null>(null)

useEffect(()=>{
  if(articleRef.current){
    articleRef.current.scrollTo(0,0)
  }
  
},[privacySection])
    


  return (
    <section className="privacy-container">
      <aside >
        {privacyOptions.map((item, i) => {
          return (
            <div className="aside-card" key={i}>
          <h4 >{item.category}</h4>
          {item.subCategories.map((item)=>{
            return(<p onClick={()=>changePrivacySection(item.path)}>{item.title}</p>)})}
          </div>);
        })}
      </aside>
      <div ref={articleRef} className="privacy-left-container">
       { /*<ul className="privacy-nav-container">
          <li>Privacidad</li>
          <li>Notificaciones</li>
        </ul>*/}
        <article >
            {privacySection==="privacy_letter" &&<PrivacyLetter/>}
            {privacySection==="complementary_info" &&<ComplementaryInfo/>}
            {privacySection==="consent_management" &&<ConsentManagement/>}
            {privacySection==="preferences_management" &&<Preferences/>}
       
    

        </article>
      </div>
    </section>
  );
};
