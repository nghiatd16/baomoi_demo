/************
 * Recommendation Web SDK
 ************/
recommend_url = 'https://recommend-29.logger.vsmarty.vn/rec/l2r';
alway_show = false;
chrome.storage.sync.get({ popup_enable: false }, function (items) {
    alway_show = items.popup_enable;
});
var store = function store(key, value, storageOnly) {
    storageOnly = storageOnly || false;
    var lsSupport = false,
        data;

    // Check for native support
    lsSupport = true;
    try {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem("testLocal", true);
        }
    } catch (e) {
        lsSupport = false;
    }

    // If value is detected, set new or modify store
    if (typeof value !== "undefined" && value !== null) {
        // Convert object values to JSON
        if (typeof value === "object") {
            value = JSON.stringify(value);
        }
        // Set the store
        if (lsSupport) { // Native support
            localStorage.setItem(key, value);
        } else if (!storageOnly) { // Use Cookie
            createCookie(key, value, 30);
        }
    }

    // No value supplied, return value
    if (typeof value === "undefined") {
        // Get value
        if (lsSupport) { // Native support
            data = localStorage.getItem(key);
        } else if (!storageOnly) { // Use cookie
            data = readCookie(key);
        }

        // Try to parse JSON...
        try {
            data = JSON.parse(data);
        } catch (e) {
            //it means data is not json,
            //dont do anything
        }

        return data;

    }

    // Null specified, remove store
    if (value === null) {
        if (lsSupport) { // Native support
            localStorage.removeItem(key);
        } else if (!storageOnly) { // Use cookie
            createCookie(key, "", -1);
        }
    }

    /**
     * Creates new cookie or removes cookie with negative expiration
     * @param  key       The key or identifier for the store
     * @param  value     Contents of the store
     * @param  exp       Expiration - creation defaults to 30 days
     */

    function createCookie(key, value, exp) {
        var date = new Date();
        date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
        document.cookie = key + "=" + value + expires + "; path=/";
    }

    /**
     * Returns contents of cookie
     * @param  key       The key or identifier for the store
     */

    function readCookie(key) {
        var nameEQ = key + "=";
        var ca = document.cookie.split(";");
        for (var i = 0, max = ca.length; i < max; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }
};

//sending xml HTTP request
function sendXmlHttpRequestJSON(url, params, method, callback) {
    try {
        var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : window.ActiveXObject ? new window.ActiveXObject("Microsoft.XMLHTTP") : null;
        params = params || {};
        if (method === "GET") {
            var data = prepareParams(params);
            xhr.open('GET', url + "?" + data, true);
        } else {
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
        // fallback on error
        xhr.onreadystatechange = function () {
            if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
                if (typeof callback === 'function') {
                    callback(false, params, this.responseText);
                }
            } else if (this.readyState === 4) {
                console.log("Failed Server XML HTTP request", this.status);
                if (typeof callback === "function") {
                    callback(true, params);
                }
            }
        };
        if (method === "GET") {
            xhr.send();
        } else {
            xhr.send(params);
        }
    } catch (e) {
        // fallback
        console.log("Failed XML HTTP request", e);
        if (typeof callback === "function") {
            callback(true, params);
        }
    }
}

function addStyle(styles) {

    /* Create style document */
    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet)
        css.styleSheet.cssText = styles;
    else
        css.appendChild(document.createTextNode(styles));

    /* Append style to the tag name */
    document.getElementsByTagName("head")[0].appendChild(css);
}

