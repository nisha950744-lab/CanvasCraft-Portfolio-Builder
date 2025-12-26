/*import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { Rnd } from "react-rnd";

const ITEM_TYPE = "BLOCK";

export default function Canvas() {
  const [blocks, setBlocks] = useState([]);

  const [, drop] = useDrop(//useDrop returns [collectedProps, dropRef] but collectedProps is not needed
    () => ({
      accept: ITEM_TYPE,//only BLOCK type draggable items are accepted on Canvas
      drop: (item) => {//Runs when a block is dropped,item =data sent from useDrag()
        const id = Date.now();//Creates a unique ID using timestamp,it Used as React key and block identifier
        setBlocks((prev) => [
          ...prev,
          {
            id,
            type: item.type,
            x: 40,
            y: 40,
            width: 320,
            height: 160,
            //Adds a new block with default position and size,type from sidebar
          },
        ]);
      },
    }),
    []
  );

  const updateBlock = useCallback((id, patch) => {//patch = partial update (x, y, width, height)
    setBlocks((prev) =>
       prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));//Finds matching block by id,Merges old block with new values
  }, []);

  const removeBlock = useCallback((id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <div
      ref={drop}//gives drop behavior to this div
      className="relative flex h-full w-full items-start justify-center overflow-auto p-4"
      //relative:required :for absolute positioning inside,overflow-auto:scroll when blocks overflow
    >
      
      <div //actual canvas area
        className="relative h-full w-full max-w-5xl rounded-lg border border-dashed border-slate-300 bg-white/70">
        {blocks.map((block) => (
          <Rnd//rnd is the resizable and draggable component
            key={block.id}
            size={{ width: block.width, height: block.height }}
            position={{ x: block.x, y: block.y }}
            bounds="parent"//Prevents dragging outside the canvas
            onDragStop={(e, d) =>//onDragStop means call back fired when drag stops
              //d:drag data object provided by react-rnd,contains info about the final position of the block after drag stops
              updateBlock(block.id, { x: d.x, y: d.y })//update the location of the block
            }
            onResizeStop={(e, dir, ref, delta, position) =>//onResizeStop means callback fired when resize stops
              updateBlock(block.id, {
                width: parseInt(ref.style.width, 10),//parseInt is used in place of Number() as it cuts the decimal part ,decimal can cause blurred elements also ref.style.width retuns in px
                height: parseInt(ref.style.height, 10),
                x: position.x,
                y: position.y,
              })
            }
            onMouseDown={(e) => {
              e.stopPropagation();
              setSelectedBlockId(block.id);
            }}
            className="group absolute box-border"//absolute:positioned relative to canvas,group : allows hover effects inside
          >
            <div className="flex h-full w-full flex-col rounded-md border border-black bg-white/95 shadow-sm">
            
              <div className="flex items-center justify-between border-b border-slate-200 px-2 py-1 text-xs">
                <span className="font-semibold capitalize text-slate-700">
                  {block.type}
                </span>
                <button
                  onClick={() => removeBlock(block.id)}
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                  title="Remove block"
                  type="button"
                >
                  X
                </button>
              </div>
              
              <div className="flex flex-1 items-center justify-center px-3 py-2 text-[11px] text-slate-400">
                placeholder
              </div>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}*/
// Canvas.jsx
// Canvas.jsx
import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { Rnd } from "react-rnd";
import { BlockTemplate } from "../blocks/BlockTemplate"; // switch that renders HeroBlock/About/... or stub for now

const ITEM_TYPE = "BLOCK";

const defaultDataByType = {
  hero: { name: "", designation: "", avatarUrl: "" },
  about: { intro: "", fieldOfWork: "" },
  bio: { bioText: "" },
  //gallery: { images: [] },
  contact: { phone: "", email: "", linkedin: "" },
  publications: {
    items: [
      { id: Date.now(), title: "", journal: "", year: "", authors: [""] },
    ],
  },
};

export default function Canvas({ onBlockDropped }) {
  const [blocks, setBlocks] = useState([]);

  // droppable canvas
  const [, drop] = useDrop(
    () => ({
      accept: ITEM_TYPE,
      drop: (item) => {
        const id = Date.now();
        setBlocks((prev) => [
          ...prev,
          {
            id,
            type: item.type,
            x: 40,
            y: 40,
            width: 360,
            height: 220,
            data: defaultDataByType[item.type] ?? {},
          },
        ]);
        onBlockDropped?.();
      },
    }),
    [onBlockDropped]
  );

  // update / remove helpers
  const updateBlock = useCallback((id, patch) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...patch } : b))
    );
  }, []);

  const removeBlock = useCallback((id) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <div
      ref={drop}
      className="relative h-full w-full overflow-auto p-4"
    >
      <div className="relative h-full w-full rounded-lg border border-dashed border-slate-300 bg-white/70">
        {blocks.map((block) => (
          <Rnd
            key={block.id}
            size={{ width: block.width, height: block.height }}
            position={{ x: block.x, y: block.y }}
            bounds="parent"
            onDragStop={(e, d) =>
              updateBlock(block.id, { x: d.x, y: d.y })
            }
            onResizeStop={(e, dir, ref, delta, position) =>
              updateBlock(block.id, {
                width: parseInt(ref.style.width, 10),
                height: parseInt(ref.style.height, 10),
                x: position.x,
                y: position.y,
              })
            }
            className="absolute box-border"
          >
            <div className="flex h-full w-full flex-col rounded-md border border-sky-500 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-2 py-1 text-xs">
                <span className="font-semibold capitalize text-slate-700">
                  {block.type}
                </span>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                >
                  X
                </button>
              </div>

              <div className="flex-1 overflow-auto px-3 py-2 text-xs">
                <BlockTemplate
                  block={block}
                  updateBlock={updateBlock}
                />
              </div>
            </div>
          </Rnd>
        ))}
      </div>
    </div>
  );
}
