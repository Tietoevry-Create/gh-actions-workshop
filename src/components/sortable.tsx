import {
  Announcements,
  DndContext,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  MouseSensor,
  ScreenReaderInstructions,
  TouchSensor,
  closestCenter,
  defaultDropAnimationSideEffects,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { GridContainer } from "./grid-container";
import { Item } from "./item";
import { Wrapper } from "./wrapper";

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.5",
      },
    },
  }),
};

const screenReaderInstructions: ScreenReaderInstructions = {
  draggable: `
    To pick up a sortable item, press the space bar.
    While sorting, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `,
};

const wrapperStyle = () => ({
  height: 140,
  width: 140,
});

const collisionDetection = closestCenter;
const coordinateGetter = sortableKeyboardCoordinates;
const dropAnimation = dropAnimationConfig;
const reorderItems = arrayMove;
const useDragOverlay = true;

export function Sortable() {
  const [items, setItems] = useState<number[]>(() =>
    Array.from({ length: 16 })
      .map((_, index) => index + 1)
      .sort(() => (Math.random() > 0.5 ? 1 : -1)),
  );
  const [activeId, setActiveId] = useState<number | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter,
    }),
  );
  const isFirstAnnouncement = useRef(true);
  const getIndex = (id: number) => items.indexOf(id);
  const getPosition = (id: number) => getIndex(id) + 1;
  const activeIndex = activeId ? getIndex(activeId) : -1;
  const announcements: Announcements = {
    onDragStart({ active: { id } }) {
      return `Picked up sortable item ${String(
        id,
      )}. Sortable item ${id} is in position ${getPosition(id as number)} of ${
        items.length
      }`;
    },
    onDragOver({ active, over }) {
      // In this specific use-case, the picked up item's `id` is always the same as the first `over` id.
      // The first `onDragOver` event therefore doesn't need to be announced, because it is called
      // immediately after the `onDragStart` announcement and is redundant.
      if (isFirstAnnouncement.current === true) {
        isFirstAnnouncement.current = false;
        return;
      }

      if (over) {
        return `Sortable item ${
          active.id
        } was moved into position ${getPosition(over.id as number)} of ${
          items.length
        }`;
      }

      return;
    },
    onDragEnd({ active, over }) {
      if (over) {
        return `Sortable item ${
          active.id
        } was dropped at position ${getPosition(over.id as number)} of ${
          items.length
        }`;
      }

      return;
    },
    onDragCancel({ active: { id } }) {
      return `Sorting was cancelled. Sortable item ${id} was dropped and returned to position ${getPosition(
        id as number,
      )} of ${items.length}.`;
    },
  };

  useEffect(() => {
    if (!activeId) {
      isFirstAnnouncement.current = true;
    }
  }, [activeId]);

  return (
    <DndContext
      accessibility={{
        announcements,
        screenReaderInstructions,
      }}
      sensors={sensors}
      collisionDetection={collisionDetection}
      onDragStart={({ active }) => {
        if (!active) {
          return;
        }

        setActiveId(active.id as number);
      }}
      onDragEnd={({ over }) => {
        setActiveId(null);

        if (over) {
          const overIndex = getIndex(over.id as number);
          if (activeIndex !== overIndex) {
            setItems((items) => reorderItems(items, activeIndex, overIndex));
          }
        }
      }}
      onDragCancel={() => setActiveId(null)}
    >
      <Wrapper>
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <GridContainer columns={4}>
            {items.map((value, index) => (
              <SortableItem
                key={value}
                id={value}
                index={index}
                wrapperStyle={wrapperStyle}
                useDragOverlay
              />
            ))}
          </GridContainer>
        </SortableContext>
      </Wrapper>
      {useDragOverlay
        ? createPortal(
            <DragOverlay adjustScale dropAnimation={dropAnimation}>
              {activeId ? <Item dragOverlay /> : null}
            </DragOverlay>,
            document.body,
          )
        : null}
    </DndContext>
  );
}

type SortableItemProps = {
  id: number;
  index: number;
  useDragOverlay: boolean;
  wrapperStyle(values: unknown): React.CSSProperties;
};

export function SortableItem({
  id,
  index,
  useDragOverlay,
  wrapperStyle,
}: SortableItemProps) {
  const {
    active,
    attributes,
    isDragging,
    isSorting,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  return (
    <Item
      ref={setNodeRef}
      dragging={isDragging}
      sorting={isSorting}
      id={id}
      transform={transform}
      transition={transition}
      wrapperStyle={wrapperStyle?.({ index, isDragging, active, id })}
      listeners={listeners}
      data-index={index}
      data-id={id}
      dragOverlay={!useDragOverlay && isDragging}
      {...attributes}
    />
  );
}
