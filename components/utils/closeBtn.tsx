import { AiFillCloseCircle } from "react-icons/ai";

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="closeBtn">
      <AiFillCloseCircle size={26} color="#1e6dc0" className="text-gray-700 cursor-pointer" />
    </button>
  );
};

export default CloseButton;
