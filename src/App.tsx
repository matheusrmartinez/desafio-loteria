import { useState } from "react";
import "./App.css";
import Select from "./components/Select";
import { Option } from "./types";
import Logo from "./assets/logo_sena.svg";
import { SortedNumber } from "./components/SortedNumber";
import { SortedNumberList } from "./components/SortedNumberList";

function App() {
  const contestData = [
    {
      id: 0,
      nome: "mega-sena",
    },
    {
      id: 1,
      nome: "quina",
    },
    {
      id: 2,
      nome: "lotofácil",
    },
    {
      id: 3,
      nome: "lotomania",
    },
    {
      id: 4,
      nome: "timemania",
    },
    {
      id: 5,
      nome: "dia de sorte",
    },
  ] as Option[];

  const [contests, setContests] = useState<Option[]>(contestData);
  const [selectedContest, setSelectedContest] = useState("");

  const handleOnSelectValueChange = (selectedContest: string) => {
    setSelectedContest(selectedContest);
    const contestId = getContestIdByText(selectedContest);
  };

  const getContestIdByText = (selectedContest: string) => {
    return contests.find((contest) => contest.nome === selectedContest)?.id;
  };

  const numberData = ["06", "09", "28", "33", "37", "40"];

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "30%",
            paddingLeft: "96px",
            height: "100vh",
            backgroundColor: "#6befa3",
            minWidth: "400px",
          }}
        >
          <div style={{ paddingTop: "92px" }}>
            <Select
              onValueChange={handleOnSelectValueChange}
              options={contestData}
              label="Concuros"
              labelPlaceHolder="Selecione o concurso"
            />
          </div>
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: 20,
            }}
          >
            <img width={"60px"} height={"56px"} src={Logo} alt="Logo Mega" />
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "30px",
                color: "#ffffff",
                fontWeight: 700,
              }}
            >
              {selectedContest.toUpperCase()}
            </p>
          </div>
          <div style={{ bottom: "50px", position: "absolute" }}>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "14px",
                color: "#ffffff",
                fontWeight: 500,
                letterSpacing: "0.135em",
                lineHeight: "17px",
              }}
            >
              CONCURSO
            </p>
            <p
              style={{
                fontFamily: "Montserrat",
                fontSize: "20px",
                color: "#ffffff",
                fontWeight: 700,
                lineHeight: "17px",
              }}
            >
              4531 - 07/04/2020
            </p>
          </div>
        </div>
        <SortedNumberList numbers={numberData} />
        <div style={{ position: "absolute", bottom: "55px", left: "1000px" }}>
          <p
            style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 400,
              wordBreak: "break-word",
            }}
          >
            Este sorteio é meramente ilustrativo e não possui nenhuma ligação
            com a CAIXA.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
