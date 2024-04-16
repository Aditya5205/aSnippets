import { useState } from "react";
import {
  deleteSnippet,
  updateSnippet,
} from "../features/snippets/snippetSlice";
import { useAppDispatch } from "../hooks/hooks";

const SnippetCard = ({
  item,
}: {
  item: { id: string; key: string; value: string };
}) => {
  const [onEditKey, setOnEditKey] = useState<string>(item.key);
  const [onEditValue, setOnEditValue] = useState<string>(item.value);

  const dispatch = useAppDispatch();

  const handleDeleteSnippet = (id: string) => {
    dispatch(deleteSnippet(id));
  };

  const handleUpdateSnippet = () => {
    dispatch(
      updateSnippet({ id: item.id, key: onEditKey, value: onEditValue }),
    );
  };

  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <li
      className={` my-2 flex h-fit min-h-8 rounded-md bg-slate-200/50 px-2 ${isEdit ? "flex-col justify-center gap-y-3 py-2 " : "flex-row items-center"}`}
    >
      <input
        type="text"
        className={`h-7 rounded-md border-none p-1 outline-none focus:border-primary focus:outline-none focus:ring-primary ${isEdit ? "w-1/2 bg-[#ddd] text-black" : "w-2/5 bg-transparent "}`}
        value={onEditKey}
        disabled={!isEdit}
        onChange={(e) => setOnEditKey(e.target.value)}
      />
      <textarea
        className={`mx-4 max-h-7 w-full resize-none self-center rounded-md  border-none p-1 outline-none focus:border-primary focus:outline-none focus:ring-primary ${isEdit ? "min-h-14 bg-[#ddd] text-black" : " no-scrollbar overflow-y-hidden bg-transparent "}`}
        value={onEditValue}
        disabled={!isEdit}
        onChange={(e) => setOnEditValue(e.target.value)}
      />

      <div className={`ml-auto flex gap-x-2`}>
        <button
          className="h-7 w-7 rounded-md bg-[#4608ad] p-0.5 hover:opacity-80"
          onClick={() => {
            setIsEdit((prev) => !prev);
            if (isEdit) {
              handleUpdateSnippet();
            }
          }}
        >
          {!isEdit ? "✏️" : "📁"}
        </button>
        <button
          className={`h-7 w-7 rounded-md bg-[#4608ad] p-0.5 hover:opacity-80`}
          onClick={() => {
            handleDeleteSnippet(item.id);
          }}
        >
          ❌
        </button>
      </div>
    </li>
  );
};

export default SnippetCard;
