import React from 'react'
import Chart from "react-apexcharts";

const ApexChart = ({ data }) => {
    return (
        <div>
            <Chart
                type="area"
                height={300}
                width='100%'
                series={[
                    {
                        name: "Commits",
                        data: data?.slice(-60).map(data => data.bid)
                    }
                ]}

                options={{
                    chart: {
                        toolbar: {
                            show: false
                        },
                        animations: {
                            enabled: false
                        }
                    },
                    colors: ['#f90000'],
                    stroke: { width: 1, curve: 'smooth' },
                    dataLabels: { enabled: false },
                    xaxis: {
                        categories: data?.slice(-60).map(data => data.bid),
                    },
                    yaxis: {
                        show: false,
                    }
                }}
            />
        </div>
    )
}

export default ApexChart
