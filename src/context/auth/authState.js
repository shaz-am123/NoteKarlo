import React from 'react'
import AuthContext from "./authContext";

const AuthState = (props) => {

  const eligible_age_check = (dob)=> {
    var birth_date = new Date(dob);
    var birth_date_day = birth_date.getDate();
    var birth_date_month = birth_date.getMonth()
    var birth_date_year = birth_date.getFullYear();

    var today_date = new Date();
    var today_day = today_date.getDate();
    var today_month = today_date.getMonth();
    var today_year = today_date.getFullYear();

    var age = 0;
    if (today_month > birth_date_month)
      age = today_year - birth_date_year;
    else if (today_month === birth_date_month) {
      if (today_day >= birth_date_day)
        age = today_year - birth_date_year;
      else
        age = today_year - birth_date_year - 1;
    }
    else
      age = today_year - birth_date_year - 1;

    return age >= 3;
  }

  return (
    <AuthContext.Provider value={{eligible_age_check}}>
        {props.children}
    </AuthContext.Provider>)
}

export default AuthState;
