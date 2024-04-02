import { useEffect, useState } from "react";
import SnippetForm from "./components/SnippetForm";
import SnippetCard from "./components/SnippetCard";
import { useAppSelector, useAppDispatch } from "./hooks/hooks";
import { addSnippet } from "./features/snippets/snippetSlice";

const App = () => {
  const snippetsList = useAppSelector((state) => state.snippets);

  const dispatch = useAppDispatch();

  const [isNoSnippets, setIsNoSnippets] = useState<boolean>(true);

  useEffect(() => {
    const storageSnippets = JSON.parse(
      localStorage.getItem("snippets") || '""',
    );
    if (storageSnippets && storageSnippets.length > 0) {
      setIsNoSnippets(false);
      for (let item of storageSnippets) {
        dispatch(addSnippet({ key: item.key, value: item.value }));
      }
    } else setIsNoSnippets(true);
  }, []);

  return (
    <>
      <div className=" flex h-screen items-center justify-center text-white">
        <div className="h-fit min-h-[302.5px] w-[500px] rounded-lg bg-[#1f2937]">
          <h2 className="rounded-t-lg bg-[#4608ad] px-3 py-2 text-left text-2xl font-bold">
            aSnippets
          </h2>

          <div className=" border-gray-200 dark:border-gray-700">
            <ul
              className="flex flex-wrap text-center text-sm font-medium"
              id="default-tab"
              data-tabs-toggle="#default-tab-content"
              role="tablist"
            >
              <li className="me-2 brightness-150" role="presentation">
                <button
                  className="inline-block rounded-t-lg border-b p-4"
                  id="profile-tab"
                  data-tabs-target="#profile"
                  type="button"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  Add Snippet
                </button>
              </li>
              <li className="me-2 brightness-150" role="presentation">
                <button
                  className="inline-block rounded-t-lg border-b p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
                  id="dashboard-tab"
                  data-tabs-target="#dashboard"
                  type="button"
                  role="tab"
                  aria-controls="dashboard"
                  aria-selected="false"
                >
                  Your Snippets
                </button>
              </li>
            </ul>
          </div>
          <div id="default-tab-content">
            <div
              className="hidden rounded-lg p-2 dark:bg-gray-800"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <SnippetForm setIsNoSnippets={setIsNoSnippets} />
            </div>
            <div
              className="hidden rounded-lg p-2 dark:bg-gray-800"
              id="dashboard"
              role="tabpanel"
              aria-labelledby="dashboard-tab"
            >
              <ul className="mt-1 max-h-48 overflow-y-scroll">
                {isNoSnippets ? (
                  <li className="text-center">
                    No snippets to show for now. <br /> Add snippets to show
                    here.
                  </li>
                ) : (
                  snippetsList.map((item) => (
                    <SnippetCard item={item} key={item.id} />
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
