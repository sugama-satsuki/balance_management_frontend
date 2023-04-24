import React, { useState, useEffect, useRef }  from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from 'highcharts/modules/exporting';
import styled from "@emotion/styled";



type Props = {
    height?: string
}

export default function BaseLineCharts(props:Props) {

    const {height} = props;

    // Highcahrtsの設定
    const [chartOptions, setChartOption] = useState<Highcharts.Options>({
        chart: {
            type: 'area',
            height: height
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
    
        yAxis: {
            title: {
                text: ''
            }
        },
    
        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2010 to 2020'
            }
        },
    
        legend: {
            enabled: false
        },
        exporting: { enabled: false },
    
        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            },
        },
    
        series: [
            {
                name: 'Installation & Developers',
                data: [43934, 48656, 65165, 81827, 112143, 142383,
                    171533, 165174, 155157, 161454, 154610],
                type: 'area',
                color: 'var(--my-color-pink)',
                fillColor: {
                    linearGradient: {
                        x1: 1,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    },
                    stops: [
                        [0, 'var(--my-color-pink)'],
                        [1, 'var(--my-color-white)']
                    ]
                }
            }, 
            {
                name: 'Manufacturing',
                data: [24916, 37941, 29742, 29851, 32490, 30282,
                    38121, 36885, 33726, 34243, 31050],
                type: 'area',
                color: 'var(--my-color-purple)',
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1,
                    },
                    stops: [
                        [0, 'var(--my-color-purple)'],
                        [1, 'var(--my-color-white)']
                    ]
                }
            }
        ],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    })

    // 初回のみ実行
    useEffect(() => {

        HighchartsAccessibility(Highcharts);
        
        if(typeof Highcharts  ===  'object'){
            HighchartsExporting(Highcharts);
        }

    }, [])


    const pieChartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const lineChartComponentRef = useRef<HighchartsReact.RefObject>(null);

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={pieChartComponentRef} />
    )
}