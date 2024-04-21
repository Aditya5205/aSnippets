import { useEffect, useState } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetCard from "./components/SnippetCard";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { addSnippet } from "./features/snippets/snippetSlice";

const App = () => {
  const snippetsList = useAppSelector((state) => state.snippets);

  const dispatch = useAppDispatch();

  const [isNoSnippets, setIsNoSnippets] = useState<boolean>(true);
  const [showSlideOne, setShowSlideOne] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage.local
      .get(["snippets"])
      .then((res) => {
        if (Object.keys(res).length === 0) return "";
        else return JSON.parse(res.snippets);
      })
      .catch((err) => {
        console.log(err);
      })
      .then((res: string | any[]) => {
        if (res && res.length > 0) {
          setIsNoSnippets(false);
          for (let item of res) {
            dispatch(addSnippet({ key: item.key, value: item.value }));
          }
        } else setIsNoSnippets(true);
      });
    // chrome.storage.local.get(console.log);
  }, []);

  useEffect(() => {
    chrome.contextMenus.removeAll();

    snippetsList.map((snippet) => {
      chrome.contextMenus.create({
        title: snippet.key,
        contexts: ["editable"],
        id: snippet.value,
      });
    });

    if (snippetsList.length === 0) setIsNoSnippets(true);
    else setIsNoSnippets(false);
  }, [snippetsList]);

  return (
    <>
      <div className="h-fit min-h-[335px] w-[500px] bg-[#1f2937] text-[16px] text-white">
        <h2 className="bg-[#4608ad] px-3 py-2 text-left text-2xl font-bold focus:ring-red-500 active:ring-red-500">
          aSnippets
        </h2>

        <div className="mb-3 mt-1 flex h-10 w-full gap-x-2 px-2">
          <button
            className={`flex-grow ${showSlideOne ? "rounded-t-lg border-b border-b-white bg-slate-200/10" : "opacity-50 hover:opacity-30"}`}
            onClick={() => setShowSlideOne(true)}
          >
            Add Snippet
          </button>
          <button
            className={`flex-grow ${showSlideOne ? "opacity-50 hover:opacity-30" : " rounded-t-lg border-b border-b-white bg-slate-200/10"}`}
            onClick={() => setShowSlideOne(false)}
          >
            Your Snippets
          </button>
        </div>
        <div className={`${showSlideOne ? "block" : "hidden"}`}>
          <SnippetForm setIsNoSnippets={setIsNoSnippets} />
        </div>
        <div className={`p-2 ${showSlideOne ? "hidden" : "block"}`}>
          <ul className="no-scrollbar mt-1 max-h-48 overflow-y-scroll">
            {isNoSnippets ? (
              <li className="text-center">
                No snippets to show for now. <br /> Add snippets to show here.
              </li>
            ) : (
              snippetsList.map((item) => (
                <SnippetCard item={item} key={item.id} />
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
