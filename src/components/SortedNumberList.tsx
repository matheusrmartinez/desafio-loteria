import { SortedNumber } from "./SortedNumber";

interface SortedNumberListProps {
  numbers: string[];
}

export const SortedNumberList = ({ numbers }: SortedNumberListProps) => {
  return (
    <div
      style={{
        display: "grid",
        columnGap: "50px",
        alignItems: "center",
        width: "100%",
        height: "auto",
        justifyContent: "center",
        justifyItems: "center",
        gridTemplateColumns: "repeat(6, 50px)",
        gridTemplateRows: "auto ",
        gap: "5rem",
        minWidth: "874px",
      }}
    >
      {numbers &&
        numbers.map((number) => <SortedNumber key={number} number={number} />)}
    </div>
  );
};
