import React, { useState, useEffect, useRef }  from "react";
import Highcharts, { SeriesOptionsType } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from 'highcharts/modules/exporting';
import styled from "@emotion/styled";



type Props = {
    height?: string,
    series: SeriesOptionsType[],
    title?: string,
    subTitle?: string,
    yAxisTitle?: string,
    xAxisTitle?: string
}

export default function BaseLineCharts(props:Props) {

    const {height, series, title, subTitle, yAxisTitle} = props;

    // Highcahrtsの設定
    // const [chartOptions, setChartOption] = useState<Highcharts.Options>({
    const chartOptions:Highcharts.Options = {
        chart: {
            type: 'area',
            height: height
        },
        title: {
            text: title
        },
        subtitle: {
            text: subTitle
        },
    
        yAxis: {
            title: {
                text: yAxisTitle
            }
        },
    
        xAxis: {
            visible: false
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
            },
        },
    
        series: [
            ...series
        ],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 550
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
    };
    // })

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