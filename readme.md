# Hướng dẫn khởi chạy dự án

 ```
 1. Mở terminal
 2. npm i
 3. npm start
 4. click vào đường dẫn http://localhost:1812
 ```

# Cấu trúc thư mục của dự án
 -  **config:** Nơi chứa các file config
 - **controller:** Nơi điều khiển luồng hoạt động của ứng dụng và liên kết giữa Model và View.
 - **models:** Đại diện cho dữ liệu và quản lý tất cả các thao tác liên quan đến dữ liệu. Model cung cấp các phương thức để thêm, xóa, sửa đổi và truy vấn dữ liệu 
 - **routes:** Nơi chứa các handler function cho các phương thức HTTP (GET, POST, PUT, DELETE) của endpoint API
 - **swagger** Nơi chứa file swagger
 - **.env:** Chứa các thông tin cấu hình của ứng dụng: port, dbconnect, secret,...
 - **index.js** file cấu hình chính của server


# Cài đặt expressjs
 ### B1: cài môi trường nodejs
 ```
  npm init
 ``` 
 - **package name** là tên của pakage mình sử dụng (enter để lấy mặc định)
 - **version** là version của phiên bản hiện tại
 - **description** mô tả của dự án
 - **entry point** Khi ứng dụng chạy sẽ lấy file này làm file mặc định khởi chạy (mặc định là index.js). Mình có thể thay đổi tùy ý
 - **test command** Dùng để chạy các test để đảm bảo ứng dụng có hoạt động đúng với mong muốn hay không (Có thể bỏ qua)
 - **git reponsitory** Là reponsitory của git hub, copy đoạn remote quăng vào là được
 - **keywords** (Có thể bỏ qua)
 - **author** Tác giả của mã nguồn (Có thể bỏ qua)

 # Thư viện nodemon
 Dùng để lắng nghe sự thay đổi của các file nodejs. Nó sẽ tự render lại giao diện (Nếu không cài thì thay đổi gì cũng phải tắt server và chạy lại)

 ```
 npm i nodemon
 ```

 ### Cài đặt script
 
 ```
   "scripts": {
      "start": "nodemon --inspect ./index.js",
    }
 ```
  --inspect dùng để cài node debug trong devtool, khi cài dòng lệnh trên thì chỉ cần gõ ***npm start*** là ứng dụng sẽ chạy

  # morgan
  - Dùng để xem các request của client gửi lên server (Debug ứng dụng)
  ```
   npm i morgan
  ```
  # express-handlebars
  Dùng để viết code HTML bằng node dễ dàng hơn
  ```
    npm i express-handlebars
  ```
  # cài các thư viện cần thiết

  ```
     npm install express mongoose body-parser cors swagger-jsdoc swagger-ui-express dotenv jsonwebtoken bcryptjs

  ```
  # Cài thư viện mở trình duyệt tự động

  ```
    npm i open
  ```

  # Thư viện mã hóa mật khẩu

  ```
    npm install bcryptjs
  ```

  # Thư viện cookie

  ```
    npm i cookie
  ```