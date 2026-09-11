import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FilterContext = createContext();

export default function FilterModal({ children }) {
  const [openName, setIsOpenName] = useState("");

  const close = () => setIsOpenName("");

  const open = setIsOpenName;

  useEffect(() => {
    if (openName) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [openName]);

  return (
    <FilterContext.Provider value={{ close, open, openName }}>
      {children}
    </FilterContext.Provider>
  );
}

function Open({ children, opens: windowName }) {
  const { open, openName, close } = useContext(FilterContext);
  return cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation();

      if (openName === windowName) {
        close();
      } else {
        open(windowName);
      }
    },
  });
}

function Window({ children, name }) {
  const { openName, close } = useContext(FilterContext);

  if (name !== openName) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6 backdrop-blur-[2px]"
      onClick={close}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-[28px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        {cloneElement(children, { onClose: close })}
      </div>
    </div>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);
  if (context === undefined)
    throw new Error("Context was used outside of provider");
  return context;
}
FilterModal.Open = Open;
FilterModal.Window = Window;
