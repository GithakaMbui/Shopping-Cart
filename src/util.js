export default function formatCurrency(num){
    return "Ksh " + Number(num.toFixed(1)).toLocaleString() + " "; 
}