export function csvParser(fileText: string | ArrayBuffer | null) {
    const str = String(fileText).split("\n");
    const rows = str.map(line => line?.split(';'));

  //console.log(String(fileText).split("\n"));
  return rows;
}
