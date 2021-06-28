import { useState, useEffect } from "react";

export interface GoBackButtonProps {
  goBack: Function;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ goBack }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, []);

  return !show ? null : (
    <div
      onClick={() => goBack()}
      className="bg-white hover:bg-gray-200 cursor-pointer rounded-full select-none h-42px px-5 leading-42px mr-2 mb-2"
    >
      Go back
    </div>
  );
};

export default GoBackButton;
