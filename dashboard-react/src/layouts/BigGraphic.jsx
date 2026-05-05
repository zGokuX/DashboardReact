export default function BigGraphic() {
    return (
        <>
            <div className="card-content">
                <div className="card-graphic">
                    <div className="container-graphic">
                        <div className="list-cash-y">

                            <span>€ 400</span>

                            <span>€ 300</span>

                            <span>€ 200</span>

                            <span>€ 100</span>

                        </div>
                        <svg viewBox="0 0 560 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="area-base" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#7EA6F8" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#7EA6F8" stopOpacity="1" />
                                </linearGradient>

                                <linearGradient id="area-second" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#EFF4FC" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#EFF4FC" stopOpacity="1" />
                                </linearGradient>
                            </defs>

                            <path d="
      M 0,125
      C 40,123 70,110 110,102
      S 190,100 245,95
      S 310,108 355,86
      S 430,28 470,36
      S 525,72 560,82
      L 560,160
      L 0,160
      Z
    " fill="url(#area-base)" />

                            <path d="
      M 0,125
      C 40,133 70,120 110,110
      S 190,110 245,102
      S 310,118 355,94
      S 430,38 470,48
      S 525,90 560,88
      L 560,160
      L 0,160
      Z
    " fill="url(#area-second)" />

                            <circle className="circle" cx="110" cy="106" stroke="#2066f3" strokeWidth="1" r="7" />
                            <circle className="circle" cx="220" cy="100" stroke="#2066f3" strokeWidth="1" r="7" />
                            <circle className="circle" cx="320" cy="100" stroke="#2066f3" strokeWidth="1" r="7" />
                            <circle className="circle" cx="460" cy="40" stroke="#2066f3" strokeWidth="1" r="7" />

                        </svg>
                    </div>
                    <div className="list-month">

                        <span>Gen</span>

                        <span>Feb</span>

                        <span>Mar</span>

                        <span>Apr</span>

                        <span>Mag</span>

                        <span>Giu</span>

                        <span>Lug</span>

                        <span>Ago</span>

                        <span>Set</span>

                        <span>Ott</span>

                        <span>Nov</span>

                        <span>Dic</span>

                    </div>
                    <div className="summary">

                        <table className="table-summary">

                            <thead className="table-header-summary">

                                <tr>

                                    <th>Quest'anno</th>

                                    <th>Anno Scorso</th>

                                    <th>Anno prossimo</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr className="success no-bg-color bolder">

                                    <td>+18.5%</td>

                                    <td>+24%</td>

                                    <td>+2.40%</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}