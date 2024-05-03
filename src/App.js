import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";
import store from "./store";

function App() {
  const fullName = useSelector(store=>store.customer.fullName)
  console.log(store.getState())
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!fullName && <CreateCustomer />}
      {fullName && 
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      }
    </div>
  );
}

export default App;
