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
import { styled } from "@stitches/react";

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

  const Wrapper = styled("div", {
    display: "flex",
    flexDirection: "row",
    "@media only screen and (max-width: 1023px)": {
      flexDirection: "column",
    },
  });

  const LotteryContainer = styled("div", {
    width: "40%",
    height: "100vh",
    paddingLeft: "96px",
    minWidth: "400px",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: getBackgroundColor(),
    justifyContent: "space-around",
    "@media only screen and (max-width: 1023px)": {
      height: "30vh",
      width: "100%",
      justifyContent: "space-around",
      minWidth: "875px",
      alignItems: "center",
      paddingLeft: "0px",
    },
    "@media only screen and (max-width: 872px)": {
      height: "100vh",
    },
  });

  const SortedNumbersContainer = styled("div", {
    height: "100vh",
    display: selectedContest ? "flex" : "none",
    flexDirection: "column",
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    width: "60%",
    justifyContent: "space-around",
    "@media only screen and (max-width: 1023px)": {
      flexDirection: "column",
      height: "70vh",
      minHeight: "70vh",
      minWidth: "869px",
      width: "100%",
    },
    "@media only screen and (max-width: 872px)": {
      paddingTop: "50px",
      height: "100vh",
    },
  });

  const LotteryFooter = styled("div", {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gap: 15,
    "@media only screen and (max-width: 1023px)": {
      alignItems: "center",
    },
  });

  return (
    <Wrapper>
      <LotteryContainer>
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
        <LotteryFooter>
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
        </LotteryFooter>
      </LotteryContainer>
      <SortedNumbersContainer>
        <div style={{ display: "hidden", marginTop: "40px" }} />
        <SortedNumberList numbers={contestData?.numeros} />
        <div style={{ marginTop: "3rem" }}>
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
      </SortedNumbersContainer>
    </Wrapper>
  );
}

export default App;
