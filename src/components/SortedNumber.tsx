interface SortedNumberProps {
  number: string;
}

export const SortedNumber = ({ number }: SortedNumberProps) => (
  <div
    style={{
      width: "100px",
      height: "100px",
      backgroundColor: "#ffffff",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      borderRadius: "50px",
    }}
  >
    <p style={{ fontSize: "27px", fontFamily: "Montserrat" }}>{number}</p>
  </div>
);
