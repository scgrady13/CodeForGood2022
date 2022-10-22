import React from 'react';
import Chart from "react-apexcharts";

const ApexChart = ({ data }) => {
    return (
        <div>
            <Chart
                type="area"
                height={150}
                width='100%'
                series={[
                    {
                        name: "Beats per Minute",
                        data: data?.slice(-60).map(data => data)
                    },
                    {
                        name: "Body Temperature",
                        data: data?.slice(-60).map(data => data + 5)
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
                    colors: ['#f90000', '#82aef5'],
                    stroke: { width: 1, curve: 'smooth' },
                    dataLabels: { enabled: false },
                    xaxis: {
                        categories: data?.slice(-60).map(data => data),
                        labels: {
                            show: false,
                        },
                    },
                    yaxis: {
                        show: false,
                        min: 50,
                        max: 100
                    },
                    tooltip: {
                        enabled: false
                    }
                }}
            />
        </div>
    )
}

export default ApexChart
