import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "scence/dashboard";
import Layout from "scence/layout";
import { themeSettings } from "theme";
import Products from "scence/products";
import Customers from "scence/customers";
import Transaction from "scence/transaction";
import Geography from "scence/geography";
import Overview from "scence/Overview";
import Daily from "scence/Daily";
import Monthly from "scence/Monthly";
import BreakDown from "scence/BreakDown";
import Admins from "scence/Admins";
import Performance from "scence/Performance"

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout/>}>
            <Route path="/" element={<Navigate to={"/dashboard"} replace />}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/product" element={<Products/>}/>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/transaction" element={<Transaction/>}/>
            <Route path="/geography" element={<Geography/>}/>
            <Route path="/overview" element={<Overview/>}/>
            <Route path="/daily" element={<Daily/>}/>
            <Route path="/monthly" element={<Monthly/>}/>
            <Route path="/breakedown" element={<BreakDown/>}/>
            <Route path="/admin" element={<Admins/>}/>
            <Route path="/performance" element={<Performance/>}/>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
