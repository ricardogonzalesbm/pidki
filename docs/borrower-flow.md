# Borrower Loan Request Flow

This document describes the complete flow a borrower follows — from landing on the home screen to having an active loan — in the Frello app.

---

## Overview

```
Borrower Home Screen (/borrower)
  └── "Request a loan" button
        └── Router gate (/borrower/loan)
              └── Loan Request Screen (/borrower/loan/request)
                    └── CardsStepper (4 or 5 steps)
                          ├── Step 1: Loan Amount
                          ├── Step 2: Loan Payback
                          ├── Step 3: Reason
                          ├── Step 4: Review & Confirm  ──► API: create loan request
                          └── Step 5: Identity & Banking (conditional)
                                └── Plaid Standard → Plaid IDV → SSN Screen
                                      └── /borrower/loan (router gate)
                                            ├── No bank/IDV → Link Bank Account Screen
                                            ├── No SSN → Social Security Number Screen
                                            └── Request POSTED → Offers Screen
```

---

## Phase 1 — Borrower Home Screen

**File:** `src/app/borrower/index.tsx`
**Route:** `/borrower`

The home screen is **state-driven**. The state that leads to the loan request flow is `welcome`.

### `welcome` state (first-time borrower)

Shown when the borrower has no active loan and no loan request on record.

- **Title:** "Welcome, [FirstName]!"
- **Description:** "We're glad you're here. Let's get started."
- **CTA button:** "Request a loan" → navigates to `/borrower/loan/`

---

## Phase 2 — Router Gate

**File:** `src/app/borrower/loan/index.tsx`
**Route:** `/borrower/loan`

This is a **routing-only screen** — it shows a spinner while running checks, then immediately `router.replace`s to the correct destination. The borrower never stays on this screen.

### Routing logic (evaluated in order)

| Condition | Destination |
|---|---|
| Has an active loan | `/borrower/loan/active-loan` |
| Has a pending loan request AND bank/IDV incomplete | `/borrower/loan/link-your-bank-account` (with `linkTokenType` param) |
| Has any loan request AND no SSN/Tax ID on file | `/borrower/loan/social-security-number` (with `callbackURL`) |
| Has a loan request with status `POSTED` AND Plaid verification completed | `/borrower/loan/offers` |
| Loan request range API says borrower is eligible | `/borrower/loan/request` ← **this is the "Request a loan" path** |
| None of the above (fallback) | Displays a placeholder: *"Once your loan request has been approved, this is where you will see your active loan request and offers."* |

---

## Phase 3 — Loan Request Screen

**File:** `src/app/borrower/loan/request.tsx`
**Route:** `/borrower/loan/request`

A `ScrollView` wrapping the `LoanRequest` component. While Plaid mutations (exchange token or IDV session record) are in progress, an overlay `ActivityIndicator` is shown.

The `LoanRequest` component renders a **`CardsStepper`** with **4 steps** (or **5 steps** if bank account/identity verification is incomplete).

---

## CardsStepper Steps

### Step 1 — Loan Amount

**File:** `src/components/ui/LoanRequest/LoanAmount/LoanAmount.tsx`

The borrower selects how much they want to borrow.

#### What's shown

- **Question:** "How much would you like to borrow?"
- **Range slider** with currency text input — bounds are fetched dynamically from `useLoanRequestRangeQuery`:
  - Min: dynamic (falls back to `$25`)
  - Max: dynamic (falls back to `$25`)
- **Tooltip:** "Request more" — informational tooltip from content service
- **"Continue"** button (disabled while loading or if form is invalid)

#### Submit

Calls `submitStep` with:
- `loanRequestAmount` — selected dollar amount

---

### Step 2 — Loan Payback

**File:** `src/components/ui/LoanRequest/LoanPayback/LoanPayback.tsx`

The borrower selects their preferred repayment schedule.

#### What's shown

- **Question:** "What's your preferred payback schedule?"
- **Dropdown 1 — Payment frequency:**
  - Weekly
  - Bi-Weekly
  - Monthly
- **Dropdown 2 — Number of payments** (options update dynamically based on frequency selected):
  - Weekly: 26, 52, 78, or 104 weekly payments
  - Bi-Weekly: 26, 52, 78, or 104 bi-weekly payments
  - Monthly: 12, 24, 36, or 48 monthly payments
