import "bootstrap";
import "./index.scss";

'use strict';
const USER_NAME_KEY = "user";

window.onload = () => {
  const form = document.querySelector("#login-form");

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const req = new XMLHttpRequest();
    const action = document.querySelector("#login-form").action;

    req.addEventListener('load', function(){
      sessionStorage.setItem(USER_NAME_KEY, this.responseText);
    });
    req.open('GET',action);
    req.send();
  });

  // セッションデータが存在しているときはログアウトボタンに切り替える //
  const userData = JSON.parse(sessionStorage.getItem(USER_NAME_KEY));
  if(userData){
    const btnArea = document.querySelector("#loginBtnArea");
    btnArea.innerHTML = "<button class='nav-link ml-1'> <i class=\"fas fa-sign-out-alt\"></i> ログアウト</button>";
    //ログアウト動作//
    btnArea.addEventListener('click', () => {
      //セッション破棄//
      sessionStorage.removeItem(USER_NAME_KEY);
      //リロード//
      location.reload();
    });
    //user nameを表示//
    const userNameArea = document.querySelector("#userName");
    userNameArea.textContent = userData.user_name;
  } else {
    console.log("なにもしない");
  }
};