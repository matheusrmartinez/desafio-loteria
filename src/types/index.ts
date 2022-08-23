export interface Lottery {
  id: number;
  nome: string;
}

export interface Contest {
  loteriaId: number;
  concursoId: number;
}

export interface ContestData {
  id: string;
  numeros: string[];
  data: string;
  dataFormatada: string;
}

export interface SelectProps {
  lotteries: Lottery[];
  label: string;
  labelPlaceHolder: string;
  onValueChange: (value: string) => void;
}
