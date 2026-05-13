import { useSelector } from "react-redux";
import { selectName } from "../slices/NameSlice";

export default function OutputName() {
  const name = useSelector(selectName).value;

  return (
    <span>
      {name !== ''
        ? `Nome attuale ${name}`
        : 'Nome non inserito, vai nel dashboard per inserirlo'}
    </span>
  );
}