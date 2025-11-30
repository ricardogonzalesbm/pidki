import { LoanReasonType } from "@/components/ui/LoanRequestBidCard/LoanRequestBidCard";

export interface LoanRequest {
  id: string;
  amountRequested: number;
  loanReason: LoanReasonType;
  userScore: number;
  numberOfPayments: number;
  borrowerName: string;
}

export const mockLoanRequests: LoanRequest[] = [
  {
    id: "1",
    amountRequested: 1500.0,
    loanReason: "medical",
    userScore: 85,
    numberOfPayments: 3,
    borrowerName: "María González",
  },
  {
    id: "2",
    amountRequested: 2000.0,
    loanReason: "homeRepair",
    userScore: 92,
    numberOfPayments: 2,
    borrowerName: "Carlos Rodríguez",
  },
  {
    id: "3",
    amountRequested: 800.0,
    loanReason: "carRepair",
    userScore: 78,
    numberOfPayments: 1,
    borrowerName: "Ana Martínez",
  },
  {
    id: "4",
    amountRequested: 1200.0,
    loanReason: "education",
    userScore: 88,
    numberOfPayments: 4,
    borrowerName: "Luis Fernández",
  },
  {
    id: "5",
    amountRequested: 500.0,
    loanReason: "bills",
    userScore: 65,
    numberOfPayments: 2,
    borrowerName: "Sofia Torres",
  },
  {
    id: "6",
    amountRequested: 1800.0,
    loanReason: "moving",
    userScore: 75,
    numberOfPayments: 3,
    borrowerName: "Diego Pérez",
  },
  {
    id: "7",
    amountRequested: 950.0,
    loanReason: "groceries",
    userScore: 70,
    numberOfPayments: 1,
    borrowerName: "Valentina López",
  },
];
