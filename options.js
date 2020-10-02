function save_options() {
    var popup_enable = document.getElementById("popup_enable").checked;

    chrome.storage.sync.set({ popup_enable: popup_enable }, function () {
        var status = document.getElementById("status");
        status.textContent = "Options saved.";
        setTimeout(function () {
            status.textContent = "";
        }, 750);
    });
}
function restore_options() {
    chrome.storage.sync.get({ popup_enable: false }, function (items) {
        document.getElementById("popup_enable").checked = items.popup_enable;
    });
    render_user_info();
}

const render_user_info = () => {
    let username_info = window.localStorage.getItem("__rec_username");
    if(username_info === null || username_info === undefined){
        document.getElementById("userfield_header").innerText = "Đăng Nhập"
        document.getElementById("user_login").hidden = false;
        document.getElementById("user_info").hidden = true;
    }
    else{
        document.getElementById("userfield_header").innerText = "Thông Tin User"
        document.getElementById("disp_username").innerText = username_info;
        document.getElementById("user_login").hidden = true;
        document.getElementById("user_info").hidden = false;
    }
}

const setStatus = text => {
    let status_comp = document.getElementById("status");
    status_comp.innerText = text;
    status_comp.hidden = false;
}

const user_login = () => {
    let username = document.getElementById("username").value ;
    let password = document.getElementById("password").value ;
    window.localStorage.setItem("__rec_username", username);
    render_user_info();
    
}

const user_logout = () => {
    window.localStorage.removeItem("__rec_username", username);
    render_user_info();
}

document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
document.getElementById("login").addEventListener("click", user_login);
document.getElementById("logout").addEventListener("click", user_logout);