- **Simulation label** (shown once both dropdowns are filled):
  > "You'll pay approximately **$X.XX–$Y.YY\*** every [week/two weeks/month] until [date]."
  > *\*Total loan amount based on offer selected*

#### Submit

Calls `submitStep` with:
- `loanRequestPaybackFrequency` — selected frequency
- `loanRequestNumberOfPayments` — selected number of payments

---

### Step 3 — Reason

**File:** `src/components/ui/LoanRequest/Reason/Reason.tsx`

The borrower selects the purpose of the loan.

#### What's shown

- **Question:** "What's your reason for the loan?"
- **Tooltip** (informational, from content service)
- **`LoanReasons` grid** (3-column icon grid) — primary reasons:
  - Home Repair, Car Repair, Medical, Groceries, Bills, Emergency, Moving, Education
- **"Other" option** — opens a modal with a dropdown of additional reasons (e.g., Car Payment, Rent, Child Expense, Credit Card, Vacation, Debt Consolidation, Large Purchase, Legal Fees, Transportation, Rather Not Say)

#### Submit

Calls `submitStep` with:
- `loanRequestReason` — selected reason string

---

### Step 4 — Review & Confirm

**File:** `src/components/ui/LoanRequest/ReviewConfirm/ReviewConfirm.tsx`

The borrower reviews their loan request summary before submitting.

#### Summary displayed

| Field | Value |
|---|---|
| Loan amount | Amount from Step 1 (formatted as currency) |
| Payment frequency | Frequency label from Step 2 |
| Number of payments | Count from Step 2 |
| Reason | Reason from Step 3 |

> Note: *"Total loan amount based on offer selected"* — the borrower sees a range estimate, not a fixed amount, since the final rate depends on which lender offer they accept.

#### Submit — "Confirm request"

Calls `useCreateLoanRequestMutation` with:
- `requestedAmount`, `paybackFrequency`, `numberOfPayments`, `reason`

**On success:**
- If bank/identity verification is **incomplete** (Step 5 is present): calls `submitStep({ step: 4 })` to advance to the Identity & Banking step.
- If bank/identity verification is **already complete** (Step 5 is absent): calls `router.replace('/borrower/loan/')` to re-enter the router gate, which will then route to the Offers screen.

**On error:** shows a native `Alert` with a generic error message.

---

### Step 5 — Identity & Banking *(conditional)*

**File:** `src/components/ui/LoanRequest/IdentityBanking/IdentityBanking.tsx`

**Only shown if** the borrower does not yet have a valid linked bank account AND/OR verified identity.

#### What's shown

- **Title:** "Link your bank account to finalize your loan request!"
- **Description:** "We need your banking information to determine your eligibility."
- **"Complete verification steps"** button — launches the Plaid flow

#### Plaid flow sequence (chained automatically)

1. **Plaid Standard** (bank account linking) — on success, immediately launches:
2. **Plaid IDV** (identity verification) — on success, navigates to:
3. **`/borrower/loan/social-security-number`** with `callbackURL: '/borrower/loan/'`

> If the bank account is already linked but IDV is not yet done, only the IDV step is triggered.

---

## Phase 4 — Link Your Bank Account Screen *(standalone, from router gate)*

**File:** `src/app/borrower/loan/link-your-bank-account.tsx`
**Route:** `/borrower/loan/link-your-bank-account`

Reached from the router gate when a loan request is pending but bank/IDV is incomplete. Accepts `linkTokenType` as a URL param (`STANDARD` or `IDV`) to determine which Plaid flow to launch.

- **Title:** "Finish account verification to finalize your loan request!"
- **Description:** "Your loan request has been submitted, but we need your banking and identity information to determine your eligibility."
- **"Verify my account"** button → launches Plaid
- On Plaid success → navigates to `/borrower/loan/social-security-number` with `callbackURL: '/borrower/loan/'`

---

## Phase 5 — Social Security Number Screen

**File:** `src/app/borrower/loan/social-security-number.tsx`
**Route:** `/borrower/loan/social-security-number`

