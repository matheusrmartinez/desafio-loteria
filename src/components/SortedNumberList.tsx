import { SortedNumber } from "./SortedNumber";

interface SortedNumberListProps {
  numbers: string[];
}

export const SortedNumberList = ({ numbers }: SortedNumberListProps) => {
  return (
    <div
      style={{
        backgroundColor: "#EFEFEF",
        display: "grid",
        columnGap: "50px",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        gridTemplateColumns: "repeat(6, 50px)",
        gridTemplateRows: "auto ",
        gap: "5rem",
        minWidth: "874px",
      }}
    >
      {numbers.map((number) => (
        <SortedNumber number={number} />
      ))}
    </div>
  );
};
