export const BentoItem = ({
  image,
  width,
  height,
  rowStart,
  rowEnd,
  colStart,
  colEnd,
}: {
  image: string;
  width: number;
  height: number;
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}) => {
  return (
    <div
      className={`flex w-full h-full rounded-lg col-start-${colStart} col-end-${colEnd} row-start-${rowStart} row-end-${rowEnd}`}
    >
      <img
        alt="Anime character"
        src={image}
        width={width}
        height={height}
        className="object-cover object-center rounded-lg shadow-md shadow-dark hover:scale-95 hover:translate-y-1 transition-all"
      />
    </div>
  );
};
