export default function Graphic(){
    return (
        <>
                        <div className="statistica container-full-width">
                    <div className="card">
                        <div className="card-title">
                            <h4>Progetti attivi</h4>
                            <div className="card-actions">
                                <button className="card-action-button project-btn"><i className="fa-solid fa-folder"></i></button>
                            </div>

                        </div>

                        <div className="card-content">
                            <div className="card-graphic">
                                <div className="text-in-card">
                                    <span id="number-expires">5</span>
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
      C 40,133 70,120 110,112
      S 190,110 245,106
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
                        </div>

                    </div>
                    <div className="card">
                        <div className="card-title">
                            <h4>Incassi Mese</h4>
                            <div className="card-actions">
                                <button className="card-action-button revenue-per-month"><i
                                    className="fa-solid fa-arrow-up"></i><span></span>18.5%</button>
                            </div>

                        </div>

                        <div className="card-content">
                            <div className="card-graphic">
                                <div className="text-in-card">
                                    <span className="big">€12.750</span>
                                </div>
                                <svg viewBox="0 0 560 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="area-base-2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#C6E5E2" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#C6E5E2" stopOpacity="1" />
                                        </linearGradient>

                                        <linearGradient id="area-second-2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F3FAF8" stopOpacity="0.8" />
                                            <stop offset="100%" stopColor="#F3FAF8" stopOpacity="1" />
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
    " fill="url(#area-base-2)" />

                                    <path d="
      M 0,125
      C 40,133 70,120 110,112
      S 190,110 245,106
      S 310,118 355,94
      S 430,38 470,48
      S 525,90 560,88
      L 560,160
      L 0,160
      Z
    " fill="url(#area-second-2)" />


                                    <circle className="circle" cx="110" cy="106" stroke="#2066f3" strokeWidth="1" r="7" />
                                    <circle className="circle" cx="220" cy="100" stroke="#2066f3" strokeWidth="1" r="7" />
                                    <circle className="circle" cx="320" cy="100" stroke="#2066f3" strokeWidth="1" r="7" />
                                    <circle className="circle" cx="460" cy="40" stroke="#2066f3" strokeWidth="1" r="7" />

                                </svg>
                            </div>
                        </div>

                    </div>


                </div>
        </>
    )
}