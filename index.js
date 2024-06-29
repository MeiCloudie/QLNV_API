// B1: Thực hiện truy xuất dữ liệu từ backend thông qua api
// B2: Tạo một hàm giúp hiển thị dữ liệu được lấy từ Backend

// Thực hiện khai báo một instance cho axios
let http = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/", // endpoint
  timeout: 30000, // thời gian setup, nếu quá thời gian sẽ tự động báo lỗi
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjI5NDQwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM2NDQyMDAwfQ.dTEJFBH9VnWoG3lE6KU86OTAeY78oRLVFwIiQgbKkCM",
  },
})

async function layDuLieuNguoiDung() {
  let result = await http.get(
    "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
  )
  console.log(result.data.content)
  renderArrNguoiDung(result.data.content)
}

layDuLieuNguoiDung()

function renderArrNguoiDung(arr) {
  let content = ""
  for (let nguoiDung of arr) {
    let { taiKhoan, email, hoTen, soDT, maLoaiNguoiDung } = nguoiDung
    content += `
      <tr class="">
        <td scope="row">${taiKhoan}</td>
        <td>${hoTen}</td>
        <td>${email}</td>
        <td>${soDT}</td>
        <td>${
          maLoaiNguoiDung == "QuanTri"
            ? "<span class='badge text-bg-danger'>Quản Trị</span>"
            : "<span class='badge text-bg-success'>Khách hàng</span>"
        }</td>
        <td>
            <button class='btn btn-danger'>Xoá</button>
            <button class='btn btn-warning'>Sửa</button>
      </td>
      </tr>
      `
  }
  document.getElementById("nguoiDung_tbody").innerHTML = content
}
