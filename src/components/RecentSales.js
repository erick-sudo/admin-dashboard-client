import React, { useEffect, useState } from "react";

function RecentSales() {

    const [sales, setSales] = useState(new Array(8).fill({
        id: 1,
        date: "2021-01-01",
        invoice: "INV-0123",
        customer: "John Doe",
        status: "Pending",
        amount: 1000,
    }))

    return (
        <div className="recent-sales">
            <div className="heading"><h1>Recent Sales</h1><button>Show All</button></div>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Date</th>
                        <th>Invoice</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sales.map((item, index) => (
                            <tr key={index}>
                                <td className="select-sales"><input type="checkbox" /></td>
                                <td>{item.date}</td>
                                <td>{item.invoice}</td>
                                <td>{item.customer}</td>
                                <td>{item.amount}</td>
                                <td>{item.status}</td>
                                <td className="action-details"><button>Details</button></td>
                            </tr>
                        )
                    )
                    }
                </tbody>
            </table>
        </div>
    );
}

export default RecentSales;