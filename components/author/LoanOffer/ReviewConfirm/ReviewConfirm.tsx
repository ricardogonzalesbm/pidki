{
  /*
  
  RateOfReturn.tsx
Purpose: Lender sets their desired interest rate for the loan offer.

Props:

loanRequest: LoanRequestCard — the loan request data (contains actualAmount, fundingAmount, interest)
UI Elements:

Info text — explains that a loan guarantee fee (e.g. 1%) will be added to the chosen rate
RangerSlider — a single-handle range slider (min to max interest rate, increments of 1%) connected to minValue form field, labeled "Interest rate", displayed as a percentage
Two info cards side by side:
Total loan payback amount — currency, recalculates live as slider moves
Your profit — currency, also recalculates live
"Continue" button — disabled until form is valid
What it submits to the stepper (step 1):


loanOfferInterestRate    → the selected interest rate (number)
loanOfferRequestCard     → the full loanRequest object
loanOfferTotalAmount     → calculated total payback (string)
loanOfferProfit          → calculated profit (string)
  
  */
}
