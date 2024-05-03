import { useSelector } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const balance = useSelector(store=>store.account.balance)
  const isLoading = useSelector(store=>store.account.isLoading)
  console.log("isLoading: ",isLoading)
  if(isLoading) return <div className="balance">...Loading</div>;
  return <div className="balance">{formatCurrency(balance)}</div>;
}

export default BalanceDisplay;
