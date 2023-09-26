import ReactApexChart from 'react-apexcharts';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// utils
// components
import {useContext} from "react";
import {StepsDataContext, SleepDataContext} from "../ChildActivitiesSummary";
import Iconify from "../../../../../../components/Iconify";
import {fNumber, fPercent} from "../../../../../../utils/formatNumber";

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

type Props = {
  title: string;
  total: number | string | any;
  percent: number;
  chartColor: string;
  chartData: number[];
};

export default function ActivityWidgetSummary({ title, percent, total, chartColor, chartData }: Props) {
  const theme = useTheme();
  const minute = isNaN(parseFloat((total - Math.floor(total)).toFixed(2)))?0:parseFloat((total - Math.floor(total)).toFixed(2));




  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName: number | string) => fNumber(seriesName),
        title: {
          formatter: (seriesName: number | string) => '',
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify
              width={16}
              height={16}
              icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
            />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
        </Stack>

         <Typography variant="h3">
            {title.indexOf("Sleep")>0?
             fNumber(total)+"h "+ (Math.round(minute*60))+"m"
            :fNumber(total)}
          </Typography>
      </Box>

      <ReactApexChart
        type="bar"
        series={[{ data: chartData }]}
        options={chartOptions}
        width={60}
        height={36}
      />
    </Card>
  );
}
