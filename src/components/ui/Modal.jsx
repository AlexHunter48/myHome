import { createContext, useContext, useState, cloneElement } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useOutsideClick } from "../../hooks/useOutsideClick";

const ModalContext = createContext();

export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: (e) => {
      e.stopPropagation();
      open(opensWindowName);
    },
  });
}

function Window({ children, name, positionClasses = "left-0" }) {
  const { openName, close } = useContext(ModalContext);

  const isOpen = name === openName;

  const ref = useOutsideClick(close);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 1, scale: 0.95, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -6 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 0.8,
          }}
          className={`absolute top-[calc(100%+14px)] z-50 w-80 bg-white p-4 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-neutral-100/80 origin-top ${positionClasses}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Modal.Open = Open;
Modal.Window = Window;
