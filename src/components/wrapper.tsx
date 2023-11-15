import styles from "./wrapper.module.css";

interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Wrapper({ children, style }: Props) {
  return (
    <div className={styles.Wrapper} style={style}>
      {children}
    </div>
  );
}
