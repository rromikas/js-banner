import { useState, useEffect } from "react";

export interface GoBackButtonProps {
  goBack: Function;
  transition: boolean;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ goBack, transition = false }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (transition) {
      setTimeout(() => {
        setShow(true);
      }, 250);
    } else {
      setShow(true);
    }
  }, [transition]);

  return !show ? null : (
    <div
      onClick={() => goBack()}
      className="bg-white hover:bg-gray-200 animate-fadein cursor-pointer rounded-full select-none h-42px px-5 leading-42px mr-2 mb-2"
    >
      Go back
    </div>
  );
};

export default GoBackButton;
