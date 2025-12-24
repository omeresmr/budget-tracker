export type Transaction = {
  amount: number;
  description: string;
  date: string;
  type: 'revenue' | 'spending' | '';
};