The borrower enters their SSN/Tax ID. Uses the `useSocialSecurityNumber` hook to handle the form and submission. After success, navigates back to `callbackURL` (which is `/borrower/loan/`), re-entering the router gate.

---

## Phase 6 — Loan Offers Screen

**File:** `src/app/borrower/loan/offers.tsx`
**Route:** `/borrower/loan/offers`

Once the loan request is approved (`status: POSTED`) and all verifications are complete, the borrower lands here to review and accept lender offers.

### What's shown

- **`BorrowerLoanRequest` header card** — summary of the borrower's own request:
  - Amount, reason with icon, requested date
  - Payment info: "You requested to make N payments of $X every [week/two weeks]. Your loan will be paid off in Y weeks, ending [date]."
  - **"Cancel Loan Request"** button
- **`LoanNoOffer` placeholder** — shown when no offers have arrived yet:
  > "Check back soon for your offers! As soon as you start receiving offers, you'll find them here. Make sure your notification settings are turned on."
- **`LoanOffersWidget`** sort control — shown when there is more than 1 offer:
  - Sort options: Total payback (low/high), Payback period (low/high), Interest rate (low/high), Weekly payments (low/high)
- **Paginated `FlatList`** of `OfferTileWidget` cards (20 per page, pull-to-refresh)

### Each offer tile shows

| Field | Description |
|---|---|
| Total payback | Calculated total amount the borrower repays |
| Interest rate | The offer's interest rate (including guarantee fee) |
| Description | "You'll pay back **$X** every [week/month]. Your loan will be paid off in **N [weeks/months]**" |
| Valid through | Offer expiration date |
| **"Accept offer"** button | Opens the confirmation modal |

### Accepting an offer

1. Tapping **"Accept offer"** opens a **`LoanOfferConfirmationCard`** modal inside a `DialogWrapper` with:
   - Full offer details
   - **"That's the one!"** CTA → calls `useAcceptLoanOfferMutation`
   - **"Cancel"** CTA → closes the modal
   - **"View Loan Agreement"** link → opens a nested `LoanAgreement` modal (PDF viewer)

2. On accept success → shows the **Success Dialog:**
   - Title: "Your funds are ready to deposit!"
   - Description: "Transfer your funds to your personal bank account from your Frello wallet."
   - **"Go to Wallet"** → navigates to `/borrower/wallet`
   - Closing the dialog → `router.replace('/borrower/loan/active-loan')`

### Cancelling the loan request

Tapping "Cancel Loan Request" opens a confirmation `DialogWithCTA`:
- Title: "Are you sure you want to cancel your loan request?"
- Description: "You cannot undo this action. (But you can always make another request in the future.)"
- **"I'm sure!"** → calls `useWithdrawLoanRequestMutation`
- **"Nevermind"** → closes the modal

---

## Phase 7 — Active Loan Screen

**File:** `src/app/borrower/loan/active-loan.tsx`
**Route:** `/borrower/loan/active-loan`

Once the borrower has accepted an offer and funds are deposited, this screen shows the full details of the ongoing loan.

### `ActiveLoanCard` displays

| Section | Details |
|---|---|
| Title | Loan icon + amount + reason (e.g., "$500 for Home Repair") |
| Remaining Payments | Count of payments left |
| Accepted on | Date the loan was accepted |
| Repaid so far | Dollar amount + percentage progress bar + remaining balance |
| Next payment | Amount + due date |
| Loan Details (expandable) | Interest rate, payment frequency, repayment start date, number of payments, payback amount, base payment, origination fee |
| Loan Agreement | Button to open the loan agreement PDF modal |

### Help section

Below the loan card, a "Need Help?" section with three buttons:
- **"See loan FAQ's"** → `/borrower/support`
- **"Visit the Help Center"** → `/borrower/support/faq`
- **"Contact Us"** → opens the Intercom message composer

---

## Home Screen States (post-request)

After the loan request is submitted and verified, the **borrower home screen** (`/borrower`) reflects the current lifecycle state:

