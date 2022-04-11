import { AccountBalanceWallet, Visibility } from "@mui/icons-material";
import { Box, Drawer, Grid, List, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useWebContext } from "../../_contexts";
import { useGetUsers } from "./home.api";
import './home.scss';

type props = {
}
const Home: React.FC<props> = ({ children }) => {
  const { notification } = useWebContext()
  const [content, setContent] = useState('Error')
  const { isLoading, response } = useGetUsers()
  const [DrawerSingleData, setDrawerSingleData] = useState<any>()
  const [DrawerisOpen, setDrawerisOpen] = useState(false);

  const [rows, Setrows] = useState<any[]>()
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
      field: 'username',
      headerName: 'User Name',
      width: 150,
      editable: true,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
  ];

  const toggleDrawerisOpen = (ev: boolean, data: any) => {
    setDrawerisOpen(ev);
    setDrawerSingleData(data)
  };

  function handleClick() {
    notification(content, 'error')
  }

  useEffect(() => {
    if (!!response) {
      Setrows(response)
    }
  }, [response])
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => { toggleDrawerisOpen(false, {}) }}
      onKeyDown={() => { toggleDrawerisOpen(false, {}) }}
    >
      <List>
        <h4 className="modal-title">View Details : </h4>
        <div className="view-box">
          <ul>
            <li>
              <span className="view-title">Name</span>
              <span className="view-status">{DrawerSingleData?.name}</span>
            </li>
            <li>
              <span className="view-title">Email</span>
              <span className="view-status">{DrawerSingleData?.email}</span>
            </li>
            <li>
              <span className="view-title">UserName</span>
              <span className="view-status">{DrawerSingleData?.username}</span>
            </li>
            <li>
              <span className="view-title">Phone</span>
              <span className="view-status">{DrawerSingleData?.phone}</span>
            </li>
            <li>
              <span className="view-title">Website</span>
              <span className="view-status">{DrawerSingleData?.website}</span>
            </li>
            <li>
              <span className="view-title">Company</span>
              <span className="view-status">{DrawerSingleData?.company && DrawerSingleData.company.name}</span>
            </li>
            <li>
              <span className="view-title">Address</span>
              <span className="view-status">{DrawerSingleData?.address && DrawerSingleData.address.street + ", " + DrawerSingleData.address.suite + ", " + DrawerSingleData.address.city}</span>
            </li>

          </ul>
        </div>
      </List>
    </Box>
  );

  return (
    <>
      <Paper sx={{ p: [2] }}>
        {rows &&
          <div className="table-responsive">
            <Box component="table" className="table" sx={{
              // border: `1px solid`,
              width: '100%',
              borderCollapse: 'collapse',
              "th,td": {
                border: `1px solid #dddddd`,
                padding: '8px',
                textAlign: 'left'
              },
              'tr:nth-child(even)': {
                backgroundColor: '#ddd'
              }
            }}>
              <thead>
                <tr>
                  <th> Name </th>
                  <th> UserName </th>
                  <th> Email </th>
                  <th>Action </th>
                </tr>
              </thead>
              <tbody>
                {
                  rows && rows.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td> {item.name}</td>
                        <td> {item.username}</td>
                        <td> {item.email}</td>
                        <td>
                          <Visibility
                            sx={{ color: 'green', cursor: 'pointer', mr: 2 }}
                            onClick={() => { toggleDrawerisOpen(true, item) }} />
                          <i
                            className="mdi mdi-eye px-1 cursor-pointer color-green"
                            title="View"
                          // onClick={ViewModal(item)}
                          ></i>
                          <Link to={"/users/" + item.id + "/albums"}>
                            <AccountBalanceWallet />
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Box>
          </div>
        }
      </Paper>


      <Grid item xs={12} md={6}>

      </Grid>

      <Drawer
        anchor={'right'}
        open={DrawerisOpen}
        onClose={() => (toggleDrawerisOpen(false, {}))}
      >{list()}
      </Drawer>

    </>
  )
}
export default Home