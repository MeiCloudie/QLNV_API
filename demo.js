function nauCom() {
  setTimeout(() => {
    console.log("Vân nấu cơm")
  }, 3000)
}

function lauNha() {
  console.log("Mei lau nhà")
}

nauCom() // ném xử lý của function nauCom vào một hàng đợi
lauNha() // xử lý tiếp theovaf không chờ hàm nấu cơm thực thi xong

// Promise
let myPromise = new Promise((resolve, reject) => {
  // trạng thái thành công khi xử lý ==> resolve
  // trạng thái thất bại ==> reject
  let sinhVienGioi = 10
  if (sinhVienGioi > 8) {
    resolve("Chúc mừng sinh viên giỏi")
  } else {
    reject("Chưa tốt nhé")
  }
})

myPromise
  .then((resolve) => {
    console.log(resolve)
  })
  .catch((err) => {
    console.log(err)
  })

// Axios
let promise = axios({
  // Method: Phương thức
  method: "GET",
  url: "https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjI5NDQwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM2NDQyMDAwfQ.dTEJFBH9VnWoG3lE6KU86OTAeY78oRLVFwIiQgbKkCM",
  },
})

promise
  .then((res) => {
    console.log(res.data.content)
    // chạy hàm render dữ liệu
  })
  .catch((err) => {
    console.log(err)
  })

// Thực hiện khai báo một instance cho axios
let http = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api/", // endpoint
  timeout: 30000, // thời gian setup, nếu quá thời gian sẽ tự động báo lỗi
  headers: {
    tokenCyberSoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAxMiIsIkhldEhhblN0cmluZyI6IjA4LzAxLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczNjI5NDQwMDAwMCIsIm5iZiI6MTcxMjk0MTIwMCwiZXhwIjoxNzM2NDQyMDAwfQ.dTEJFBH9VnWoG3lE6KU86OTAeY78oRLVFwIiQgbKkCM",
  },
})

let promise2 = http.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01") // nhận vào endpoint

promise2
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })

// Async - await
async function layDuLieuNguoiDung() {
  try {
    let result = await http.get(
      "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01"
    )
  } catch (error) {
    console.log(error)
  }
}
layDuLieuNguoiDung()

let layDuLieu = async () => {}
