# RSA Digital Signature

## 🚀 Tổng quan

Dự án này triển khai chữ ký số RSA, một kỹ thuật bảo mật sử dụng khóa công khai và khóa riêng để ký và xác thực các thông điệp.

![Sơ đồ RSA](https://github.com/sjsjsmsmsj/RSA/blob/main/image.png?raw=true)

### Xem video hướng dẫn

![Xem video RSA Digital Signature](https://img.youtube.com/vi/Du6Ooe45JDY/0.jpg)

[Nhấp vào đây để xem video trên YouTube](https://youtu.be/Du6Ooe45JDY)

## 🛠️ Tính năng

Dự án hỗ trợ các tính năng chính sau:

### 1. **Tạo khóa RSA**
   - Cho phép người dùng nhập hai số nguyên tố `p` và `q` để tạo ra khóa RSA.
   - Hoặc có thể sử dụng các khóa ngẫu nhiên đã được định sẵn (ví dụ: `p = 61` và `q = 53`).
   - Tạo khóa công khai và khóa riêng, trong đó khóa công khai bao gồm `e` và `n`, còn khóa riêng bao gồm `d` và `n`.

### 2. **Ký thông điệp (Sign Document)**
   - Người dùng có thể nhập thông điệp hoặc chọn một tệp văn bản để ký.
   - Dự án sử dụng khóa riêng để ký thông điệp, tạo ra chữ ký số (digital signature).
   - Chữ ký này có thể được sử dụng để xác thực tính toàn vẹn và nguồn gốc của thông điệp.

### 3. **Xác thực chữ ký (Verify Signature)**
   - Người dùng có thể nhập thông điệp và chữ ký số để xác thực thông điệp.
   - Dự án sử dụng khóa công khai để giải mã và kiểm tra chữ ký, xác nhận xem chữ ký có hợp lệ hay không.
   - Nếu chữ ký khớp với thông điệp, kết quả xác thực sẽ trả về "Chữ ký hợp lệ", ngược lại sẽ báo "Chữ ký không hợp lệ".

### 4. **Chức năng tải tệp (File Upload)**
   - Người dùng có thể chọn tệp văn bản (.txt) để ký và xác thực.
   - Tệp này sẽ được xử lý giống như một thông điệp đầu vào trong các thao tác ký và xác thực.

## 📜 Cách sử dụng

1. **Tạo khóa**:
   - Nhập các số nguyên tố `p` và `q` và nhấn nút **Generate Keys** để tạo khóa công khai và khóa riêng.
   - Hoặc chọn **Generate Random Keys** để tạo các khóa ngẫu nhiên.

2. **Ký thông điệp**:
   - Nhập thông điệp vào ô **Enter message to sign** hoặc chọn một tệp văn bản.
   - Nhấn nút **Sign Message** để ký thông điệp bằng khóa riêng.
   - Chữ ký sẽ được hiển thị trong ô **Signature result**.

3. **Xác thực chữ ký**:
   - Nhập thông điệp và chữ ký cần xác thực.
   - Nhấn nút **Verify Signature** để kiểm tra tính hợp lệ của chữ ký với khóa công khai.

## 🔐 Công nghệ sử dụng

- **RSA Algorithm**: Để tạo và xác thực chữ ký số.
- **Web Crypto API**: Để băm thông điệp bằng thuật toán SHA-256.
- **JavaScript**: Để xử lý các hoạt động ký và xác thực trực tiếp trên trình duyệt.

## 🎯 Mục tiêu

Dự án này giúp bạn hiểu và áp dụng thuật toán RSA trong việc bảo mật thông điệp qua chữ ký số. Đây là một ví dụ về ứng dụng thực tiễn của mật mã học trong việc đảm bảo tính toàn vẹn và tính xác thực của dữ liệu trên môi trường mạng.

---

**Tham gia dự án**:  
Chúng tôi khuyến khích bạn đóng góp vào dự án này. Nếu bạn có ý tưởng, đề xuất hoặc cải tiến, vui lòng tạo một pull request hoặc issue trên GitHub.

