import { cn } from "@/lib/utils";
import { ActionType, useAction } from "@/store/action";

const Toolbar = () => {
  const { action, setAction } = useAction();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-3 px-8 py-3 rounded-md bg-transparent backdrop-blur-2xl">
      {Object.values(ActionType).map((item, index) => (
        <div
          key={item}
          className={cn(
            "p-1 px-3 rounded-md text-black/50 bg-white/40 hover:bg-white transition-colors cursor-pointer",
            action.type === item ? "bg-white" : ""
          )}
          onClick={() => {
            setAction({ type: item });
          }}
        >
          {item} ({index})
        </div>
      ))}
    </div>
  );
};

export default Toolbar;
