import React from "react";

function Sale({title, icon, value}) {
    return (
        <div className="summary-sales">
            <div className="chart-icon">{icon}</div>
            <div className="values">
                <div className="h1">{title}</div>
                <div className="h2"><span className="currency">$</span>{value}</div>
            </div>
        </div>
    );
}

function SalesGraph() {
    return (
        <div className="sales-graph">
            <div className="graph-title">Sales</div>
            <div className="graph-content">

            </div>
            <div className="graph-footer">

            </div>
        </div>
    )
}

export default Sale;