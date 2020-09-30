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
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
