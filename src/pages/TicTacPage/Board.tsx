
export default function Board({onSelect, board}) {
    return (
    <div className="flex flex-wrap gap-2 w-full h-full">
      {board.map((row,ri) =>
        row.map((col,ci) => (
          <button key={'key_'+ri+'_'+ci} className="w-3 h-7rem bg-white text-lg text-center align-items-center justify-content-center flex" onClick={() =>onSelect(ri,ci)} disabled={col!=null}>{col}</button>
        ))
      )}
    </div>
  );
}
