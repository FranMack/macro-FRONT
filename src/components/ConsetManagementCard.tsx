import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CancelIcon, PencilIcon, SaveIcon } from "../commons/icons";
import { envs } from "../config/envs";
import { UserContext } from "../context/userContext";

interface Card1Options {
  title: string;
  value: string;
  category: string;
}

export const ConsetManagementCard = ({
  title,
  value,
  category,
}: Card1Options) => {
  const { token,setEmail } = useContext(UserContext);

  const [disable, setDisable] = useState(true);

  const [originalValue, setOriginalValue] = useState<string>(value);
  const [inputValue, setInputValue] = useState<string>(value);
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEdit = () => {
    setDisable(!disable);
  };

  useEffect(() => {
    if (!disable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disable]);

  const updateInfo = () => {
    axios
      .post(
        `${envs.API_DOMAIN}/api/auth/info/edit`,
        { newInfo: { [category]: inputValue } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {

        if(category==="email"){
          const userDataString = localStorage.getItem("userData") || "[]";
          const userData= JSON.parse(userDataString);
          const userDataUpdated={...userData,email:inputValue};
          localStorage.setItem("userData",JSON.stringify(userDataUpdated))
          setEmail(inputValue)
        }
        setOriginalValue(inputValue);
        handleEdit();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const cancel = () => {
    setInputValue(originalValue);
    handleEdit();
  };



  return (
    <div className="input-card-container">
      <label htmlFor="">{title}</label>
      <input
        ref={inputRef}
        type="text"
        disabled={disable ? true : false}
        value={inputValue}
        onChange={handleInput}
      />
      {disable && (
        <div className="icons-container">
          <PencilIcon onClick={handleEdit} />
        </div>
      )}
      {!disable && (
        <div className="icons-container">
          <SaveIcon onClick={updateInfo} />
          <CancelIcon onClick={cancel} />
        </div>
      )}
    </div>
  );
};
