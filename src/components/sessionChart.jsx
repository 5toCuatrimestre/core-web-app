import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { LineChart } from "@mui/x-charts/LineChart";
import PaginationOutlined from "./paginationOutlined";

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function getDaysInMonth(month, year) {
  const date = new Date(year, month, 0);
  const monthName = date.toLocaleDateString("en-US", {
    month: "short",
  });
  const daysInMonth = date.getDate();
  const days = [];
  let i = 1;
  while (days.length < daysInMonth) {
    days.push(`${monthName} ${i}`);
    i += 1;
  }
  return days;
}

export default function SessionsChart() {
  const theme = useTheme();
  const data = getDaysInMonth(1, 2025);

  const colorPalette = [
    theme.palette.primary.light,
    theme.palette.primary.main,
    theme.palette.primary.dark,
  ];

  return (
    <Box variant="outlined" sx={{ width: "100%" }}>
      <Stack sx={{ justifyContent: "space-between" }} className="mt-2">
        <Stack
          direction="row"
          sx={{
            alignContent: { xs: "center", sm: "flex-start" },
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h4" component="p">
            10,277
          </Typography>
          <Chip size="small" color="success" label="+25%" />
        </Stack>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Último Mes
        </Typography>
      </Stack>
      <LineChart
        colors={colorPalette}
        xAxis={[
          {
            scaleType: "point",
            data,
            tickInterval: (index, i) => (i + 1) % 5 === 0,
          },
        ]}
        series={[
          {
            id: "direct",
            label: "Direct",
            showMark: false,
            curve: "linear",
            stack: "total",
            area: true,
            stackOrder: "ascending",
            data: [
              300, 900, 600, 1200, 1500, 1800, 2400, 2100, 2700, 3000, 1800,
              3300, 3600, 3900, 4200, 4500, 3900, 4800, 5100, 5400, 4800, 5700,
              5000, 6300, 6600, 6900, 6200, 7500, 4800,
            ],
          },
        ]}
        height={250}
        margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
        grid={{ horizontal: true }}
        sx={{
          "& .MuiAreaElement-series-organic": {
            fill: "url('#organic')",
          },
          "& .MuiAreaElement-series-referral": {
            fill: "url('#referral')",
          },
          "& .MuiAreaElement-series-direct": {
            fill: "url('#direct')",
          },
        }}
        slotProps={{
          legend: {
            hidden: true,
          },
        }}
      >
        <AreaGradient color={theme.palette.primary.main} id="direct" />
      </LineChart>
    </Box>
  );
}