/* Set the style */
var styles = '\n' +
    '/* The Modal (background) */\n' +
    '.modal2 {\n' +
    '    display: none;\n' +
    '    width:30%;\n' +
    '    position:fixed;\n' +
    '    bottom:0;\n' +
    '    right:0;\n' +
    '    margin:0;\n' +
    '}\n' +
    '/* Modal Content */\n' +
    '.modal-content {\n' +
    '  position: relative;\n' +
    '  background-color: #fefefe;\n' +
    '  margin: auto;\n' +
    '  padding: 0;\n' +
    '  border: 1px solid #888;\n' +
    '  width: 80%;\n' +
    '  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);\n' +
    '  -webkit-animation-name: animatetop;\n' +
    '  -webkit-animation-duration: 0.4s;\n' +
    '  animation-name: animatetop;\n' +
    '  animation-duration: 0.4s\n' +
    '}\n' +
    '\n' +
    '/* Add Animation */\n' +
    '@-webkit-keyframes animatetop {\n' +
    '  from {top:-300px; opacity:0} \n' +
    '  to {top:0; opacity:1}\n' +
    '}\n' +
    '\n' +
    '@keyframes animatetop {\n' +
    '  from {top:-300px; opacity:0}\n' +
    '  to {top:0; opacity:1}\n' +
    '}\n' +
    '\n' +
    '/* The Close Button */\n' +
    '.close {\n' +
    '  color: white;\n' +
    '  float: right;\n' +
    '  font-size: 28px;\n' +
    '  font-weight: bold;\n' +
    '}\n' +
    '\n' +
    '.close:hover,\n' +
    '.close:focus {\n' +
    '  color: #000;\n' +
    '  text-decoration: none;\n' +
    '  cursor: pointer;\n' +
    '}\n' +
    '\n' +
    '.modal-header {\n' +
    '  padding: 10px 16px;\n' +
    '  background-color: #4792d3;\n' +
    '  color: white;\n' +
    '}\n' +
    '\n' +
    '.modal-body {padding: 10px 5px;}\n' +
    '\n' +
    '.modal-footer {\n' +
    '  padding: 10px 16px;\n' +
    '  background-color: #5cb85c;\n' +
    '  color: white;\n' +
    '}';

