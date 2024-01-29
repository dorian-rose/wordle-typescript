export interface IModalPropsTypes {
  show: boolean;
  close: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}
