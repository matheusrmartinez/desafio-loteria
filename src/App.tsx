import { useEffect, useState } from "react";
import "./global.css";
import Select from "./components/Select";
import { Contest, ContestData, Lottery } from "./types";
import Logo from "./assets/logo_sena.svg";
import { SortedNumberList } from "./components/SortedNumberList";
import { contestColors } from "./theme/colors";
import { api } from "./utils/api";
import { AxiosError } from "axios";
import { format, parseISO } from "date-fns";

function App() {
  const [lotteries, setLotteries] = useState<Lottery[]>([]);
  const [contests, setContests] = useState<Contest[]>([]);
  const [contestData, setContestData] = useState<ContestData>(
    {} as ContestData
  );
  const [selectedContest, setSelectedContest] = useState("");
  const [selectedContestNumber, setSelectedContestNumber] = useState<number>();

  const handleOnSelectValueChange = (selectedContest: string) => {
    setSelectedContest(selectedContest);
    setSelectedContestNumber(getContestNumberByText(selectedContest));
  };

  const getContestNumberByText = (selectedContest: string) => {
    return lotteries.find((contest) => contest.nome === selectedContest)?.id;
  };

  const getBackgroundColor = () => {
    const formattedText = selectedContest
      .normalize("NFD")
      .replace(/[^a-zA-Z ]/g, "")
      .replaceAll(/\s/g, "")
      .toLowerCase();
    return contestColors[formattedText || "megasena"];
  };

  useEffect(() => {
    const getLotteries = async () => {
      try {
        const { data } = await api.get<Lottery[]>("/loterias");

        setLotteries(data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error({
            data: axiosError.response.data,
            status: axiosError.response.status,
          });
        } else {
          console.log("Error", axiosError.message);
        }
      }
    };

    const getContests = async () => {
      try {
        const { data } = await api.get<Contest[]>("/loterias-concursos");

        setContests(data);
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error({
            data: axiosError.response.data,
            status: axiosError.response.status,
          });
        } else {
          console.log("Error", axiosError.message);
        }
      }
    };

    getContests();
    getLotteries();
  }, []);

  useEffect(() => {
    if (!selectedContest) return;
    const contestId = contests.find(
      (lottery) => lottery.loteriaId === selectedContestNumber
    )?.concursoId;

    const getContestById = async () => {
      try {
        const { data } = await api.get<ContestData>(`/concursos/${contestId}`);

        const formattedDate = format(parseISO(data.data), "dd/MM/yyyy");

        setContestData({ ...data, dataFormatada: formattedDate });
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error({
            data: axiosError.response.data,
            status: axiosError.response.status,
          });
        } else {
          console.log("Error", axiosError.message);
        }
      }
    };

    getContestById();
  }, [selectedContest]);

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "row",
          backgroundColor: getBackgroundColor(),
        }}
      >
        <div
          style={{
            width: "40%",
            paddingLeft: "96px",
            minWidth: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Select
            onValueChange={handleOnSelectValueChange}
            lotteries={lotteries}
            label="Concuros"
            labelPlaceHolder="Selecione o concurso"
          />
          <div
            style={{
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              gap: 15,
            }}
          >
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
              {selectedContest && "CONCURSO"}
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
              {selectedContest &&
                `${contestData.id} - ${contestData.dataFormatada}`}
            </p>
          </div>
        </div>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#EFEFEF",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <div style={{ display: "hidden", marginTop: "20px" }} />
          <SortedNumberList numbers={contestData?.numeros} />
          <p
            style={{
              fontFamily: "Montserrat",
              fontSize: "16px",
              fontWeight: 400,
              wordBreak: "break-word",
              display: selectedContest ? "inline" : "none",
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
