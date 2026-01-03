import SaveBtn from "./SaveBtn";
import ExportBtn from "./ExportBtn";


export default function Toolbar({blocks, projectId, user,canvasRef,onSaveAs}) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* other buttons */}
      <SaveBtn blocks={blocks} projectId={projectId} user={user} />
      <ExportBtn canvasRef={canvasRef} />
      <button
        type="button"
        onClick={onSaveAs}
        className="px-3 py-1 rounded-full bg-white border text-slate-700"
      >
        Save As
      </button>
    </div>
  );
}
