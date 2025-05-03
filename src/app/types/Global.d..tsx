export interface Expense {
    id: number;
    detail: string;
    price: number;
    date: Date;
}

export interface ExpenseAdd {
    detail: string;
    price: number;
}