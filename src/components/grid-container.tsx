import styles from "./grid-container.module.css";

export interface Props {
  children: React.ReactNode;
  columns: number;
}

export function GridContainer({ children, columns }: Props) {
  return (
    <ul
      className={styles.gridContainer}
      style={
        {
          "--col-count": columns,
        } as React.CSSProperties
      }
    >
      {children}
    </ul>
  );
}
