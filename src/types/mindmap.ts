export type Node = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
};

export type Connection = {
  from: string;
  to: string;
};