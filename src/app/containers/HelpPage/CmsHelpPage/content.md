## A. Thông tin chung

- CMS (Contest Management System) là hệ thống cho phép tổ chức các kỳ thi lập trình theo thể thức tương tự IOI (International Olympiad in Informatics).
- Mỗi thí sinh có thể đăng nhập bằng User và Password mà thí sinh đó đã đăng kí với BTC.
- Điểm của thí sinh trong một kỳ thi là tổng điểm của thí sinh trong tất cả bài tập của kỳ thi đó. Thí sinh có thể nộp bài nhiều lần cho mỗi bài tập.
- Điểm của thí sinh trong một bài tập là điểm cao nhất trong các bài làm mà thí sinh đã nộp cho bài tập đó.
- Với mỗi lần nộp bài (cho mỗi bài trong đề thi), thí sinh có thể xem kết quả của lần nộp bài này đã đúng được bao nhiêu test của Ban giám khảo.
- BTC sẽ giới hạn thời gian tối thiếu giữa 2 lần gửi bài liên tiếp là 60 giây để tránh hiện tượng spam.

## B. Một số thao tác chính khi sử dụng CMS

### 1. Đăng nhập hệ thống

![Login](/assets/images/cms_helper/cmshelper_login.png)

- Đầu tiên, các bạn vào địa chỉ [https://freecontest.xyz/login](https://freecontest.xyz/login).
- Sau đó đăng nhập bằng username và password mà bạn đã đăng kí với BTC.
- Bạn có thể lựa chọn ngôn ngữ ở nút góc trên bên phải nếu muốn.

### 2. Tham gia kỳ thi

Tương tự lúc đăng kí tham gia kì thi, khi contest bắt đầu tính thời gian làm bài, ở phía bên phải của trang sẽ hiển thị phần Contest đang diễn ra. Các bạn nhấn vào nút Tham gia ngay để bắt đầu làm bài.

![Join](/assets/images/cms_helper/cmshelper_join.png)

### 3. Tổng quan về kỳ thi

![Overview](/assets/images/cms_helper/cmshelper_overview.png)

Trên màn hình tổng quan về kỳ thi có các thông tin sau:

1. Tên cuộc thi
2. Thời gian còn lại (giờ: phút: giây)
3. Nút đăng xuất
4. Danh sách các bài tập trong kỳ thi
5. Thông tin thời điểm bắt đầu và kết thúc

### 4. Đặt câu hỏi với Ban Tổ Chức

![Communication](/assets/images/cms_helper/cmshelper_communication.png)

Thí sinh có thể vào phần **Communication** và đặt câu hỏi với Ban tổ chức.

### 5. Thông tin về một bài tập trong kỳ thi

![Exercise information](/assets/images/cms_helper/cmshelper_exerciseinfo.png)

Với mỗi bài tập trong kỳ thi (ở phần bên trái của màn hình), nhấn vào Statement để tải đề bài và xem thông tin của bài.

Trên màn hình thông tin của mỗi bài của thông tin sau:

1. Menu **Statement** của bài
2. Tên bài tập
3. Nút tải đề bài
4. Giới hạn thời gian, giới hạn bộ nhớ, và lệnh biên dịch với mỗi ngôn ngữ

### 6. Nộp bài và xem kết quả

![Submissions](/assets/images/cms_helper/cmshelper_submitinfo.png)

1. Nhấn vào **Submissions** của bài tập để nộp bài
2. Chọn file mã nguồn và nhấn nút **Submit** để nộp bài
3. Có thể nhấn vào nút **Download** để tải về lại mã nguồn đã nộp
4. Nhấn vào **details** để xem thông tin chi tiết về kết quả của bài làm

Thí sinh có thể xem kết quả chi tiết bài làm của mình.

Kết quả mỗi lần nộp bài: Nếu có lỗi cú pháp hệ thống sẽ báo lỗi biên dịch. Nếu chương trình chạy thành công sẽ hiển thị điểm đạt được trong tổng số 50 điểm tối đa cho mỗi bài (kết quả tính theo % số test đúng).

Trong ví dụ trên, bài làm của thí sinh đạt được 50/50 điểm (đúng hoàn toàn các bộ test).

Ví dụ: Kết quả chi tiết của bài làm.

![Submissions detail](/assets/images/cms_helper/cmshelper_submitdetail.png)

Ví dụ: Kết quả của trình biên dịch

![Compilation](/assets/images/cms_helper/cmshelper_compileinfo.png)

BTC sẽ giới hạn thời gian tối thiếu giữa 2 lần gửi bài liên tiếp là 60 giây để tránh hiện tượng spam. Nếu các bạn submit liên tục sẽ nhận được thông báo như hình bên dưới

![Limitation popup](/assets/images/cms_helper/cmshelper_limitedpopup.png)

### 7. Một số thông báo khi biên dịch và kết quả bài làm

Một số thông báo có thể gặp khi biên dịch bài làm:

| Thông báo                   | Ý nghĩa                   |
| --------------------------- | ------------------------- |
| Compilation succeeded       | Biên dịch thành công      |
| Output is partially correct | Kết quả chỉ đúng một phần |
| Compilation failed          | Biên dịch gặp lỗi         |
| Execution timed out         | Chạy quá thời gian        |
| Output isn't correct        | Kết quả sai               |
| File too big                | Source code quá lớn       |
| Invalid format              | Định dạng không hợp lệ    |
