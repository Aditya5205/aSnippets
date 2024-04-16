import { FormEvent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { addSnippet } from "../features/snippets/snippetSlice";
import tickIcon from "../../public/images/check-mark.png";

const SnippetForm = ({ setIsNoSnippets }: { setIsNoSnippets: Function }) => {
  const snippetsList = useAppSelector((state) => state.snippets);
  const dispatch = useAppDispatch();

  const [key, setKey] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [isDuplicateKey, setIsDuplicateKey] = useState<boolean>(false);
  const [isConfirmAdded, setIsConfirmAdded] = useState<boolean>(false);

  let dontDispatch = false;

  const handleAddSnippetForm = (e: FormEvent) => {
    e.preventDefault();
    const newSnippet = {
      key: key,
      value: value,
    };
    setIsNoSnippets(false);

    snippetsList.map((snippet) => {
      if (snippet.key === newSnippet.key) {
        setIsDuplicateKey(true);
        dontDispatch = true;
      }
    });

    if (!dontDispatch) {
      dispatch(addSnippet(newSnippet));
      setIsConfirmAdded(true);
    } else dontDispatch = false;

    setKey("");
    setValue("");
  };

  useEffect(() => {
    if (isDuplicateKey === true) {
      setTimeout(() => {
        setIsDuplicateKey(false);
      }, 4000);
    }
  }, [isDuplicateKey]);

  useEffect(() => {
    if (isConfirmAdded === true) {
      setTimeout(() => {
        setIsConfirmAdded(false);
      }, 4000);
    }
  }, [isConfirmAdded]);

  return (
    <form
      className="flex flex-col items-center gap-y-3 px-2"
      onSubmit={handleAddSnippetForm}
    >
      <div className="w-4/5">
        <label htmlFor="user-input-abbreviation" className="">
          Abbreviation
        </label>
        <input
          type="text"
          id="user-input-abbreviation"
          className="mt-2 h-7 w-full rounded-md border-none bg-slate-200/50 p-1 outline-none focus:border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          maxLength={20}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          required
        />
      </div>
      <div className="w-4/5">
        <label htmlFor="user-input-plain-text" className="">
          Plain Text
        </label>
        <textarea
          // type="textbox"
          id="user-input-plain-text"
          className="mt-2 h-14 w-full resize-none rounded-md border-none bg-slate-200/50 p-1 outline-none focus:border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </div>
      <div className="flex w-full px-12">
        {isDuplicateKey && (
          <div className="flex h-8 items-center rounded-md bg-primary px-5 text-center text-base">
            The abbreviation already exists.
          </div>
        )}
        {isConfirmAdded && (
          <div className="flex h-8 items-center rounded-md bg-primary px-5 text-center text-base">
            Snippet added.
            <img src={tickIcon} alt="✅" className="ml-3 h-6 w-6" />
          </div>
        )}
        <button
          type="submit"
          className="mb-1 ml-auto rounded-md bg-[#4708ad] px-4 py-1 hover:opacity-80"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default SnippetForm;
