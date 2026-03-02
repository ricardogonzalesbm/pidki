# Lender Bid Placement Flow

This document describes the complete flow a lender follows to place a bid (loan offer) on a borrower's loan request in the Frello app.

---

## Overview

```
Marketplace Screen
  └── Pre-condition checks (bank account, identity, SSN)
        └── Loan Offer Screen
              └── CardsStepper (3 steps)
                    ├── Step 1: Rate of Return (RateOfReturn.tsx)
                    ├── Step 2: Loan Term (LoanTerm.tsx)
                    └── Step 3: Review & Confirm (ReviewConfirm.tsx)
                          └── Success Modal → Marketplace
```

---

## Step 1 — Marketplace Screen

**File:** `src/app/lender/marketplace/index.tsx`
**Route:** `/lender/marketplace`

The lender lands on the Marketplace screen, which shows a paginated list of active loan requests from borrowers.

### What the lender sees

- A **HeroWidget** banner promoting the "Preferred Lender" upgrade ($49/month).
- A **LoanOffersWidget** header with a **sort-by** control (sort options come from content service, with a default sort fallback).
- A scrollable, paginated **FlatList** of `LoanRequestBidCard` items — up to 20 per page.
- A **Paginator** at the bottom when total results exceed the page size (20).
- Pull-to-refresh support via `RefreshControl`.

### Each loan request card displays

| Field | Description |
|---|---|
| Amount | The borrower's requested loan amount |
| Reason | Purpose of the loan (e.g., "For Home Repair") with a colored icon |
| Frello Score | Borrower's creditworthiness score with color-coded background |
| Loans Repaid | Number of loans the borrower has previously repaid |
| Additional Info | Payment frequency and repayment term summary (e.g., "You'll get paid **$X** every other week. Your loan would be repaid in **N weeks**.") |
| **"Place offer"** button | Initiates the bid flow |
| **"More details"** / **"Less details"** toggle | Expands or collapses additional card info |

### Sorting

The sort dialog can be opened via the sort-by control. The lender selects a sort option (e.g., by amount, date) and applies it. The page resets to page 1 on sort change.

### Navigating to a borrower's profile

Tapping the **Frello Score** on any card navigates to `/lender/marketplace/borrower-information` with the borrower's `score`, `borrowerId`, and `totalLoansRepaid`.

---

## Pre-condition Checks (triggered on "Place offer")

**File:** `src/app/lender/marketplace/index.tsx` — `handlePlaceBid`

Before entering the loan offer flow, the app validates the lender's account status. The checks happen in order:

### Check 1 — Bank Account Linked

If the lender has **no valid linked bank account** (`!accountStatusData.hasValidAccount`), a modal is shown prompting them to link their bank account via **Plaid**.

- The Plaid link type used is `STANDARD` (bank account linking).
- Once completed, the flow advances to the next check automatically (`IDV`).

### Check 2 — Identity Verified

If the lender has a valid bank account but **identity is not verified** and **Plaid identity verification (IDV) is not completed** (`!hasVerifiedIdentity && !hasPlaidVerificationProcessCompleted`), the same modal appears with an **IDV Plaid flow** instead.

- Plaid IDV is triggered automatically when the `linkFlowState` transitions to `LinkTokenType.IDV`.
- Once IDV is complete, the flow advances to the SSN check.

#### Link Prompt Modal

Both bank account and identity verification use a bottom-sheet-style **Modal** with a `LinkYourBankAccount` component inside it. The CTA button launches the respective Plaid flow (Standard or IDV).

### Check 3 — Tax ID / SSN on File

If the lender has a linked account and verified identity but **no Tax ID (SSN) on file** (`!accountStatusData.hasTaxId`), the lender is redirected to:

**Route:** `/lender/marketplace/social-security-number`
After submitting the SSN, the `callbackURL` brings them back to the Marketplace.

### All checks passed

Once all three checks pass, `setSelectedItem(item)` is called, which triggers the **eligibility check** query.

---

## Eligibility Check

**Query:** `useLoanOfferEligibilityQuery`

After `selectedItem` is set, the app queries whether the lender is eligible to place an offer on that specific loan request (passing `isPreferred` status and `requestId`).

- If **eligible** → navigates directly to the Loan Offer screen with the loan request parameters.
- If **not eligible** → shows a `LoanEligibilityChecker` modal explaining why the lender cannot place an offer.

---

## Step 2 — Loan Offer Screen

**File:** `src/app/lender/marketplace/loan-offer/index.tsx`
**Route:** `/lender/marketplace/loan-offer`

### URL Parameters passed in

