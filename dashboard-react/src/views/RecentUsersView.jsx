import RecentUsers from "../components/recentUsers"

export default function RecentUsersView() {
    return (
        <>
            <div className="adjustment-layout-user">
                <h2>Lista clienti</h2>
                <RecentUsers maxViewUser={25} inPage={true}/>
            </div>

        </>
    )
}