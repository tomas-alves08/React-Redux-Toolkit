import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, payLoan, requestLoan, withdraw } from "./accountSlice";
import store from "../../store";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("BRL");
  const dispatch = useDispatch()
  const {loan, loanPurpose: currentLoanPurpose, isLoading} = useSelector(store=>store.account)

  console.log(store.getState())

  function handleDeposit() {
    if(!depositAmount) return
    dispatch(deposit(depositAmount, currency))
    setDepositAmount("")
    setCurrency("BRL")
  }

  function handleWithdrawal() {
    dispatch(withdraw(withdrawalAmount))
    setWithdrawalAmount("")
  }

  function handleRequestLoan() {
    dispatch(requestLoan(loanAmount, loanPurpose))
    setLoanAmount("")
    setLoanPurpose("")
  }

  function handlePayLoan() {
    dispatch(payLoan())
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="BRL">BR Reais</option>
            <option value="NZD">NZ Dollar</option>
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={isLoading}>Deposit {depositAmount}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {loan>0 && <div>
          <span>Pay back ${loan} ({currentLoanPurpose})</span>
          <button onClick={handlePayLoan}>Pay loan</button>
        </div>
        }
      </div>
    </div>
  );
}

export default AccountOperations;
