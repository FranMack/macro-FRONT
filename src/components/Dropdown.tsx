import React, { useState } from 'react'
import { ArrowUp,DiscountIcon } from '../commons/icons'
import SwitchButton from '../commons/SwitchButton'

interface ItemsOptions{
  title:string,
  description:string,
  category:string,
  subCategory:string,
  active:boolean
}

export interface DropdownOptions{
  image:React.ReactElement,
  title:string,
  items:ItemsOptions[]

}



export const Dropdown = ({image,title,items}:DropdownOptions) => {

  const [dropDownOpen,setDropDownOpen]=useState<boolean>(false);
const handleDropDown=()=>{
  setDropDownOpen(!dropDownOpen)

}

  return (
    <>
    <div className='dropDown-container'>
      
      <div className='dropDown-left-container'>

        <div className='icon-container'>{image}</div>

<p>{title}</p>
      </div>
      <div className={!dropDownOpen ?'dropDown-right-container':'dropDown-right-container open'}>
      <ArrowUp onClick={handleDropDown}/>
      </div>
     
    </div>
  {dropDownOpen &&  <div className='dropDown-items-container efectoReveal'>
      {items.map((item)=>{return(
        <div className='dropDown-item'>
          <div className='left'>
            <p>{item.title}</p>
            <p><span>{item.description}</span></p>
          </div>
          <SwitchButton active={item.active} category={item.category} subCategory={item.subCategory}/>
          
        </div>
      )})}
    </div>}
    

    </>
    
  )
}
