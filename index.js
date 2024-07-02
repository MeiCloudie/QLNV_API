// B1: Thực hiện truy xuất dữ liệu từ backend thông qua api
// B2: Tạo một hàm giúp hiển thị dữ liệu được lấy từ Backend
// thực hiện khai báo một instance cho axios
let http = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/", // endpoint
  timeout: 30000, // thời gian setup, nếu quá thời gian sẽ tự động báo lỗi
  headers: {
    tokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjMxLzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODI4MTYwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NDI5MjAwfQ.bsAaudu2iAsJe1QzbsWWy0HG7ofC_8rFKL-MG_jW1ig",
    authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWJjZGZnaCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imh1aXFAZ21haWwuY29tIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjpbIlF1YW5UcmkiLCJodWlxQGdtYWlsLmNvbSIsIkdQMDEiXSwibmJmIjoxNzE5ODk1OTE3LCJleHAiOjE3MTk4OTk1MTd9.k3TXWRXjQS82W5DC6utckuExQapc6UnFqSPcWmVBNGQ",
  },
})

async function layDuLieuNguoiDung() {
  let result = await http.get(
    "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00"
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
        <button onclick="deleteUser('${taiKhoan}')" class='btn btn-danger'>Xoá</button>
        <button onclick="getValueUser('${taiKhoan}')" class='btn btn-warning'>Sửa</button>
      </td>
    </tr>
    `
  }
  document.getElementById("nguoiDung_tbody").innerHTML = content
}

// Thực hiện tạo hàm lấy dữ liệu từ form
function getValueForm() {
  let arrField = document.querySelectorAll("#QLND_form input")
  console.log(arrField)
  let nguoiDung = {}
  for (let field of arrField) {
    // field là một DOM tới mỗi input
    let { id, value } = field
    nguoiDung[id] = value
  }
  return nguoiDung
}

getValueForm()

// Thực hiện xử lí gọi API đăng ký từ bên phía backend
function submitValue(event) {
  event.preventDefault()
  // B1 thực hiện truy xuất lấy dữ liệu từ form
  let nguoiDung = getValueForm()
  // B2 thực hiện sử dụng thư viện axios để gửi dữ liệu cho backend đăng ký một ng dùng mới
  http
    .post("QuanLyNguoiDung/DangKy", { ...nguoiDung, maNhom: "GP01" })
    .then((res) => {
      console.log(res)
      document.getElementById("QLND_form").reset()
    })
    .catch((err) => {
      console.log(err)
      alert("Có lỗi xảy ra, vui lòng thử lại")
    })
}

document.getElementById("QLND_form").onsubmit = submitValue

// xoá người dùng
function deleteUser(taiKhoan) {
  http
    .delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}
let maLoaiNguoiDung = ""

// Lấy thông tin người dùng
function getValueUser(taiKhoan) {
  // Thực hiện gọi API lấy dữ liệu từ bên phía backend dựa vào taiKhoan
  http
    .post(`QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
    .then((res) => {
      console.log(res)
      let arrField = document.querySelectorAll("#QLND_form input")
      let nguoiDung = res.data.content
      for (let field of arrField) {
        let id = field.id
        field.value = nguoiDung[id]
      }
      maLoaiNguoiDung = res.data.content.maLoaiNguoiDung
    })
    .catch((err) => {
      console.log(err)
    })
}

// Cập nhật thông tin người dùng
function updateValueUser() {
  let nguoiDung = getValueForm()
  let newNguoiDung = { ...nguoiDung, maNhom: "GP01", maLoaiNguoiDung }
  http
    .post("QuanLyNguoiDung/CapNhatThongTinNguoiDung", newNguoiDung)
    .then((res) => {
      console.log(res)
      layDuLieuNguoiDung()
    })
    .catch((err) => {
      console.log(err)
    })
}

document.querySelector(".btn-primary").onclick = updateValueUser
