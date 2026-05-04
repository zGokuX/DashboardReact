import Maincomponent from "./main";

export default function Layout() {
    return (
        <>
            <div className="layout">
                <aside>
                    <nav>
                        <ul>
                            <li><a href="#"><i className="fa-solid fa-bell"></i><span>Dashboard</span></a></li>
                            <li className="fixed"><a id="link-click" href="#"><i
                                className="fa-solid fa-folder"></i><span>Progetti</span></a>
                                <ul id="list-hidden">
                                    <li>
                                        <a href="#">Project-1</a>
                                    </li>
                                    <li>
                                        <a href="#">Project-2</a>
                                    </li>
                                    <li>
                                        <a href="#">Project-3</a>
                                    </li>
                                </ul>
                            </li>
                            <li><a href="#"><i className="fa-solid fa-users"></i><span>Clienti</span></a></li>
                            <li><a href="#"><i className="fa-solid fa-file-invoice"></i><span>Fatture</span></a></li>
                            <li><a href="#"><i className="fa-solid fa-coins"></i><span>Finanze</span></a></li>
                            <li><a href="#"><i className="fa-solid fa-chart-bar"></i><span>Analisi</span></a></li>
                            <li><a href="#"><i className="fa-solid fa-cog"></i><span>Impostazioni</span></a></li>
                            <li><a href="#"><i className="fa-solid fa-headset"></i><span>Supporto</span></a></li>
                        </ul>
                    </nav>
                </aside>
                <Maincomponent />
            </div>
        </>
    )
}