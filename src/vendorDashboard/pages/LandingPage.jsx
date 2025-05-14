import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Login from '../components/form/Login';
import Register from '../components/form/Register';
import AddFirm from '../components/form/AddFirm';
import AddProduct from '../components/form/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      setShowLogOut(true);
      setShowWelcome(true);
    }
  }, []);

  useEffect(() => {
    const firmName = localStorage.getItem('firmName');
    const firmId = localStorage.getItem('firmId');
    if (firmName || firmId) {
      setShowFirmTitle(false);
      setShowWelcome(true);
    }
  }, []);

  const resetAllViews = () => {
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
  };

  const logOutHandler = () => {
    if (confirm('Are you sure to logout?')) {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('firmId');
      localStorage.removeItem('firmName');
      setShowLogOut(false);
      setShowFirmTitle(true);
      resetAllViews();
    }
  };

  const showLoginHandler = () => {
    resetAllViews();
    setShowLogin(true);
  };

  const showRegisterHandler = () => {
    resetAllViews();
    setShowRegister(true);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      resetAllViews();
      setShowFirm(true);
    } else {
      alert('Please login');
      showLoginHandler();
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      resetAllViews();
      setShowProduct(true);
    } else {
      alert('Please login');
      showLoginHandler();
    }
  };

  const showWelcomeHandler = () => {
    resetAllViews();
    setShowWelcome(true);
  };

  const showAllProductsHandler = () => {
    if (showLogOut) {
      resetAllViews();
      setShowAllProducts(true);
    } else {
      alert('Please login');
      showLoginHandler();
    }
  };

  return (
    <>
      <section className='landingSection'>
        <NavBar
          showLoginHandler={showLoginHandler}
          showRegisterHandler={showRegisterHandler}
          showLogOut={showLogOut}
          logOutHandler={logOutHandler}
        />

        <div className='collectionSection'>
          <SideBar
            showFirmHandler={showFirmHandler}
            showProductHandler={showProductHandler}
            showAllProductsHandler={showAllProductsHandler}
            showFirmTitle={showFirmTitle}
          />

          {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
          {showRegister && <Register showLoginHandler={showLoginHandler} />}
          {showFirm && showLogOut && <AddFirm />}
          {showProduct && showLogOut && <AddProduct />}
          {showWelcome && <Welcome />}
          {showAllProducts && showLogOut && <AllProducts />}
        </div>
      </section>
    </>
  );
};

export default LandingPage;
