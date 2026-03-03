export const enum PaybackFrequency {
  WEEKLY = "weekly",
  BI_WEEKLY = "bi-weekly",
  MONTHLY = "monthly",
}

export const enum LoanStatus {
  ACTIVE = "active",
  DELINQUENT = "delinquent",
  COMPLETED = "completed",
}

export enum LoanRequestStatus {
  PENDING = "pending",
  POSTED = "posted",
  WITHDRAWN = "withdrawn",
  ACCEPTED = "accepted",
}

export const enum LoanPaymentsStatus {
  SCHEDULED = "SCHEDULED",
  PROCESSED = "PROCESSED",
  COMPLETED = "COMPLETED",
  LATE = "LATE",
  DELINQUENT = "DELINQUENT",
}

export enum UserRole {
  LENDER = "lender",
  BORROWER = "borrower",
}

export enum DevicePlatform {
  ANDROID = "android",
  IOS = "ios",
}
