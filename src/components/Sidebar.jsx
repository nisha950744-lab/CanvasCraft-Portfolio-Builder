import { useDrag } from "react-dnd";
import { BLOCK_TYPES } from "../blocks/blockTypes";

const ITEM_TYPE = "BLOCK";

function BlockPaletteItem({ type, onDrag }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { type },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) return;
      onDrag(type); // Tell parent block was dropped
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`mb-3 cursor-grab rounded border border-slate-300 bg-white px-3 py-2 text-sm font-medium capitalize shadow-sm transition hover:bg-slate-50 active:cursor-grabbing ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {type}
    </div>
  );
}

export default function Sidebar({ onBlockAdd }) {
  return (
    <div className="flex h-full flex-col overflow-y-auto p-3 gap-2">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Sections
      </h2>
      {BLOCK_TYPES.map((type) => (
        <BlockPaletteItem key={type} type={type} onDrag={onBlockAdd} />
      ))}
    </div>
  );
}