window.addEventListener ("load", recommendationBind, false);
function recommendationBind (evt) {
    var jsInitChecktimer = setInterval (checkForJS_recommendation, 111);
    function checkForJS_recommendation () {
        var btn = document.getElementById("BaoMoi_Canvas");
        // console.log(btn);
        if (btn) {
            console.log("Rendering Popup")
            clearInterval (jsInitChecktimer);
            $("body").append(
                '<!-- The Modal -->\n' +
                '<div id="myModal" class="modal2" >\n' +
                '\n' +
                '  <div class="modal-content">\n' +
                '    <div class="modal-header">\n' +
                '      <span class="close">&times;</span>\n' +
                '      <span>Có thể bạn quan tâm</span>\n' +
                '    </div>\n' +
                '    <div class="modal-body">\n' +
                '        <div style="height: 300px; overflow-y: auto;">\n' +
                '                     <ul class="UL_Notification_bc" id="baomoi_recommendation">' +
                '                     </ul>\n' +
                '         </div>\n' +
                '    </div>\n' +
                '\n' +
                '</div>');

            var modal = document.getElementById("myModal");
            var span = document.getElementsByClassName("close")[0];
            var count_click = 0;
            btn.onclick = function () {
                count_click++;
                if (count_click % 3 == 0) {
                    modal.style.display = "block";
                }
            };

            span.onclick = function () {
                modal.style.display = "none";
                count_click = 0;
            };

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            };
            addStyle(styles);
            view_history = store("cly_view_history") || [];
            url = [];
            title = [];
            for (i = 0; i < view_history.length; i++) {
                segments = view_history[i];
                url.push(segments.name);
                title.push(segments.title);
            }
            request = JSON.stringify({
                "dataset": "QN_Portal",
                "uid": store('cly_id'),
                "url": url.reverse(),
                "title": title.reverse()
            });

            // sendXmlHttpRequestJSON(recommend_url, request, "POST", function (err, params, responseText) {
            //     try {
            //         var response = JSON.parse(responseText);
            //         if (response.isSuccess) {
            //             rec = response.rec;
            //             html_row = '';
            //             for (item in rec) {
            //                 var post_date = new Date(rec[item].timestamp * 1000);

            //                 var dd = String(post_date.getDate()).padStart(2, '0');
            //                 var mm = String(post_date.getMonth() + 1).padStart(2, '0'); //January is 0!
            //                 var yyyy = post_date.getFullYear();

            //                 post_date = dd + '/' + mm + '/' + yyyy;
            //                 html_row += '<li><a href="' + rec[item].url + '"><font color="red">' + rec[item].method + '</font> ' + rec[item].title + ' <font>&nbsp;&nbsp;(' + post_date + ')</font></a>\n<span class="Border_Line"></span></li>\n';
            //             }
            //             $('#baomoi_recommendation').html(html_row);
            //             if (alway_show) {
            //                 modal.style.display = "block";
            //             }
            //         }
            //     } catch (ex) {
            //         //silent catch
            //     }
            // });
        // }
        render_recommendation(test_data);
    }
}
const test_data = {"isSuccess":true,"rec":[{"id":"18368","method":"MP SS","timestamp":"1600157100","title":"Sắp diễn ra Diễn đàn Công nghệ và Năng lượng Việt Nam 2020","url":"/vn/tin-tuc/18368/sap-dien-ra-dien-dan-cong-nghe-va-nang-luong-viet-nam-2020.aspx"},{"id":"18382","method":"SS","timestamp":"1600416660","title":"Thông tin về kết quả thực hiện đề tài KH&amp;CN cấp quốc gia: Nghiên cứu, thiết kế và chế tạo hệ thống Camera có tính bảo mật cao","url":"/vn/tin-tuc/18382/thong-tin-ve-ket-qua-thuc-hien-de-tai-khcn-cap-quoc-gia--nghien-cuu--thiet-ke-va-che-tao-he-thong-camera-co-tinh-bao-mat-cao.aspx"},{"id":"17428","method":"CB","timestamp":"1580981580","title":"Thông báo Chương trình tài trợ nghiên cứu cơ bản trong Khoa học xã hội và nhân văn năm 2020 đợt II do NAFOSTED tài trợ","url":"/vn/tin-tuc/17428/thong-bao-chuong-trinh-tai-tro-nghien-cuu-co-ban-trong-khoa-hoc-xa-hoi-va-nhan-van-nam-2020-dot-ii-do-nafosted-tai-tro.aspx"},{"id":"18361","method":"MP SS","timestamp":"1600074780","title":"Bài toán xét nghiệm Covid-19 trong bối cảnh mới","url":"/vn/tin-tuc/18361/bai-toan-xet-nghiem-covid-19-trong-boi-canh-moi.aspx"},{"id":"18366","method":"MP SS","timestamp":"1600141500","title":"Thông báo Chương trình học bổng tại Vương quốc Anh","url":"/vn/tin-tuc/18366/thong-bao-chuong-trinh-hoc-bong-tai-vuong-quoc-anh.aspx"},{"id":"17435","method":"CB","timestamp":"1581091200","title":"Bộ Khoa học và Công nghệ phê duyệt các đề tài nghiên cứu về chủng mới của virus Corona","url":"/vn/tin-tuc/17435/bo-khoa-hoc-va-cong-nghe-phe-duyet-cac-de-tai-nghien-cuu-ve-chung-moi-cua-virus-corona.aspx"},{"id":"18357","method":"MP HT","timestamp":"1599815580","title":"Thông báo về việc tuyển chọn tổ chức chủ trì thực hiện nhiệm vụ Quỹ gen cấp quốc gia (Theo Quyết định số 2486/QĐ-BKHCN ngày 09/9/2020)","url":"/vn/tin-tuc/18357/thong-bao-ve-viec-tuyen-chon-to-chuc-chu-tri-thuc-hien-nhiem-vu-quy-gen-cap-quoc-gia-theo-quyet-dinh-so-2486-qd-bkhcn-ngay-09-9-2020.aspx"},{"id":"18387","method":"MP SS","timestamp":"1600438980","title":"Bộ Chính trị phân công Bí thư Ban Cán sự Đảng Bộ Khoa học và Công nghệ Chu Ngọc Anh giữ chức Phó Bí thư Thành ủy Hà Nội","url":"/vn/tin-tuc/18387/bo-chinh-tri-phan-cong-bi-thu-ban-can-su-dang-bo-khoa-hoc-va-cong-nghe-chu-ngoc-anh-giu-chuc-pho-bi-thu-thanh-uy-ha-noi.aspx"},{"id":"18300","method":"MP SS","timestamp":"1598673060","title":"Đại hội đại biểu Đảng bộ Bộ Khoa học và Công nghệ nhiệm kỳ 2020-2025","url":"/vn/tin-tuc/18300/dai-hoi-dai-bieu-dang-bo-bo-khoa-hoc-va-cong-nghe-nhiem-ky-2020-2025.aspx"},{"id":"17415","method":"CB","timestamp":"1580822400","title":"Cung cấp các công bố mới nhất về dịch viêm đường hô hấp cấp do chủng mới của virus Corona phục vụ cộng đồng nghiên cứu khoa học","url":"/vn/tin-tuc/17415/cung-cap-cac-cong-bo-moi-nhat-ve-dich-viem-duong-ho-hap-cap-do-chung-moi-cua-virus-corona-phuc-vu-cong-dong-nghien-cuu-khoa-hoc.aspx"},{"id":"17433","method":"CB","timestamp":"1580986020","title":"Thông báo tuyển chọn tổ chức và cá nhân chủ trì thực hiện nhiệm vụ khoa học và công nghệ theo Nghị định thư thực hiện trong kế hoạch năm 2020 (theo Quyết định số 171/QĐ-BKHCN, 172/QĐ-BKHCN, 173/QĐ-BKHCN 174/QĐ-BKHCN ngày 04/02/2020)","url":"/vn/tin-tuc/17433/thong-bao-tuyen-chon-to-chuc-va-ca-nhan-chu-tri-thuc-hien-nhiem-vu-khoa-hoc-va-cong-nghe-theo-nghi-dinh-thu-thuc-hien-trong-ke-hoa.aspx"},{"id":"18236","method":"MP SS","timestamp":"1597809720","title":"Quyết định số 2176/QĐ-BKHCN ngày 07/8/2020 của Bộ trưởng Bộ Khoa học và Công nghệ về việc công bố thủ tục hành chính được sửa đổi, bổ sung, thủ tục hành chính bị bãi bỏ trong lĩnh vực tiêu chuẩn đo lường chất lượng thuộc phạm vi chức năng quản lý của...","url":"/vn/tin-tuc/18236/quyet-dinh-so-2176-qd-bkhcn-ngay-07-8-2020-cua-bo-truong-bo-khoa-hoc-va-cong-nghe-ve-viec-cong-bo-thu-tuc-hanh-chinh-duoc-sua-doi-.aspx"},{"id":"18188","method":"SS","timestamp":"1596769200","title":"Thông báo về việc tuyển chọn tổ chức chủ trì thực hiện nhiệm vụ hằng năm, định kỳ thuộc Đề án “Hỗ trợ hệ sinh thái khởi nghiệp đổi mới sáng tạo quốc gia đến năm 2025” bắt đầu thực hiện từ năm 2021","url":"/vn/tin-tuc/18188/thong-bao-ve-viec-tuyen-chon-to-chuc-chu-tri-thuc-hien-nhiem-vu-hang-nam--dinh-ky-thuoc-de-an-ho-tro-he-sinh-thai-khoi-nghiep-doi-.aspx"},{"id":"18356","method":"SS","timestamp":"1599815220","title":"Quyết định số 2260/QĐ-BKHCN ngày 20/8/2020 của Bộ trưởng Bộ KH&amp;CN Phê duyệt Danh mục dịch vụ công trực tuyến mức độ 3, mức độ 4 và Danh mục dịch vụ công trực tuyến tích hợp, cung cấp trên Cổng Dịch vụ công Quốc gia trong năm 2020 của Bộ Khoa học và...","url":"/vn/tin-tuc/18356/quyet-dinh-so-2260-qd-bkhcn-ngay-20-8-2020-cua-bo-truong-bo-khcn-phe-duyet-danh-muc-dich-vu-cong-truc-tuyen-muc-do-3--muc-do-4-va-.aspx"},{"id":"17432","method":"CB","timestamp":"1580982240","title":"Thông tin về kết quả thực hiện nhiệm vụ cấp quốc gia “Nghiên cứu bào chế viên nang chứa hoạt chất Huperzine A được tách chiết từ một số chủng nấm phân lập từ cây Thạch tùng răng cưa (Huperzia serrata)”, mã số KC.10.01/16-20","url":"/vn/tin-tuc/17432/thong-tin-ve-ket-qua-thuc-hien-nhiem-vu-cap-quoc-gia-nghien-cuu-bao-che-vien-nang-chua-hoat-chat-huperzine-a-duoc-tach-chiet-tu-mo.aspx"},{"id":"18397","method":"HT","timestamp":"1600836420","title":"Ngành y tế đặt trọng tâm vào công nghệ hiện đại","url":"/vn/tin-tuc/18397/nganh-y-te-dat-trong-tam-vao-cong-nghe-hien-dai.aspx"},{"id":"17274","method":"CB","timestamp":"1576643520","title":"Thông báo về việc tuyển chọn tổ chức chủ trì và cá nhân chủ nhiệm thực hiện nhiệm vụ KH&amp;CN thuộc Chương trình trọng điểm cấp quốc gia “Hỗ trợ nghiên cứu, phát triển và ứng dụng công nghệ của công nghiệp 4.0”, mã số KC-4.0/19-25 (02 nhiệm vụ)","url":"/vn/tin-tuc/17274/thong-bao-ve-viec-tuyen-chon-to-chuc-chu-tri-va-ca-nhan-chu-nhiem-thuc-hien-nhiem-vu-khcn-thuoc-chuong-trinh-trong-diem-cap-quoc-g.aspx"},{"id":"18358","method":"MP","timestamp":"1599815880","title":"Cam kết tăng đầu tư thích đáng cho KH&amp;CN","url":"/vn/tin-tuc/18358/cam-ket-tang-dau-tu-thich-dang-cho-khcn.aspx"},{"id":"18360","method":"SS","timestamp":"1600073640","title":"Báo cáo kết quả đánh giá nhiệm vụ KH&amp;CN cấp quốc gia: Nghiên cứu ứng dụng Công nghệ bức xạ trong sản xuất phân bón vi sinh vật dạng hạt và phân bón lá","url":"/vn/tin-tuc/18360/bao-cao-ket-qua-danh-gia-nhiem-vu-khcn-cap-quoc-gia--nghien-cuu-ung-dung-cong-nghe-buc-xa-trong-san-xuat-phan-bon-vi-sinh-vat-dang-hat-va-phan-bon-la.aspx"},{"id":"18386","method":"MP SS","timestamp":"1600431120","title":"Bộ trưởng Chu Ngọc Anh làm Phó bí thư Thành ủy Hà Nội","url":"/vn/tin-tuc/18386/bo-truong-chu-ngoc-anh-lam-pho-bi-thu-thanh-uy-ha-noi.aspx"}]}
const render_recommendation = response => {
        if (response.isSuccess) {
            rec = response.rec;
            html_row = '';
            for (item in rec) {
                var post_date = new Date(rec[item].timestamp * 1000);

                var dd = String(post_date.getDate()).padStart(2, '0');
                var mm = String(post_date.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = post_date.getFullYear();

                post_date = dd + '/' + mm + '/' + yyyy;
                html_row += '<li><a href="' + rec[item].url + '"><font color="red">' + rec[item].method + '</font> ' + rec[item].title + ' <font>&nbsp;&nbsp;(' + post_date + ')</font></a>\n<span class="Border_Line"></span></li>\n';
            }
            $('#baomoi_recommendation').html(html_row);
            
            if (alway_show) {
                var modal = document.getElementById("myModal");
                modal.style.display = "block";
            }
        }
    }
}