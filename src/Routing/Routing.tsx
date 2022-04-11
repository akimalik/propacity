import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../Layouts";
import View, { Home, Requests, Templates } from "../View";
import { useAuth } from "../_contexts";

const Routing: React.FC = () => {
  const { isLoggedIn } = useAuth()
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* dashboard routing */}

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<View pageName="Home" component={Home} />} />
            {/* <Route index element={<Navigate to={'/templates'} />} /> */}
            <Route path="users" element={<View pageName="Users" component={Home} />} />
            <Route path="/users/:userId/albums" element={<View pageName="Album" component={Requests} />} />
            <Route path="/users/:userId/albums/:albumId" element={<View pageName="Photos" component={Templates} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default Routing