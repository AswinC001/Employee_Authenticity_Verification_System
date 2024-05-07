// App.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Signup from "./components/login/signup";
import "./components/login/login.css";

import UserLogin from "./components/login/user-login";
import Company_signup from "./components/login/company_signup"
import Institution_signup from "./components/login/institution_signup"
import InstitutionLogin from "./components/login/institution-login";
import CompanyLogin from "./components/login/company-login";

import CompanyDash from "./components/login/companydash";
import InstiDash from "./components/login/instidash";
import UserDash from "./components/login/userdash";

import CompanyVerify from "./components/login/companyverify";
import CompanySetTenure from "./components/login/companysettenure";
import CompanyViewTenure from "./components/login/companyviewtenure";
import CompanyRemoveTenure from "./components/login/companyremovetenure";

import UserViewDoc from "./components/login/userviewdoc";
import UserViewTenure from "./components/login/userviewtenure";

import Signup1 from "./components/login/signup1";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup1" element={<Signup1 />} />
        <Route path="/company_signup" element={<Company_signup />} />
        <Route path="/institution_signup" element={<Institution_signup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/company-login" element={<CompanyLogin />} />
        <Route path="/institution-login" element={<InstitutionLogin />} />
        <Route path="/companydash/:userEmail" element={<CompanyDash />} />
        <Route path="/companydash/:userEmail/verify" element={<CompanyVerify />} />
        <Route path="/companydash/:userEmail/settenure" element={<CompanySetTenure />} />
        <Route path="/companydash/:userEmail/viewtenure" element={<CompanyViewTenure />} />
        <Route path="/companydash/:userEmail/removetenure" element={<CompanyRemoveTenure />} />
        <Route path="/userdash/:userEmail/:userId/userviewtenure" element={<UserViewTenure />} />
        <Route path="/userdash/:userEmail/:userId/userviewdoc" element={<UserViewDoc />} />
        <Route path="/userdash/:userEmail/:userId" element={<UserDash />} />
        <Route path="/instidash" element={<InstiDash />} />
      </Routes>
    </div>
  );
};

export default App;
