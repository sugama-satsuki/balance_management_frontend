import React from 'react';

/* import css */ 
import styles from './dashboard.module.css';


/* import template */
import BaseLayout from '../../template/base_layout/baseLayout';

/* import atoms */ 
import Spacer from '../../atoms/spacer/spacer';

/* import organisms */ 
import ReportArea from '../../organisms/report_area/reportArea';
import CalendarArea from '../../organisms/calendar_area/calendarArea';




export default function Dashboard(){


    return(
        <BaseLayout menuNumber={1} pageTitle="ダッシュボード">
        <div className={styles.topPageWrapper}>

            <Spacer size="s">
                <ReportArea />
            </Spacer>

            <Spacer size="s">
                <CalendarArea />
            </Spacer>
        </div>
        </BaseLayout>
    )
}