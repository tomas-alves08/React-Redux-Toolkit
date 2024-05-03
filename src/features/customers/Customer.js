import { useSelector } from "react-redux";
import store from "../../store";

function Customer() {
  const customer = useSelector(store=>store.customer)

  console.log(store.getState())
  return <h2>👋 Welcome{customer.fullName ? "," : "!"} {customer.fullName}</h2>;
}

export default Customer;