| State | Condition | HeroCard shown |
|---|---|---|
| `linkYourBankAccount` | Request exists, verification incomplete | "Finish account verification..." + "Verify my account" |
| `requestAwaitingApproval` | Request status: `PENDING` | "Your loan request is awaiting approval." (no CTA) |
| `requestApproved` | Request status: `POSTED`, no active loan | "Your loan request has been submitted!" + "View my loan offers" → `/borrower/loan/offers` |
| `readyForDeposit` | Active loan exists with wallet balance > 0 | "Your funds are ready for deposit!" + "Go to Wallet" → `/borrower/wallet` |
| `payment` | Active loan, no pending wallet balance | "You've paid $X of $Y" progress bar + next payment due date |

---

## Complete Flow Diagram

```
[Borrower Home — "welcome" state]
  │
  └── Tap "Request a loan"
        │
        └── [/borrower/loan — Router Gate]
              │  (fetches: activeLoan, loanRequest, accountStatus, loanRequestRange)
              │
              └── Eligible for new request?
                    Yes ↓
                    [/borrower/loan/request — Loan Request Screen]
                          │
                          └── [CardsStepper]
                                │
                                ├── Step 1: Loan Amount
                                │     └── Slider: select $ amount (dynamic range)
                                │     └── Tap "Continue"
                                │
                                ├── Step 2: Loan Payback
                                │     └── Dropdown: payment frequency (Weekly/Bi-Weekly/Monthly)
                                │     └── Dropdown: number of payments (dynamic options)
                                │     └── Live simulation: estimated payment range + end date
                                │     └── Tap "Continue"
                                │
                                ├── Step 3: Reason
                                │     └── Icon grid: select loan reason (8 primary + "Other" modal)
                                │     └── Tap "Continue"
                                │
                                ├── Step 4: Review & Confirm
                                │     └── Summary: amount, frequency, # payments, reason
                                │     └── Tap "Confirm request"
                                │           │
                                │           └── API: createLoanRequest
                                │                 │
                                │                 ├── Bank/IDV incomplete → Step 5 ↓
                                │                 └── Bank/IDV complete → /borrower/loan/ (gate)
                                │
                                └── Step 5 (conditional): Identity & Banking
                                      └── Tap "Complete verification steps"
                                            └── Plaid Standard (bank link)
                                                  └── Success → Plaid IDV (identity)
                                                        └── Success → /borrower/loan/social-security-number
                                                              └── Submit SSN
                                                                    └── /borrower/loan/ (gate)
                                                                          │
                                                                          └── POSTED + verified
                                                                                └── [/borrower/loan/offers]
                                                                                      │
                                                                                      ├── Browse & sort offers
                                                                                      ├── View Loan Agreement
                                                                                      └── Tap "Accept offer"
                                                                                            └── Confirmation modal
                                                                                                  └── "That's the one!"
                                                                                                        └── API: acceptLoanOffer
                                                                                                              └── Success modal
                                                                                                                    └── "Go to Wallet"
                                                                                                                          └── [/borrower/loan/active-loan]
```

---

## Related Files

| File | Purpose |
|---|---|
| `src/app/borrower/index.tsx` | Borrower home screen — lifecycle state display |
| `src/app/borrower/loan/index.tsx` | Router gate — redirects based on current loan state |
| `src/app/borrower/loan/request.tsx` | Loan request screen — hosts the CardsStepper form |
| `src/components/ui/LoanRequest/LoanRequest.tsx` | Orchestrates the 4–5 step CardsStepper |
| `src/components/ui/LoanRequest/LoanAmount/LoanAmount.tsx` | Step 1 — loan amount slider |
| `src/components/ui/LoanRequest/LoanPayback/LoanPayback.tsx` | Step 2 — payment frequency & number of payments |
| `src/components/ui/LoanRequest/Reason/Reason.tsx` | Step 3 — loan reason selection |
| `src/components/ui/LoanRequest/ReviewConfirm/ReviewConfirm.tsx` | Step 4 — summary review + API call |
| `src/components/ui/LoanRequest/IdentityBanking/IdentityBanking.tsx` | Step 5 (conditional) — Plaid verification CTA |
| `src/app/borrower/loan/link-your-bank-account.tsx` | Standalone Plaid link screen (from router gate) |
| `src/app/borrower/loan/social-security-number.tsx` | SSN entry screen |
| `src/app/borrower/loan/offers.tsx` | Loan offers list — browse, sort, accept |
| `src/app/borrower/loan/active-loan.tsx` | Active loan detail screen |