| Param | Description |
|---|---|
| `requestId` | ID of the loan request |
| `fundingAmount` | Amount the lender would fund |
| `paymentAmount` | Borrower's payment amount per period |
| `weeksToPayOff` | Total repayment duration in weeks |
| `paybackFrequencyAmount` | Payback frequency identifier (weekly / bi-weekly) |
| `actualAmount` | The actual loan amount requested by the borrower |
| `interest` | *(optional)* Pre-filled interest rate (used when editing an existing offer) |
| `loanOfferId` | *(optional)* Present when editing an existing loan offer |
| `callbackURL` | *(optional)* Where to navigate after success (used in update flow) |
| `callbackURLPageParam` | *(optional)* Page param appended to the callback URL |

### Layout

- A `HeaderNav` back button at the top.
- A `ScrollView` wrapping the `LoanOffer` component.

### Post-submission navigation

- **New offer:** navigates to `/lender/marketplace/` on success.
- **Updating existing offer:** navigates to `callbackURL` (with optional `page` param).

---

## Step 3 — LoanOffer Component (CardsStepper)

**File:** `src/components/ui/LoanOffer/LoanOffer.tsx`
**File:** `src/components/ui/CardsStepper/CardsStepper.tsx`

The `LoanOffer` component renders a `CardsStepper` — a vertically stacked sequence of collapsible step cards, each with a step number, label, title, and content.

The stepper has **3 steps**, each managed by the shared `CardsStepperContext` which holds:
- `payload` — accumulated form data across steps
- `submitStep` — advances the stepper and merges data into the payload
- `activeStep` / `stepsSubmitted` — tracks progression
- `resetCardStepper` — resets everything (used after final submission)

---

### Step 1 — Rate of Return

**File:** `src/components/ui/LoanOffer/RateOfReturn/RateOfReturn.tsx`

The lender sets the interest rate they want to charge.

#### Form fields

| Field | Type | Validation |
|---|---|---|
| `minValue` (Interest Rate) | Range slider + numeric text input | Required, min: `0%`, max: `30%` |

The slider defaults to `0%` min / `30%` max. When editing an existing offer, the slider is pre-seeded with the existing `interest` value via a `setTimeout` (100ms) to allow the form to mount first.

#### Calculated values shown (live, reactive to slider)

| Label | Calculation |
|---|---|
| **Total loan payback amount** | `calculateTotalLoanPaybackAmount({ interest, actualAmount, fundingAmount })` |
| **Your profit** | `calculateLoanProfit({ interest, actualAmount, fundingAmount })` |

> Note: A **7% Loan Guarantee Fee** (`LoanGuaranteeFee = 7`) is added on top of the lender's chosen rate (visible in the final review step). This is disclosed in the description text on this screen.

#### Submit

Tapping **Continue** calls `submitStep` with:
- `loanOfferInterestRate` — chosen interest rate
- `loanOfferRequestCard` — full loan request card data
- `loanOfferTotalAmount` — computed total payback amount
- `loanOfferProfit` — computed profit

---

### Step 2 — Loan Term

**File:** `src/components/ui/LoanOffer/LoanTerm/LoanTerm.tsx`

The lender selects a **number of payments** for the loan.

#### Description shown

> "This borrower would like to pay back **$[paymentAmount]** [every other week / weekly]. Your loan would be repaid in **[weeksToPayOff] weeks**. What is your offer?"

The `paybackFrequencyText` is derived from `paybackFrequencyAmount`:
- `BI_WEEKLY` → "every other week"
- Otherwise → "weekly"

#### Form fields

| Field | Type | Options | Validation |
|---|---|---|---|
| `numberOfPayments` | Dropdown (`Select`) | 1, 2, 3, 6 payments | Required |

The dropdown pre-fills with `weeksToPayOff` from the previous step's payload (the borrower's requested term).

#### Calculated values shown (reactive to selection)

| Label | Calculation |
|---|---|
| **[paybackFrequencyText]** (payment per period) | `loanOfferTotalAmount / numberOfPayments` |
| **Your profit** | Carried over from Step 1 payload |

#### Submit

Tapping **Continue** calls `submitStep` with:
- `loanRequestNumberOfPayments` — selected number of payments
- `loanOfferPaybackOfferAmount` — computed per-period payment amount

---

### Step 3 — Review & Confirm

**File:** `src/components/ui/LoanOffer/ReviewConfirm/ReviewConfirm.tsx`

The lender reviews a full summary of the offer before submitting.

#### Summary table displayed

| Row | Value |
|---|---|
| Original request | Borrower's actual loan amount |
| Rate of return | Lender's chosen interest rate (e.g., `15%`) |
| Loan guarantee fee | Fixed `7%` |
| Total interest rate | `lenderRate + 7%` (normalized) |
| Total payback | Total amount the borrower repays |
| Loan term | `$[paybackOfferAmount] [frequency] repaid in [N] week(s)` |

> **Loan term weeks calculation:**
> - Bi-weekly: `numberOfPayments × 2`
> - Weekly: `numberOfPayments`

#### Profit summary box

Shows **Your Profit** (from the payload), with a footnote:
*\*Includes 7% loan insurance fee deduction*

#### Terms acceptance

The lender must check a checkbox:
> "I agree to make the above loan if selected under the Frello [Terms & Conditions](#)."

