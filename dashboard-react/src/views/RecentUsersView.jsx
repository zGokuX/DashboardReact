
import RecentUsers from "../components/recentUsers"

export default function RecentUsersView(props) {
    return (
        <>
            <div className="adjustment-layout-user">
                <h2>Lista clienti</h2>
                <RecentUsers maxViewUser={props.maxViewUser} />
            </div>

        </>
    )
}