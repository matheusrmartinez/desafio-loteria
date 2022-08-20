export interface Option {
  id: number;
  nome: string;
}

export interface SelectProps {
  options: Option[];
  label: string;
  labelPlaceHolder: string;
  onValueChange: (value: string) => void;
}
