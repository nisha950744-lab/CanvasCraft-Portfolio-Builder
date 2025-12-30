import SaveBtn from "./SaveBtn";
import ExportBtn from "./ExportBtn";


export default function Toolbar({blocks, projectId, user,canvasRef}) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* other buttons */}
      <SaveBtn blocks={blocks} projectId={projectId} user={user} />
      <ExportBtn canvasRef={canvasRef} />
    </div>
  );
}
