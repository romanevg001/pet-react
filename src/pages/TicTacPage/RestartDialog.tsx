import { ProgressBar } from "primereact/progressbar";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export interface IRestartDialog {
  open: () => void;
}

const RestartDialog = forwardRef<IRestartDialog>(({ winner, onRestart }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useImperativeHandle(ref, () => ({
      open: () => dialogRef.current?.showModal(),
    }));

    const close = () => {
        dialogRef.current?.close();
        onRestart();
    }

    return createPortal(
      <dialog ref={dialogRef} className="w-5 h-4">
        {winner && <p>!!! {winner} has won !!!</p>}
        {dialogRef.current?.open && <ProgressBarTillRestart close={close}></ProgressBarTillRestart>}
        <form method="dialog">
          <button onClick={onRestart}>New game</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

const progressBarSec = 15000;

function ProgressBarTillRestart({close}) {
  const [persent, setPercent] = useState(0);
  const timerRef = useRef<any>(null);

  console.log("ProgressBarTillRestart:",persent)

  if(persent >= 100) {clearInterval(timerRef.current);close();}

  useEffect(() => {
    console.log("ProgressBarTillRestart: init");
            
    timerRef.current = setInterval(() => {
        setPercent((prev) => prev + 1);
        
    }, progressBarSec / 100);

    return () => {
      console.log("ProgressBarTillRestart: unmount");
      clearInterval(timerRef.current);
    };
  }, []);

  return <ProgressBar value={persent}  className='mt-3 mb-3'></ProgressBar>;
}

export default RestartDialog;
/* 

export default  function RestartDialog({winner,onRestart,dialogRef}) {
    return (<dialog ref={dialogRef} className="w-5 h-4">
        {winner && <p>!!! {winner} has won !!!</p>}
        <form method="dialog">
            <button  onClick={onRestart}>New game</button>
        </form>
    </dialog>);
} */
