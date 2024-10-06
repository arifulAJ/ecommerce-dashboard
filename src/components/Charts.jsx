import BarChartIncomeRatio from './BarChartIncomeRatio';
import PieChartRatio from './PieChartRatio';

const Charts = () => {
    return (
        <div className='w-full h-full flex gap-5 justify-between'>
         <BarChartIncomeRatio/>
         <PieChartRatio/> 
        </div>
    );
}

export default Charts;
