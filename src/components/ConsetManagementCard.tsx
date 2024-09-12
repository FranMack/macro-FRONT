import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CancelIcon, PencilIcon, SaveIcon } from "../commons/icons";
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
  const { token } = useContext(UserContext);

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
        `http://localhost:3000/api/auth/info/edit`,
        { newInfo: { [category]: inputValue } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
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
    <div className="input-container">
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
