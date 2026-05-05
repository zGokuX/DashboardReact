
import RecentUsers from "../components/recentUsers"

export default function RecentUsersView(props) {
    return (
        <>
            <div className="clienti container-full-width adjustment-layout-user">
                <RecentUsers maxViewUser={props.maxViewUser} />
            </div>

        </>
    )
}