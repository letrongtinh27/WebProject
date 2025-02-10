Video demo:
https://github.com/user-attachments/assets/44d87208-5866-4a3d-b52f-661e4db5ecbb

Document:
[20130440-LeTrongTinh.docx](https://github.com/user-attachments/files/18730990/20130440-LeTrongTinh.docx)
Dưới đây là danh sách các kỹ thuật chính sử dụng trong dự án:

●	Giao diện khách hàng:
○	Styled Components: Thư viện CSS-in-JS được sử dụng để viết CSS trong các component React.
○	React Modal: Thư viện React Modal được sử dụng để tạo các hộp thoại modal trong ứng dụng.
○	React Toastify: Thư viện React Toastify được sử dụng để hiển thị thông báo (toast) trong ứng dụng.
○	React Data Table Component: Thư viện React Data Table Component được sử dụng để hiển thị dữ liệu trong bảng và cung cấp các tính năng như sắp xếp, tìm kiếm và phân trang.
		Web: https://cinema-945d3.web.app/ 
●	Giao diện quản lý:
○	Material-UI: Thư viện Material-UI để xây dựng các thành phần giao diện người dùng, hệ thống theme của MUI để tùy chỉnh giao diện.
○	React-Admin: Sử dụng React-Admin để khởi tạo và phát triển dự án, cấu hình dữ liệu với Data Providers,Tạo các trang CRUD (Create, Read, Update, Delete) cho các tài nguyên.
●	RESTful API:
○	Spring Security: Framework bảo mật được sử dụng để quản lý xác thực và phân quyền người dùng.
○	Spring Data JPA: Thư viện Hibernate được sử dụng để tương tác với cơ sở dữ liệu MySQL.
○	JWT (JSON Web Tokens): Sử dụng để xác thực và quản lý phiên làm việc người dùng.
○	Thymeleaf: Template engine được sử dụng để tạo các trang web động.
○	Lombok: Thư viện giảm bớt mã boilerplate và tăng cường tính dễ đọc của mã nguồn.
○	Apache HttpClient: Thư viện HTTP client được sử dụng để tạo và gửi yêu cầu HTTP từ phía server.
○	Spring Boot Starter Mail: Thư viện hỗ trợ gửi email trong ứng dụng Spring Boot.
○	Thanh toán bằng VNPay:
 
Thẻ test:
Ngân hàng	NCB
Số thẻ	9704198526191432198
Tên chủ thẻ	NGUYEN VAN A
Ngày phát hành	07/15
Mật khẩu OTP	123456

○	Login:

Endpoint	/api/auth/login
Phương thức	POST
Tham số	{
 "username": "Tên tài khoản người dùng",
 "password": "Mật khẩu"
}
Mô tả	Xác thực người dùng và tạo phiên làm việc. Trả về một đối tượng AuthenticationResponse chứa thông tin về người dùng đã đăng nhập nếu thành công.
Đầu ra	{
"code": "<Mã trạng thái HTTP>",
"message": "<Thông điệp trạng thái>",
"token": "<Mã thông báo truy cập>",
"tokenExpirationTime": "<Thời gian hết hạn của mã thông báo (tính bằng giây)>"
}


○	Admin Login:

Endpoint	/api/auth/login_admin
Phương thức	POST
Tham số	{
 "username": "Tên tài khoản quản lý",
 "password": "Mật khẩu"
}
Mô tả	Xác thực người dùng và tạo phiên làm việc. Trả về một đối tượng AuthenticationResponse chứa thông tin về người dùng đã đăng nhập nếu thành công.
Đầu ra	{
"code": "<Mã trạng thái HTTP>",
"message": "<Thông điệp trạng thái>",
"token": "<Mã thông báo truy cập>",
"tokenExpirationTime": "<Thời gian hết hạn của mã thông báo (tính bằng giây)>"
}

○	Register:

Endpoint	/api/auth/register
Phương thức	POST
Tham số	{
  "email": "Địa chỉ email",
  "username": "Tên người dùng",
  "password": "Mật khẩu"
}
Mô tả	Sử dụng để đăng ký người dùng mới trong hệ thống. Trả về một đối tượng AuthenticationResponse chứa thông tin về người dùng đã đăng ký nếu thành công, hoặc trả về một phản hồi lỗi nếu không thành công.
Đầu ra	{
"code": "<Mã trạng thái HTTP>",
"message": "<Thông điệp trạng thái>",
"token": "<Mã thông báo truy cập>",
"tokenExpirationTime": "<Thời gian hết hạn của mã thông báo (tính bằng giây)>"
}

●	Movie APIs:
○	Get All Movies:

Endpoint	 /api/movies/all
Phương thức	GET
Tham số	
Mô tả	Sử dụng để lấy danh sách tất cả các bộ phim. Trả về một danh sách các đối tượng Movie nếu thành công, hoặc trả về một phản hồi lỗi nếu không thành công.
Đầu ra	[
    {
        "id": 1,
        "background_img_url": <Link hình ảnh background>,
        "title_img_url": <Link hình ảnh title>,
        "title": <Tên phim>,
        "released_date": <Ngày phát hành>,
        "trailer_video_url": <Link video trailer>,
        "poster_url":<Link hỉnh ảnh poster>,
        "description": <Tóm tắt nội dung>,
        "sub_title": <Thể loại phim>,
        "age_type": <Độ tuổi>,
        "type": <Trạng thái>,
        "categories": [
            {
                "id": 1,
                "name": "fantasy (kỳ ảo)"
            },
            {
                "id": 2,
                "name": "drama (kịch)"
            },
            {
                "id": 3,
                "name": "comedy (hài kịch)"
            }
        ]
    }, …
]

○	Get Movie by ID:

Endpoint	  /api/movies/{id}
Phương thức	GET
Tham số	id - ID của bộ phim
Mô tả	Sử dụng để lấy thông tin về một bộ phim cụ thể dựa trên ID. Trả về một đối tượng Movie nếu thành công, hoặc trả về một phản hồi lỗi nếu không thành công.
Đầu ra	    {
        "id": <ID của bộ phim>,
        "background_img_url": <Link hình ảnh background>,
        "title_img_url": <Link hình ảnh title>,
        "title": <Tên phim>,
        "released_date": <Ngày phát hành>,
        "trailer_video_url": <Link video trailer>,
        "poster_url":<Link hỉnh ảnh poster>,
        "description": <Tóm tắt nội dung>,
        "sub_title": <Thể loại phim>,
        "age_type": <Độ tuổi>,
        "type": <Trạng thái>,
        "categories": [
            {
                "id": 1,
                "name": "fantasy (kỳ ảo)"
            },
            {
                "id": 2,
                "name": "drama (kịch)"
            },
            {
                "id": 3,
                "name": "comedy (hài kịch)"
            }
        ]
    }
○	Create Movie:

Endpoint	/api/movies/
Phương thức	GET
Tham số	{
	   “Authorization”: “Bearer” + token,
}
Body:  
{
        "background_img_url": <Link hình ảnh background>,
        "title_img_url": <Link hình ảnh title>,
        "title": <Tên phim>,
        "released_date": <Ngày phát hành>,
        "trailer_video_url": <Link video trailer>,
        "poster_url":<Link hỉnh ảnh poster>,
        "description": <Tóm tắt nội dung>,
        "sub_title": <Thể loại phim>,
        "age_type": <Độ tuổi>,
        "type": <Trạng thái>,
        "categories": <Danh sách thể loại>
}
Mô tả	Sử dụng để lấy thông tin về một bộ phim cụ thể dựa trên ID. Trả về một đối tượng Movie nếu thành công, hoặc trả về một phản hồi lỗi nếu không thành công.
Đầu ra	

○	Update Movie:

Endpoint	/api/movies/{id}
Phương thức	PUT
Tham số	{
	   “Authorization”: “Bearer” + token,
}
Body:  
id - ID của bộ phim cần cập nhật.
{
        "background_img_url": <Link hình ảnh background>,
        "title_img_url": <Link hình ảnh title>,
        "title": <Tên phim>,
        "released_date": <Ngày phát hành>,
        "trailer_video_url": <Link video trailer>,
        "poster_url":<Link hỉnh ảnh poster>,
        "description": <Tóm tắt nội dung>,
        "sub_title": <Thể loại phim>,
        "age_type": <Độ tuổi>,
        "type": <Trạng thái>,
        "categories": <Danh sách thể loại>
}
Mô tả	Sử dụng để cập nhật một bộ phim cụ thể dựa trên ID.Trả về một phản hồi không có nội dung nếu thành công, hoặc trả về một phản hồi lỗi nếu không thành công.
Đầu ra	

○	Delete Movie:

Endpoint	/api/movies/{id}
Phương thức	DELETE 
Tham số	{
	  “Authorization”: “Bearer” + token,
}
id - ID của bộ phim cần cập nhật.
Mô tả	Sử dụng để xóa một bộ phim cụ thể dựa trên ID. Trả về một phản hồi không có nội dung nếu xóa thành công, hoặc trả về một phản hồi lỗi nếu không thành công.
Đầu ra	
●	Payment APIs:
○	Create Payment:

Endpoint	/api/payment/pay
Phương thức	POST
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Body:
{
  "showTimeId": "ID của lịch chiếu",
  "amount": "Số lượng vé",
  "price": "Giá vé",
  "listSeatId": ["ID của các ghế đã chọn"]
}
Mô tả	API này được sử dụng để tạo một thanh toán mới. Nó tạo ra một mã thanh toán duy nhất và tạo một đơn đặt chỗ nếu chưa tồn tại. Sau đó, nó tạo URL thanh toán VNPAY và trả về nó trong đối tượng PaymentResponse.
Đầu ra	{
 “code”: “mã trạng thái”,
 “message”: “Thông điệp trạng thái”
 “urlPayment”: “đường dẫn thanh toán”
}

○	Payment Callback:

Endpoint	/api/payment/payment-callback
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
vnp_TxnRef: Mã thanh toán của giao dịch.
vnp_TransactionStatus: Trạng thái giao dịch từ VNPAY.
Mô tả	API này được sử dụng để xử lý callback từ VNPAY sau khi thanh toán hoàn tất. Nó cập nhật trạng thái thanh toán của đơn đặt chỗ và gửi email xác nhận cho người dùng.
Đầu ra	

●	Seats APIs:
○	Get Seats by Show Time

Endpoint	/api/seats/get/{showTimeId}/{theatreId}/{room}
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
showTimeId: ID của lịch chiếu.
theatreId: ID của rạp chiếu.
room: Số phòng chiếu.
Mô tả	API này được sử dụng để lấy danh sách các ghế dựa trên thông tin về lịch chiếu, rạp chiếu và phòng chiếu. Nó trả về danh sách các đối tượng SeatResponse, bao gồm thông tin về mỗi ghế và trạng thái thanh toán của mỗi ghế. Trong quá trình xử lý, API này cũng kiểm tra và cập nhật trạng thái thanh toán của các đơn đặt chỗ đã hết hạn.
Đầu ra	[
 {
   "id": "<ID của ghế>",
   "reservationId": "<ID của đặt vé>",
   "seatNumber": "<Số ghế>",
   "price": "<Giá>",
   "expired_time": "<Thời gian hết hạn>",
   "payment": "<Trạng thái thanh toán>",
   "isBooked": "<Đã đặt chỗ hay chưa>"
 },
…
]

●	Show Time APIs:
○	Get All Show Times:

Endpoint	/api/shows/all
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Mô tả	API này trả về danh sách tất cả các lịch chiếu. Nếu danh sách không rỗng, nó trả về danh sách lịch chiếu. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	[
 {
   "id": "<ID của suất chiếu>",
   "movie": "<bộ phim của suất chiếu>",
   "theatre": "<rạp chiếu của suất chiếu>",
   "room": "<số phòng>",
   "start_time": "<Thời gian bắt đầu chiếu>",
   "end_time": "<Thời gian kết thúc>",
   "status": "<Trạng thái suất chiếu>"
 },
…
]

○	Get Shows by Movie ID and Theatre ID:

Endpoint	/api/shows/get
Phương thức	GET
Tham số	movieID: id của movie
theatredID: id của rạp
date: ngày
Mô tả	API này trả về danh sách tất cả các lịch chiếu. Nếu danh sách không rỗng, nó trả về danh sách lịch chiếu. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	[
 {
   "id": "<ID của suất chiếu>",
   "movieId": "<bộ phim của suất chiếu>",
   "theatreId": "<rạp chiếu của suất chiếu>",
   "room": "<số phòng>",
   "date": "<Ngày chiếu>",
   "start_time": "<Thời gian bắt đầu chiếu>",
   "status": "<Trạng thái suất chiếu>"
 },
…
]

 
○	Get Showtime by ID:

Endpoint	/api/shows/{id}
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
id: ID của buổi chiếu
Mô tả	API này trả về thông tin về một buổi chiếu dựa trên ID. Nếu buổi chiếu tồn tại, nó trả về thông tin về buổi chiếu. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	 {
   "id": "<ID của suất chiếu>",
   "movie": "<bộ phim của suất chiếu>",
   "theatre": "<rạp chiếu của suất chiếu>",
   "room": "<số phòng>",
   "start_time": "<Thời gian bắt đầu chiếu>",
   "end_time": "<Thời gian kết thúc>",
   "status": "<Trạng thái suất chiếu>"
 }

○	Delete Show Time by ID:

Endpoint	/api/shows/{id}
Phương thức	DELETE
Tham số	{
	  “Authorization”: “Bearer” + token,
}
id: ID của buổi chiếu
Mô tả	API này trả về thông tin về một buổi chiếu dựa trên ID. Nếu buổi chiếu tồn tại, nó trả về thông tin về buổi chiếu. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	
 
○	Create Show Time:

Endpoint	/api/shows/
Phương thức	POST
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Body:
{
   "id": "<ID của suất chiếu>",
   "movie": "<bộ phim của suất chiếu>",
   "theatre": "<rạp chiếu của suất chiếu>",
   "room": "<số phòng>",
   "start_time": "<Thời gian bắt đầu chiếu>",
   "end_time": "<Thời gian kết thúc>",
   "status": "<Trạng thái suất chiếu>"
 }
Mô tả	API này tạo một buổi chiếu mới với thông tin được cung cấp. Nếu tạo thành công, nó trả về thông tin về buổi chiếu mới.
Đầu ra	{
   "id": "<ID của suất chiếu>",
   "movie": "<bộ phim của suất chiếu>",
   "theatre": "<rạp chiếu của suất chiếu>",
   "room": "<số phòng>",
   "start_time": "<Thời gian bắt đầu chiếu>",
   "end_time": "<Thời gian kết thúc>",
   "status": "<Trạng thái suất chiếu>"
 }

○	Update Show Time by ID

Endpoint	/api/shows/{id}
Phương thức	PUT
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Body:
id: ID của buổi chiếu
{
   "id": "<ID của suất chiếu>",
   "movie": "<bộ phim của suất chiếu>",
   "theatre": "<rạp chiếu của suất chiếu>",
   "room": "<số phòng>",
   "start_time": "<Thời gian bắt đầu chiếu>",
   "end_time": "<Thời gian kết thúc>",
   "status": "<Trạng thái suất chiếu>"
 }
Mô tả	API này cập nhật thông tin của một buổi chiếu dựa trên ID. Nếu cập nhật thành công, nó trả về thông tin về buổi chiếu đã được cập nhật.
Đầu ra	{
   "id": "<ID của suất chiếu>",
   "movie": "<bộ phim của suất chiếu>",
   "theatre": "<rạp chiếu của suất chiếu>",
   "room": "<số phòng>",
   "start_time": "<Thời gian bắt đầu chiếu>",
   "end_time": "<Thời gian kết thúc>",
   "status": "<Trạng thái suất chiếu>"
 }

●	Theaters APIs:
○	Get All Theaters:

Endpoint	/api/theatres/all
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Mô tả	API này trả về danh sách tất cả các rạp chiếu. Nếu danh sách không rỗng, nó trả về danh sách rạp chiếu. Ngược lại, nó trả về một phản hồi lỗi
Đầu ra	[
{
   "id": "<ID của rạp chiếu>",
   "name": "<tên rạp chiếu>",
   "address": "<địa chỉ rạp chiếu>",
   "phone_number": "<số điện thoại rạp>",
   "description": "<Thời gian bắt đầu chiếu>",
   "opening_hours": "<Thời gian mở cửa>",
   "rooms": "<số phòng>"
   “location” <Vị trí rạp>
 }, … ]
○	Get Theatre by ID:

Endpoint	/api/theatres/{id}
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
 id: ID của rạp chiếu
Mô tả	API này trả về thông tin về một rạp chiếu dựa trên ID. Nếu rạp chiếu tồn tại, nó trả về thông tin về rạp chiếu. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	{
   "id": "<ID của rạp chiếu>",
   "name": "<tên rạp chiếu>",
   "address": "<địa chỉ rạp chiếu>",
   "phone_number": "<số điện thoại rạp>",
   "description": "<Thời gian bắt đầu chiếu>",
   "opening_hours": "<Thời gian mở cửa>",
   "rooms": "<số phòng>"
   “location” <Vị trí rạp>
 }

○	Create Theatre:

Endpoint	/api/theatres/{id}
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Body:
{
   "id": "<ID của rạp chiếu>",
   "name": "<tên rạp chiếu>",
   "address": "<địa chỉ rạp chiếu>",
   "phone_number": "<số điện thoại rạp>",
   "description": "<Thời gian bắt đầu chiếu>",
   "opening_hours": "<Thời gian mở cửa>",
   "rooms": "<số phòng>"
   “location” <Vị trí rạp>
 }
Mô tả	API này tạo một rạp chiếu mới với thông tin được cung cấp. Nếu tạo thành công, nó trả về thông tin về rạp chiếu mới.
Đầu ra	{
   "id": "<ID của rạp chiếu>",
   "name": "<tên rạp chiếu>",
   "address": "<địa chỉ rạp chiếu>",
   "phone_number": "<số điện thoại rạp>",
   "description": "<Thời gian bắt đầu chiếu>",
   "opening_hours": "<Thời gian mở cửa>",
   "rooms": "<số phòng>"
   “location” <Vị trí rạp>
 }

○	Update Theatre by ID:

Endpoint	/api/theatres/{id}
Phương thức	PUT
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Body:
id: ID của rạp chiếu cần cập nhật
{
   "id": "<ID của rạp chiếu>",
   "name": "<tên rạp chiếu>",
   "address": "<địa chỉ rạp chiếu>",
   "phone_number": "<số điện thoại rạp>",
   "description": "<Thời gian bắt đầu chiếu>",
   "opening_hours": "<Thời gian mở cửa>",
   "rooms": "<số phòng>"
   “location” <Vị trí rạp>
 }
Mô tả	API này cập nhật thông tin của một rạp chiếu dựa trên ID. Nếu cập nhật thành công, nó trả về thông tin về rạp chiếu đã được cập nhật. Ngược lại trả về lỗi.
Đầu ra	{
   "id": "<ID của rạp chiếu>",
   "name": "<tên rạp chiếu>",
   "address": "<địa chỉ rạp chiếu>",
   "phone_number": "<số điện thoại rạp>",
   "description": "<Thời gian bắt đầu chiếu>",
   "opening_hours": "<Thời gian mở cửa>",
   "rooms": "<số phòng>"
   “location” <Vị trí rạp>
 }

○	Delete Theatre by ID:

Endpoint	/api/theatres/{id}
Phương thức	DELETE
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Body:
id: ID của rạp chiếu cần xóa
Mô tả	API này xóa một rạp chiếu dựa trên ID. Nếu xóa thành công, nó trả về một phản hồi không có nội dung. Ngược lại trả về lỗi.
Đầu ra	

●	Tickets APIs:
○	Get All Tickets:

Endpoint	/api/tickets/all
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Mô tả	API này trả về danh sách tất cả các vé. Nếu danh sách không rỗng, nó trả về danh sách vé. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	[
 {
   “id”: <ID của vé xem phim>,
   “showTime”: <Suất chiếu của vé xem phim>,
   “seat”: <Ghế ngồi của vé>,
   “reservation”: <Thông tin đặt của vé>,
   “ticketCode”: <Mã vé xem phim>,
   “price”: <Giá của vé>,
 },
… ]
○	Get Ticket by ID:

Endpoint	/api/tickets/{id}
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
id: ID của vé
Mô tả	 API này trả về thông tin về một vé dựa trên ID. Nếu vé tồn tại, nó trả về thông tin về vé. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	{
   “id”: <ID của vé xem phim>,
   “showTime”: <Suất chiếu của vé xem phim>,
   “seat”: <Ghế ngồi của vé>,
   “reservation”: <Thông tin đặt của vé>,
   “ticketCode”: <Mã vé xem phim>,
   “price”: <Giá của vé>,
}

○	Get Tickets by User ID:

Endpoint	/api/tickets/get/{userId}
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
userId: ID của người dùng
Mô tả	API này trả về danh sách các vé của một người dùng dựa trên ID của họ. Nếu danh sách không rỗng, nó trả về danh sách các vé. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	[
 {
   “id”: <ID của vé xem phim>,
   “showTime”: <Suất chiếu của vé xem phim>,
   “seat”: <Ghế ngồi của vé>,
   “reservation”: <Thông tin đặt của vé>,
   “ticketCode”: <Mã vé xem phim>,
   “price”: <Giá của vé>,  },… ]
●	User APIs:
○	Get User Profile:

Endpoint	 /api/users/profile
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Mô tả	API này trả về thông tin hồ sơ của người dùng đang xác thực. Nếu người dùng tồn tại, nó trả về thông tin hồ sơ của người dùng. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	{
 “id”: <ID của người dùng>,
 “email”: <Địa chỉ email của người dùng>,
 “phone”: <Số điện thoại người dùng>,
 “fullName”: <Họ tên người dùng>,
 “gender”: <Giới tính người dùng>,
 “birthday”: <Ngày sinh>
} 

○	Get All Users:

Endpoint	 /api/users/all
Phương thức	GET
Tham số	{
	  “Authorization”: “Bearer” + token,
}
Mô tả	API này trả về danh sách tất cả người dùng trong hệ thống. Nếu danh sách không rỗng, nó trả về danh sách người dùng. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	[
{
 “id”: <ID của người dùng>,
 “email”: <Địa chỉ email của người dùng>,
 “phone”: <Số điện thoại người dùng>,
 “fullName”: <Họ tên người dùng>,
 “gender”: <Giới tính người dùng>,
 “birthday”: <Ngày sinh>
},
… ] 
○	Create Admin:

Endpoint	/api/users/admin_create
Phương thức	POST
Tham số	{
	  “Authorization”: “Bearer” + token,
}
{
    "username": <Tên tài khoản>,
    "password": <Mật khẩu>,
    "email": <Email>,
    "phone_number": <Số điện thoại>,
    "full_name": <Họ tên>,
    "gender": <Giới tính>,
    "birthday": <Ngày sinh>,
    "role": <Phân quyền>
}
Mô tả	API này tạo một người dùng mới bởi quản trị viên. Nếu tạo thành công, nó trả về một phản hồi rỗng. Ngược lại trả về lỗi.
Đầu ra	

○	Update User Profile:

Endpoint	/api/users/edit
Phương thức	POST
Tham số	{
	  “Authorization”: “Bearer” + token,
}
{
    "username": <Tên tài khoản>,
    "password": <Mật khẩu>,
    "email": <Email>,
    "phone_number": <Số điện thoại>,
    "full_name": <Họ tên>,
    "gender": <Giới tính>,
    "birthday": <Ngày sinh>,
    "role": <Phân quyền>
}
Mô tả	API này cập nhật thông tin của người dùng. Nếu cập nhật thành công, nó trả về thông tin cập nhật của người dùng. Ngược lại, nó trả về một phản hồi lỗi.
Đầu ra	{
 “id”: <ID của người dùng>,
 “email”: <Địa chỉ email của người dùng>,
 “phone”: <Số điện thoại người dùng>,
 “fullName”: <Họ tên người dùng>,
 “gender”: <Giới tính người dùng>,
 “birthday”: <Ngày sinh>
} 

