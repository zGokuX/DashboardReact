import Dashboard from "../components/Dashboard";

export default function DashboardView(props) {
   return (
    <>
    <Dashboard maxViewUser={props.maxViewUser} maxViewCarts={props.maxViewCarts} maxViewProduct={props.maxViewProduct}/>
    </>
   )
}