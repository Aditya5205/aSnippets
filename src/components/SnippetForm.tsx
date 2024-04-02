import { FormEvent, useState } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { addSnippet } from "../features/snippets/snippetSlice";

const SnippetForm = ({ setIsNoSnippets }: { setIsNoSnippets: Function }) => {
  const dispatch = useAppDispatch();

  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const handleAddSnippetForm = (e: FormEvent) => {
    e.preventDefault();
    const newSnippet = {
      key: key,
      value: value,
    };
    setIsNoSnippets(false);
    dispatch(addSnippet(newSnippet));
    setKey("");
    setValue("");
  };

  return (
    <form
      className="flex flex-col items-center gap-y-3 px-2"
      onSubmit={handleAddSnippetForm}
    >
      <div className="w-4/5">
        <label htmlFor="user-input" className="">
          Abbreviation
        </label>
        <input
          type="text"
          id="user-input"
          className="mt-2 h-7 w-full rounded-md border-none bg-slate-200/50 p-1 outline-none focus:border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          maxLength={20}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />
      </div>
      <div className="w-4/5">
        <label htmlFor="user-input" className="">
          Plain Text
        </label>
        <textarea
          // type="textbox"
          id="user-input"
          className="mt-2 h-14 w-full resize-none rounded-md border-none bg-slate-200/50 p-1 outline-none focus:border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="rounded-md bg-[#4708ad] px-4 py-1 hover:opacity-80"
      >
        Add
      </button>
    </form>
  );
};

export default SnippetForm;
