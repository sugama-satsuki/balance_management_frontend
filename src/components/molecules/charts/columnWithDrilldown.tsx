import React, { useState, useEffect, useRef }  from "react";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsAccessibility from "highcharts/modules/accessibility";
import HighchartsExporting from 'highcharts/modules/exporting'
import drilldown from "highcharts/modules/drilldown";



type Props = {
    mainData: {
        name: string,
        y: number,
        drilldown: string,
        color: string
    }[]
}

export default function ColumnWithDrilldown(props:Props) {

    const {mainData} = props;


    drilldown(Highcharts);

    // Highcahrtsの設定
    const [chartOptions, setChartOption] = useState<Highcharts.Options>({
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        accessibility: {
            announceNewData: {
                enabled: true
            },
            point: {
                valueSuffix: '円'
            }
        },
        xAxis: {
            type: 'category',
            allowDecimals: false,
            className: '',
            lineWidth: 0,
        },
        yAxis: {
            title: {
                text: '金額（円）'
            },
            className: 'displayNone',
            gridLineWidth: 0
        },
        exporting: { enabled: false },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: ''
                }
            }
        },
        series: [
            {
                showInLegend: false, 
                name: '月の出費',
                colorByPoint: true,
                type: 'column',
                data: mainData
            }
        ],

        drilldown: {
            series: [
                {   
                    name: 'カテゴリ1',
                    id: 'category1',
                    data: [
                        { name: 'エステ１', y:42 },
                        { name: '洋服代', y:36 },
                        { name: '化粧品代', y:22 }
                    ],
                    type: 'column',
                },
                {
                    name: 'カテゴリ2',
                    id: 'category2',
                    data: [
                        { name: 'Pythonの本', y:50 },
                        { name: 'Reactの本', y:45 },
                        { name: 'デザインの本', y:5 }
                    ],
                    type: 'column',
                },
                {
                    name: 'カテゴリ3',
                    id: 'category3',
                    data: [
                        { name: '食費', y:60 },
                        { name: '娘の服', y:30 },
                        { name: 'その他', y:10 }
                    ],
                    type: 'column',
                }
            ]
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

    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} ref={pieChartComponentRef} />
    )
}