import React from 'react'

const bottomMenu:string[]=["Home","Contactanos","Telefónos útiles","Pregúntas frecuentes","Seguridad","Términos y condiciones"]

export const Footer = () => {
  return (
    <footer>
    <ul className="footer-menu">
    {bottomMenu.map((item,i)=>{
        return (<li key={i}>{item}</li>)
    })}

</ul>
    </footer>
  )
}
