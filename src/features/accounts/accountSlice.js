import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    balance:0,
    loan:0,
    loanPurpose:"",
    isLoading:false
}

const accountSlice = createSlice({
    name:"account",
    initialState,
    reducers:{
        deposit(state, action){
            state.balance += action.payload
            state.isLoading = false;
        },
        withdraw(state, action){
            state.balance -= action.payload
        },
        requestLoan:{
            prepare(amount, purpose){
                return{
                    payload:{amount, purpose}
                }
            },
            reducer(state, action){
            if(state.loan > 0) return;
            state.loan = action.payload.amount;
            state.loanPurpose = action.payload.purpose;
            state.balance += action.payload.amount;
            }
        },
        payLoan(state){
            state.balance -= state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        loading(state){
            state.isLoading = true;
        }
    }
});

console.log(accountSlice.actions)

export const { loading, withdraw, requestLoan, payLoan} = accountSlice.actions;

export function deposit(amount, currency){
    if(currency === "BRL") return{type:"account/deposit", payload:amount}
    
    return async function(dispatch){
        dispatch(loading())
        const host = 'api.frankfurter.app';
        const resp = await fetch(`https://${host}/latest?amount=${amount}&from=${currency}&to=BRL`)
        const data = await resp.json()
        const convertedAmount = data.rates.BRL
    
        dispatch({ type:"account/deposit", payload:convertedAmount})
    }
}

export default accountSlice.reducer