The T&C link navigates to `/terms-and-conditions`.

#### Submit button — "Submit bid"

Disabled until:
- Terms checkbox is checked
- `requestId` is present in payload
- `weeksToPayOff` is present in payload
- `totalInterestRate` is non-zero
- No mutation is in progress

#### On submit

1. **New offer** → calls `createLoanOfferMutation` with:
   - `requestId`, `interest` (total rate), `isPreferred`, `numberOfPayments`
2. **Updating existing offer** → calls `updateLoanOfferMutation` with the same fields plus `loanOfferId`
3. On success:
   - Invalidates `LOAN_OFFER_ELIGIBILITY_QUERY_KEY` cache
   - Shows the **Success Modal**
4. On error: shows a native `Alert` with a generic error message

#### Success Modal

A `DialogWithCTA` modal with:
- Title: **"Congrats!"**
- Description:
  - New offer: *"Your offer has been sent to the borrower. We'll notify you if they select your offer. Please ensure your notifications are turned on."*
  - Updated offer: *"Your modified offer has been sent to the borrower..."*
- Primary CTA:
  - New offer: **"Explore more loans"** → calls `onSuccessfulSubmit` → navigates to `/lender/marketplace/`
  - Updated offer: **"View your activity"** → calls `onSuccessfulSubmit` → navigates to `callbackURL`
- Closing the modal (backdrop or CTA) also resets the `CardsStepper` state and navigates to `/lender/marketplace/`

---

## Complete Flow Diagram

```
[Marketplace]
  │
  ├─ Sort / paginate loan request list
  ├─ Tap "Place offer" on a LoanRequestBidCard
  │
  ├─ [Pre-condition check: bank account linked?]
  │     No  → Link Bank Account Modal (Plaid Standard)
  │               └─ Success → [Pre-condition check: identity verified?]
  │     Yes ↓
  │
  ├─ [Pre-condition check: identity verified?]
  │     No  → Identity Verification Modal (Plaid IDV)
  │               └─ Success → [Pre-condition check: SSN on file?]
  │     Yes ↓
  │
  ├─ [Pre-condition check: SSN/Tax ID on file?]
  │     No  → Navigate to /lender/marketplace/social-security-number
  │               └─ Success → Back to Marketplace (callbackURL)
  │     Yes ↓
  │
  ├─ [Eligibility check for this loan request]
  │     Not eligible → LoanEligibilityChecker modal (informational)
  │     Eligible ↓
  │
  └─ Navigate to /lender/marketplace/loan-offer
        │
        └─ [CardsStepper]
              │
              ├─ Step 1: Rate of Return
              │     └─ Slider: set interest rate (0%–30%)
              │     └─ Live preview: total payback & profit
              │     └─ Tap "Continue"
              │
              ├─ Step 2: Loan Term
              │     └─ Dropdown: select number of payments (1/2/3/6)
              │     └─ Live preview: per-period payment & profit
              │     └─ Tap "Continue"
              │
              └─ Step 3: Review & Confirm
                    └─ Summary: rate, fee, total interest, payback, term, profit
                    └─ Checkbox: accept Terms & Conditions
                    └─ Tap "Submit bid"
                          │
                          ├─ API: create or update loan offer
                          └─ Success Modal → "Explore more loans" → Marketplace
```

---

## Key Constants

| Constant | Value | Description |
|---|---|---|
| `DefaultMinInterestRate` | `0` | Minimum lender interest rate |
| `DefaultMaxInterestRate` | `30` | Maximum lender interest rate |
| `LoanGuaranteeFee` | `7` | Fixed fee added to lender's rate (%) |
| `NumberOfPaymentsOptions` | 1, 2, 3, 6 | Available payment count options |
| `DefaultMarketplacePagination.pageSize` | `20` | Loan requests per page |

---

## Related Files

| File | Purpose |
|---|---|
| `src/app/lender/marketplace/index.tsx` | Marketplace screen — loan list, pre-condition checks |
| `src/app/lender/marketplace/loan-offer/index.tsx` | Loan offer screen — entry point for the 3-step form |
| `src/components/ui/LoanOffer/LoanOffer.tsx` | Orchestrates the 3 CardsStepper steps |
| `src/components/ui/CardsStepper/CardsStepper.tsx` | Generic collapsible step card container |
| `src/components/ui/LoanOffer/RateOfReturn/RateOfReturn.tsx` | Step 1 — interest rate selection |
| `src/components/ui/LoanOffer/LoanTerm/LoanTerm.tsx` | Step 2 — number of payments selection |
| `src/components/ui/LoanOffer/ReviewConfirm/ReviewConfirm.tsx` | Step 3 — final review and bid submission |
| `src/app/lender/marketplace/social-security-number/` | SSN entry screen (pre-condition gate) |
| `src/app/lender/marketplace/borrower-information/` | Borrower profile screen (accessible from marketplace card) |
