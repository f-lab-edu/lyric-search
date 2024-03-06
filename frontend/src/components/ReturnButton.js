import { useNavigate } from "react-router-dom";
import styles from "./ReturnButton.module.css";

function ReturnButton() {
  const navigate = useNavigate();

  return (
    <button className={styles.returnButton} onClick={() => navigate(-1)}>
      🔙
    </button>
  );
}

export default ReturnButton;
