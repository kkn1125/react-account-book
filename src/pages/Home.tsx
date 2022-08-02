import React, { useContext, useRef, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { Tooltip } from "chart.js";
import {
  AccountDispatch,
  AccountState,
  CREATE,
} from "../contexts/accountContext";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import Account from "../models/Accout";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// const data = {
//   datasets: [
//     {
//       type: "line" as const,
//       label: "Cost graph",
//       borderColor: "rgb(255, 99, 132)",
//       borderWidth: 2,
//       fill: false,
//       data: [{ x: "test", y: 0 }],
//     },
//     // {
//     //   type: "bar" as const,
//     //   label: "Cost graph",
//     //   backgroundColor: "rgb(75, 192, 192)",
//     //   data: [{ x: "", y: 5 }],
//     //   borderColor: "white",
//     //   borderWidth: 2,
//     // }
//   ],
// };

const categories = [
  {
    name: "경비",
    value: "경비",
  },
  {
    name: "식비",
    value: "식비",
  },
  {
    name: "의료비",
    value: "의료비",
  },
  {
    name: "오락",
    value: "오락",
  },
];

function Home() {
  const dispatch = useContext(AccountDispatch);
  const { account: accountList } = useContext(AccountState);

  const nextId = useRef(0);
  const [state, setState] = useState({
    category: "",
    cost: 0,
    inout: false,
    username: "kimson",
    regdate: null,
    updates: null,
  });

  const [labels, setLabels] = useState([
    "월",
    "화",
    "수",
    "목",
    "금",
    "토",
    "일",
  ]);

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Cost graph",
        borderColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: [],
      },
    ],
  });

  const createAccount = (account: Account) => {
    account.id = nextId.current;
    account.regdate = Date.now();
    account.updates = Date.now();

    dispatch({
      type: CREATE,
      account: account,
    });

    nextId.current += 1;

    setData({
      labels,
      datasets: [
        {
          type: "line" as const,
          label: "Cost graph",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 2,
          fill: false,
          data: accountList.map(({ inout, cost }) => cost),
          // [{ x: "test", y: 0 }],
        },
      ],
    });
  };

  const handleChange = (e: any) => {
    const target = e.target as HTMLInputElement;
    setState({
      ...state,
      [target.name]: target.name !== "inout" ? target.value : !state.inout,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const account = new Account();
    account.setObject(state);
    console.log(account);
    createAccount(account);
  };

  return (
    <div>
      <Stack
        direction='row'
        component='form'
        sx={{ p: 3 }}
        onSubmit={handleSubmit}>
        <FormControl size='small' sx={{ flex: "10% 0 0" }}>
          <InputLabel id='category'>Category</InputLabel>
          <Select
            name='category'
            labelId='category'
            value={state.category as "" | HTMLInputElement}
            onChange={handleChange}
            label='Category'
            autoWidth>
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {categories.map(({ name, value }) => (
              <MenuItem key={name} value={value}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          sx={{ flex: "10% 0 0", justifyContent: "center" }}
          control={
            <Checkbox
              name='inout'
              checked={state.inout}
              onChange={handleChange}
            />
          }
          label='In-Out'
        />

        <TextField
          name='cost'
          label='Cost'
          type='text'
          variant='outlined'
          fullWidth
          size='small'
          onChange={handleChange}
        />
        <Button type='submit'>입력</Button>
      </Stack>

      <Chart type={"bar"} options={options} data={data} />
    </div>
  );
}

export default Home;

/**
 * dataset 생성 부터 만들어야함
 * 주별, 월별, 일별 각 템플릿 만들어서 조정해야 할 듯
 */
