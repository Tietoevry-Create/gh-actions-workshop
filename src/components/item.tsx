import type { DraggableSyntheticListeners } from "@dnd-kit/core";
import type { Transform } from "@dnd-kit/utilities";
import { CSSProperties, forwardRef, memo, useEffect } from "react";
import { classNames } from "../utils/class-names";
import styles from "./item.module.css";

export interface Props {
  dragOverlay?: boolean;
  dragging?: boolean;
  id?: number;
  transform?: Transform | null;
  listeners?: DraggableSyntheticListeners;
  sorting?: boolean;
  transition?: string | null;
  wrapperStyle?: React.CSSProperties;
}

export const Item = memo(
  forwardRef<HTMLLIElement, Props>(
    (
      {
        dragOverlay,
        dragging,
        id,
        listeners,
        sorting,
        transition,
        transform,
        wrapperStyle,
        ...props
      },
      ref,
    ) => {
      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return (
        <li
          className={classNames(
            styles.Wrapper,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay,
          )}
          style={
            {
              ...wrapperStyle,
              transition: [transition, wrapperStyle?.transition]
                .filter(Boolean)
                .join(", "),
              "--translate-x": transform
                ? `${Math.round(transform.x)}px`
                : undefined,
              "--translate-y": transform
                ? `${Math.round(transform.y)}px`
                : undefined,
              "--scale-x": transform?.scaleX
                ? `${transform.scaleX}`
                : undefined,
              "--scale-y": transform?.scaleY
                ? `${transform.scaleY}`
                : undefined,
              "--index": id,
            } as React.CSSProperties
          }
          ref={ref}
        >
          <div
            className={classNames(
              styles.Item,
              dragging && styles.dragging,
              dragOverlay && styles.dragOverlay,
              id != null && styles.Image,
            )}
            {...props}
            {...listeners}
            tabIndex={0}
            style={
              id
                ? ({
                    "--x": (id - 1) % 4,
                    "--y": Math.floor((id - 1) / 4),
                  } as CSSProperties)
                : undefined
            }
          />
        </li>
      );
    },
  ),
);
