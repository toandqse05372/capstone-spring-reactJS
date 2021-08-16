import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUsComp.css';
import { getUserLogin, showLoader, hideLoader, fetchAllCategory, fetchAllCity } from '../../../actions/index';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';

class TermsConditions extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount = () => {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className="termsBox">
                <div id="inline">
                    <div className="bulletListCustome"></div>
                    <div className="content">Điều khoản & điều kiện</div>
                </div>
                <div>
                    <h1>BẠN PHẢI ĐỌC NHỮNG ĐIỀU KHOẢN SỬ DỤNG DƯỚI ĐÂY TRƯỚC KHI SỬ DỤNG TRANG WEB NÀY. VIỆC SỬ DỤNG TRANG WEB NÀY XÁC NHẬN VIỆC CHẤP THUẬN VÀ TUÂN THỦ CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN DƯỚI ĐÂY.
                    </h1>
                    <p>Bằng cách truy cập và/hoặc sử dụng Website www.goboki.com (“Trang Web”), bạn thừa nhận rằng bạn đã đọc, hiểu và đồng ý chịu sự ràng buộc bởi các Điều Khoản Sử Dụng được quy định dưới đây và các điều khoản và điều kiện khác liên quan đến Trang Web, bao gồm nhưng không giới hạn ở các điều khoản và điều kiện về bảo mật và Các Câu Hỏi Thường Gặp, mà chúng cấu thành các thành phần không thể tách rời của các Điều Khoản Sử Dụng (“Điều Khoản”) này. Bạn phải đủ mười tám (18) tuổi trở lên để được phép sử dụng Trang Web.
                    Xin lưu ý rằng chúng tôi có thể thay đổi, sửa đổi, bổ sung và loại bỏ các Điều Khoản này vào bất cứ thời điểm nào mà không cần thông báo trước. Bạn phải đọc các Điều Khoản này một cách định kỳ. Bằng việc tiếp tục sử dụng Trang Web này sau khi đã có những thay đổi như vậy đối với các Điều Khoản, người truy cập, người dùng hoặc Người Dùng Đã Đăng Ký (“bạn” hay “Người Dùng”) đồng ý và chấp thuận với những thay đổi đó. Nếu bạn sử dụng bất kỳ dịch vụ nào khác của chúng tôi, thì việc sử dụng của bạn được dựa trên sự chấp thuận và tuân thủ các điều khoản và điều kiện được áp dụng đối với các dịch vụ đó.
                    </p>
                    <label>PHẠM VI CÁC DỊCH VỤ CỦA CHÚNG TÔI</label>
                    <p>Thông qua Trang Web, Goboki cung cấp một nền công cụ trực tuyến, nơi bạn có thể duyệt tìm các khu vui chơi khác nhau, và thực hiện việc đặt vé(“Dịch Vụ”). Người Dùng có thể đặt trên Trang Web các dịch vụ do cáckhu vui chơi và/hoặc bất kỳ nhà cung cấp dịch vụ khác (“Các Nhà Cung Cấp”) cung cấp. Bằng cách đưa ra một lệnh đặt chỗ thông qua Trang Web. Chúng tôi sẽ gửi một xác nhận lệnh đặt chỗ qua email xác nhận. Chúng tôi bảo lưu quyền từ chối lệnh đặt chỗ của bạn theo quy định dưới đây.
                    </p>
                    <p>Mặc dù chúng tôi sẽ sử dụng những kỹ năng chuyên môn với sự cẩn trọng của chúng tôi trong việc thực hiện dịch vụ, chúng tôi không xác nhận, và không đảm bảo rằng tất cả các thông tin được cung cấp là chính xác, đầy đủ, phù hợp hoặc hiện hành, và chúng tôi không chịu trách nhiệm cho bất kỳ sai sót nào (bao gồm cả các lỗi sắp xếp và đánh máy), trở ngại (cho dù do sự hư hỏng, sửa chữa hoặc nâng cấp tạm thời và/hoặc cục bộ đối với Trang Web hoặc lý do khác), không chính xác, nhầm lẫn hoặc thông tin sai lệch hoặc việc không thể chuyển thông tin.
                    </p>
                    <p>Xảy ra những thay đổi về điều kiện hoặc hoàn cảnh thị trường mà có thể dẫn đến những thay đổi trong một thời gian ngắn khiến thông tin được cung cấp không chính xác hoặc không hiện hành. Trong trường hợp có bất kỳ vấn đề gì, bộ phận dịch vụ khách hàng có thể liên hệ để hỗ trợ bạn và giải đáp cho các thắc mắc của bạn.
                    </p>
                    <p>Trang Web này không đưa ra bất cứ tuyên bố nào và không được giải thích là đưa ra bất cứ đề nghị hoặc gợi ý nào về mức độ chất lượng dịch vụ hoặc đánh giá xếp hạng về các Nhà Cung Cấp được liệt kê trên Trang Web. Chúng tôi tuyên bố khước từ bất kỳ khiếu nại, tổn thất hoặc trách nhiệm nào đối với chất lượng hay tình trạng của Nhà Cung Cấp hiện hữu được liệt kê trên Trang Web (cung cấp các dịch vụ hàng không, khách sạn hoặc các dịch vụ khác). Các Nhà Cung Cấp có thể được giới thiệu ở hình thức phân loại thứ hạng khác nhau dựa trên các yếu tố bao gồm nhưng không giới hạn các đánh giá, xếp hạng hoặc các yếu tố khác của họ. Sự xếp hạng đưa ra được tính dựa trên các thuật toán tự động có thể được cập nhật và thay đổi tùy từng thời điểm, theo quyết định chỉ của riêng của chúng tôi.
                    </p>
                    <p>Trong trường hợp cụ thể, chúng tôi có thể hủy bỏ hoặc từ chối giao dịch đặt chỗ đối với các “Lỗi Thực”, mà không phụ thuộc vào nguồn gốc các sai sót. Để tránh sự nghi ngờ, Lỗi Thực là lỗi trên Trang Web (ví dụ như trong điều khoản về giá cả) mà không có người bình thường nào cho là phù hợp hoặc có ý nghĩa trong kinh doanh. Số tiền đã thanh toán sẽ được hoàn trả mà không tính thêm khoản phí nào khác trong trường hợp như vậy.</p>
                    <label>HỦY BỎ</label>
                    <p>Bằng cách thực hiện việc đặt vé qua Trang Web, bạn chấp nhận và đồng ý với các điều khoản và điều kiện của các Nhà Cung Cấp liên quan, bao gồm các chính sách liên quan đến hủy bỏ và/hoặc vắng mặt, hoặc đối với các yêu cầu cụ thể mà bạn có thể đưa ra cho Nhà Cung Cấp. Goboki không chịu trách nhiệm cho bất kỳ vi phạm các điều khoản và điều kiện này mà đã có sự đồng ý giữa Nhà Cung Cấp và Người Dùng, hoặc dựa trên các yêu cầu cụ thể của Người Dùng, vì vậy xin vui lòng đọc các điều khoản và điều kiện của các Nhà Cung Cấp một cách cẩn thận.</p>
                    <p>Liên quan đến sự hủy bỏ đặt vé của Người Dùng mà đã được hoàn thành, Goboki có thể giữ lại hoặc lấy một phần của số tiền đã thanh toán để bồi hoàn những chi phí đã phát sinh liên quan đến việc huỷ bỏ</p>
                    <label>LỜI KHUYÊN VỀ DU LỊCH</label>
                    <p>Bằng cách hiển thị các điểm đến cụ thể, Goboki không tuyên bố hoặc bảo đảm rằng việc đến các điểm này là nên hoặc không có rủi ro và Goboki không chịu trách nhiệm pháp lý về thiệt hại hay tổn thất có thể xảy ra do việc du lịch đến các điểm đó. Trong mọi trường hợp Goboki sẽ không chịu trách nhiệm pháp lý về bất kỳ sự cố bất lợi xảy ra trong suốt chuyến đi hoặc sự lưu trú của bạn. Bạn tự chịu trách nhiệm về việc lựa chọn chuyến du lịch, lộ trình và điểm đến, cho toàn bộ hành trình của bạn. Goboki không chịu trách nhiệm cho bất kỳ tổn thất nào xảy ra khi bạn không mang theo giấy tờ cần thiết cho chuyến du lịch, chẳng hạn như hộ chiếu của bạn.
                    </p>
                    <label>GIÁ CẢ VÀ KHUYẾN MÃI</label>
                    <p>Tùy từng thời điểm, chúng tôi có thể chào mức giá thấp hơn và/hoặc chương trình khuyến mãi. Vui lòng lưu ý rằng những mức giá thấp hơn và chương trình khuyến mãi như vậy liên quan đến các điều kiện và yêu cầu khác nhau, ví dụ, liên quan đến việc đặt vé và chính sách hoàn trả.</p>
                    <label>TÀI KHOẢN NGƯỜI DÙNG</label>
                    <p>Cho mục đích đăng ký, chúng tôi sẽ thu thập và xử lý thông tin cá nhân của bạn như tên, địa chỉ thư điện tử (e-mail) và số điện thoại di động của bạn khi bạn đăng ký. Bạn phải cung cấp cho chúng tôi thông tin chính xác, đầy đủ và mới nhất và đồng ý cung cấp cho chúng tôi bằng chứng nhận dạng liên quan mà chúng tôi có thể yêu cầu một cách hợp lý.
                    </p>
                    <p>Chỉ bạn mới có thể sử dụng tài khoản của mình và bạn tuyên bố và bảo đảm rằng bạn sẽ không cho phép bất kỳ bên nào khác sử dụng danh tính hoặc tài khoản của bạn vì bất kỳ lý do gì, trừ khi được Goboki cho phép.
                    </p>
                    <p> Bạn không thể chuyển giao hoặc chuyển nhượng tài khoản của mình cho bất kỳ bên nào khác.
                    </p>
                    <p>Bạn phải đảm bảo tính bảo mật của mật khẩu tài khoản và bất kỳ thông tin nhận dạng nào mà chúng tôi cung cấp cho bạn. Trong trường hợp xảy ra việc sử dụng trái phép tài khoản hoặc danh tính của bạn do mật khẩu của bạn bị tiết lộ, (các) đơn hàng nhận được từ việc sử dụng trái phép đó vẫn được coi là đơn đặt hàng hợp lệ và chúng tôi sẽ xử lý các đơn đặt hàng đó. Bạn tuyên bố rằng Goboki không chịu trách nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào phát sinh từ việc sử dụng sai tài khoản của bạn.
                    </p>
                    <p>Nếu bạn không còn quyền kiểm soát tài khoản của mình, bạn phải thông báo ngay cho chúng tôi (ví dụ: tài khoản của bạn bị hack theo bất kỳ hình thức nào hoặc điện thoại của bạn bị đánh cắp) để chúng tôi có thể tạm thời chặn và / hoặc vô hiệu hóa tài khoản của bạn đúng cách. Xin lưu ý rằng bạn chịu trách nhiệm cho việc sử dụng tài khoản của bạn và có thể chịu trách nhiệm về tài khoản của bạn ngay cả khi tài khoản của bạn bị người khác sử dụng sai.
                    </p>
                    <label>THANH TOÁN BẰNG THẺ TÍN DỤNG & GIAN LẬN</label>
                    <p>Đối với việc thanh toán cho đặt chỗ thông qua Trang Web này, thẻ tín dụng của bạn sẽ được Goboki lập biên nhận thanh toán cho giá đầy đủ tại thời điểm đặt chỗ và xác nhận đặt chỗ (bất kỳ sự hoàn trả nào có thể được đưa ra đều sẽ phụ thuộc vào các điều kiện của việc đặt chỗ hiện hữu). Bạn bắt buộc phải kiểm tra các thông tin đặt chỗ kỹ lưỡng trước mỗi lần bạn thực hiện đặt chỗ. Goboki sẽ xử lý bất kỳ sự hoàn trả nào, nếu có, trong một thời hạn hợp lý. Đối với một số đặt chỗ, Goboki có thể không tính phí trên thẻ tín dụng của bạn và yêu cầu thanh toán trực tiếp cho các Nhà Cung Cấp có liên quan. Để bảo vệ và mã hóa các thông tin thẻ tín dụng của bạn khi các thông tin đó được chuyển cho chúng tôi, chúng tôi sử dụng công nghệ mã hóa như Transport Layer Security (“TLS”) hoặc Secure Sockets Layer (“SSL”) cho các dịch vụ của chúng tôi.
                    </p>
                    <p>Trong trường hợp bị gian lận thẻ tín dụng hoặc người khác sử dụng trái phép thẻ tín dụng của bạn, bạn có trách nhiệm liên hệ ngân hàng hoặc đơn vị phát hành thẻ của mình ngay lập tức ngay khi nhận biết về hành vi gian lận hoặc sử dụng trái phép thẻ tín dụng này. Trong trường hợp này, Goboki khước từ trách nhiệm đối với bất kỳ trường hợp gian lận thẻ tín dụng hoặc việc sử dụng trái phép thẻ tín dụng của bạn do người khác gây ra, bất kể trong trường hợp gian lận hoặc việc sử dụng trái phép này được tiến hành thông qua các dịch vụ của Goboki. </p>
                    <p>Bạn phải đảm bảo rằng các chi tiết mà bạn cung cấp cho chúng tôi là hoàn toàn đúng sự thật, thích hợp và chính xác. Goboki bảo lưu quyền không chấp nhận một số thẻ tín dụng. Goboki có thể bổ sung hoặc loại bỏ các phương thức thanh toán khác theo quyết định của chúng tôi.</p>
                    <p>Trong một số trường hợp, chúng tôi có thể yêu cầu cung cấp hoặc xác minh thêm thông tin để phê duyệt hiệu lực và xác nhận đặt chỗ, như được mô tả chi tiết hơn trên Trang Web. Việc đặt chỗ không được xác nhận cho đến khi bạn đã nhận được email xác nhận cùng với vé điện tử hoặc biên lai, và có khả năng là Nhà Cung Cấp có thể thực hiện các cơ chế kiểm tra gian lận trong quá trình đặt chỗ. Nếu có sự gian lận xảy ra hoặc được xác định xảy ra thì đặt chỗ sẽ không còn tồn tại hoặc tự động trở nên vô hiệu. Goboki Sẽ không chịu bất cứ trách nhiệm nào. Nếu bạn chọn cách không cấp thêm thông tin, việc đặt trước sẽ không được hoàn thành và sẽ trở nên vô hiệu.</p>
                    <label>HẠN CHẾ SỬ DỤNG</label>
                    <p>Bạn, tại đây, đồng ý không sử dụng Trang Web hoặc Nội Dung cho các hoạt động bất hợp pháp hoặc trái phép. Bạn đồng ý rằng bạn sẽ không sử dụng bất kỳ thiết bị, phần mềm, hoặc các công nghệ nào khác có thể cản trở hoặc cố tình gây cản trở hoạt động của Trang Web này. Bạn đồng ý không sử dụng Trang Web này hoặc Nội Dung của nó cho các mục đích thương mại. Bạn đồng ý không tìm kiếm, tạo ra, truy vấn, sử dụng hoặc gửi các nhân tố tự động hoặc các hình thức công nghệ khác để thu thập hoặc lấy thông tin từ Trang Web này, hoặc can thiệp Trang Web này bằng cách khác.
                    </p>
                    <label>QUYỀN SỞ HỮU TRÍ TUỆ</label>
                    <p>Goboki sở hữu tất cả các Quyền Sở Hữu Trí Tuệ trên Trang Web này. Tất cả các thông tin và tài liệu, bao gồm nhưng không giới hạn ở phần mềm, văn bản, dữ liệu, đồ họa, hình ảnh, âm thanh, video, nhãn hiệu, logo, biểu tượng, mã html và các mã khác trên Trang Web này đều bị cấm công bố, sửa đổi, sao chép, nhân bản, tạo phó bản hoặc thay đổi trong bất kỳ cách nào ngoài phạm vi của Trang Web này mà không có sự cho phép của Goboki. Nếu bạn vi phạm những quyền này, Goboki bảo lưu quyền yêu cầu bạn bồi thường dân sự cho toàn bộ thiệt hại hoặc tổn thất mà Goboki phải gánh chịu. Những hành vi vi phạm cũng có thể cấu thành tội phạm hình sự.</p>
                    <p>Trang Web chứa Quyền Sở Hữu Trí Tuệ của Goboki, bao gồm nhưng không giới hạn ở văn bản, phần mềm, ảnh, đồ họa, video, âm nhạc và âm thanh. Toàn bộ Nội Dung của Trang Web được bảo hộ theo pháp luật về quyền tác giả. Chúng tôi và các bên cấp phép của chúng tôi sở hữu quyền tác giả và/hoặc các quyền khác thông qua việc lựa chọn, phối hợp, sắp xếp, và sửa chữa Nội Dung và các nội dung ban đầu. Bạn không được sửa đổi, nhân bản, sao chép, trình diễn, trưng bày, xuất bản hoặc khai thác toàn bộ hay một phần Nội Dung, trừ trường hợp được quy định rõ ràng trong các Điều Khoản này.
                    </p>
                    <p>Trừ khi có quy định khác, các phần mềm cần thiết cho việc cung cấp các dịch vụ, phần mềm có sẵn để sử dụng trên Trang Web này, và Quyền Sở Hữu Trí Tuệ trong các Nội Dung trên Trang Web thuộc quyền sở hữu của Goboki, công ty trực thuộc hoặc liên kết, các bên cấp phép, các nhà cung ứng và cung cấp nội dung của Goboki. Gobokisẽ không chịu trách nhiệm đối với quyền sở hữu trí tuệ thuộc sở hữu của bên thứ ba hoặc đối với sự xâm phạm quyền sở hữu trí tuệ thuộc sở hữu của bên thứ ba.
                    </p>
                    <p>Chúng tôi có thể cung cấp các liên kết đến các trang web khác được duy trì bởi các bên khác, bằng cách nhấn vào liên kết, bạn, tại đây, tuyên bố, xác nhận và đồng ý rằng hành động đó là hành động tự nguyện của bạn để xem hoặc truy cập các trang web khác đó mà Goboki không kiểm sát hoặc chịu trách nhiệm.
                    </p>
                    <p>Goboki, trong quá trình phát triển Trang Web, chuẩn bị mã nguồn và thực hiện phần mềm hỗ trợ, có thể cấp phép sử dụng phần mềm mã nguồn mở từ bên thứ ba thông qua Giấy Phép Công Cộng GNU (GNU General Public Licence). Mọi việc sử dụng phần mềm mã nguồn mở và các quyền sở hữu trí tuệ của bên thứ ba bởi Goboki là có giấy phép hoặc sự cho phép cần thiết.
                    </p>
                    <label>BỒI THƯỜNG</label>
                    <p>Bạn đồng ý bồi thường và giữ cho Goboki và nhân viên, các công ty liên kết, nhân viên và các đối tác của chúng tôi không bị tổn hại từ và đối với bất kỳ và tất cả các khiếu nại, yêu cầu, trách nhiệm, thiệt hại hay tổn thất bao gồm cả khoản chi phí pháp lý, phát sinh do việc khiếu nại của bên thứ ba có liên quan đến: (a) việc bạn sử dụng Trang Web; (b) Nội Dung được đưa ra, cung cấp hoặc truy cập thông qua Trang Web này; (c) việc bạn vi phạm Điều Khoản; (d) việc bạn vi phạm bất kỳ quyền hoặc nghĩa vụ khác; và/hoặc (e) bất kỳ hành động hoặc sơ sót nào của bạn, cho dù do sự cẩu thả, bất hợp pháp hay nguyên nhân nào khác.
                    </p>
                    <label>LIÊN KẾT VÀ NỘI DUNG CỦA BÊN THỨ BA</label>
                    <p>Trang Web có thể chứa các liên kết đến các trang web do các bên khác với Goboki điều hành. Chúng tôi không kiểm soát các trang web hoặc liên kết này và không chịu trách nhiệm về nội dung hoặc sự riêng tư hoặc các hoạt động khác của các trang web đó. Chúng tôi, hoặc các bên thứ ba khác, có thể tải lên các kết quả tìm kiếm tự động hoặc cung cấp các liên kết đến các trang web khác. Chúng tôi cung cấp cơ hội cho các bên thứ ba để phân phối, đăng tải, truyền đưa hoặc cung cấp theo cách khác bất kỳ thông tin, dữ liệu, văn bản, hình ảnh, âm thanh, đồ họa, video, tin nhắn, đánh giá, hoặc các tài liệu khác (“Nội Dung”) thông qua Trang Web này. Chúng tôi không xem xét và/hoặc không kiểm soát trang web, nguồn, và Nội Dung. Bạn đồng ý rằng chúng tôi không chịu trách nhiệm về nội dung hoặc tính có sẵn của các trang web và các nguồn như vậy, và chúng tôi không chứng thực hoặc đề nghị và không chịu trách nhiệm về nguồn gốc của các trang web hoặc Nội Dung. Bạn, tại đây, đồng ý miễn trừ chúng tôi khỏi và đối với bất kỳ và tất cả trách nhiệm, khoản phí, tổn thất hoặc thiệt hại trực tiếp hoặc gián tiếp bị gây ra hoặc được cho là bị gây ra bởi hoặc liên quan đến việc sử dụng hoặc có liên quan đến Nội Dung, trang web hoặc nguồn tài nguyên đó.
                    </p>
                    <label>CHẤM DỨT</label>
                    <p> Chỉ Goboki có toàn bộ quyền quyết định đối với việc thay đổi, trì hoãn, tạm ngừng hoặc ngừng Trang Web này và/hoặc một phần của Trang Web, bao gồm cả các dịch vụ hoặc sản phẩm được cung cấp trên Trang Web này, và/hoặc việc sử dụng Trang Web này, hoặc một phần của Trang Web, vào bất cứ lúc nào vì bất kỳ lý do gì mà không cần thông báo trước cho bạn.
                    </p>
                    <p>Trong trường hợp chấm dứt, bạn vẫn bị ràng buộc bởi các nghĩa vụ trong Điều Khoản này, bao gồm nhưng không giới hạn ở các bảo đảm, bồi thường, khước từ và giới hạn của các nghĩa vụ pháp lý mà bạn đã đồng ý.
                    </p>
                    <p>Goboki không chịu trách nhiệm với bạn hoặc bất kỳ bên thứ ba nào về việc chấm dứt hoặc đình chỉ sự truy cập của bạn vào Trang Web.
                    </p>
                    <label>GIẢI QUYẾT TRANH CHẤP</label>
                    <p>Trong trường hợp có tranh chấp phát sinh từ hoặc liên quan đến các Điều Khoản này, cả hai bên đầu tiên sẽ thảo luận trên tinh thần thiện chí để đạt được một giải pháp hoà giải trong vòng sáu mươi (60) ngày, kể từ ngày nhận thông báo tranh chấp. Tuy nhiên, nếu tranh chấp đó không thể giải quyết được bằng cách thương thảo giữa hai bên trong vòng sáu mươi (60) ngày, tranh chấp sẽ được đệ trình lên cơ quan có thẩm quyền giải quyết tranh chấp tại Việt Nam.
                    </p>
                    <label>CÁC QUY ĐỊNH CHUNG</label>
                    <p>Những Điều Khoản này sẽ cấu thành toàn bộ thỏa thuận và hiểu biết giữa bạn và Goboki về đối tượng của các Điều Khoản, và sẽ thay thế mọi thoả thuận trước đây, dù bằng văn bản hoặc bằng lời nói, giữa bạn và Goboki liên quan đến đối tượng của các Điều Khoản.</p>
                    <p>Để tránh sự nghi ngờ, Goboki không quản lý hoặc kiểm soát các Nhà Cung Cấp.</p>
                    <p>Nếu bạn sử dụng Trang Web cho hoặc thay mặt cho một bên thứ ba (“Bên Thứ Ba”), chẳng hạn như một thành viên trong gia đình hoặc một người bạn đồng hành, bạn có trách nhiệm cho bất kỳ lỗi nào trong tính chính xác của thông tin cung cấp liên quan đến việc sử dụng này. Ngoài ra, bạn phải thông báo cho Bên Thứ Ba tất cả các điều khoản và điều kiện áp dụng. Khi sử dụng Trang Web thay mặt hoặc đại diện cho một Bên Thứ Ba, bạn đồng ý bồi thường và giữ cho Goboki không bị tổn hại đối với bất kỳ và mọi trách nhiệm, tổn thất, thiệt hại, kiện tụng và cáo buộc bao gồm cả các khoản chi phí pháp lý, phát sinh từ hoặc liên quan đến các vi phạm của các Điều Khoản này hoặc do sơ suất của bạn và/hoặc các Bên Thứ Ba.
                    </p>
                    <p>Những Điều Khoản này được lập bằng tiếng Anh. Bất kỳ bản dịch sang ngôn ngữ nào khác chỉ nhằm mục đích cho sự thuận tiện và thông tin. Trong trường hợp có mâu thuẫn giữa bản tiếng Anh và bất kỳ bản dịch nào, bản tiếng Anh sẽ được ưu tiên áp dụng. Tiêu đề trong Điều Khoản này chỉ nhằm mục đích cho sự thuận tiện và không ảnh hưởng đến việc hiểu hoặc giải thích các Điều Khoản.
                    </p>
                    <p>Trong trường hợp bất kỳ điều khoản nào được xác định là không thể thực thi hoặc vô hiệu, bởi tòa án của bất kỳ khu vực luật pháp có thẩm quyền nào, quy định đó sẽ vẫn có hiệu lực trong phạm vi đầy đủ nhất được cho phép bởi pháp luật hiện hành, và việc xác định như vậy sẽ không ảnh hưởng đến hiệu lực và tính thực thi của các quy định còn lại. Điều khoản bị xác định không thể thực thi hoặc vô hiệu sẽ được thay thế bằng một điều khoản tương đương nhất với quy định ban đầu về khía cạnh ngôn ngữ và dữ liệu.
                    </p>
                    <p>Việc một Bên không thực thi bất cứ quy định của Điều Khoản này tại bất cứ thời điểm nào cũng sẽ không được hiểu như là khước từ quyền của Bên đó để thực thi đối với sự vi phạm điều khoản đó hoặc bất kỳ điều khoản nào khác của Điều Khoản này hoặc như là sự khước từ đối với bất cứ vi phạm tiếp tục, vi phạm kế tiếp, hoặc vi phạm sau này đối với bất kỳ quy định nào hoặc quy định khác của các Điều Khoản này.
                    </p>
                    <p>Bạn không thể chuyển nhượng hoặc chuyển giao bất cứ quyền và nghĩa vụ nào của bạn theo các Điều Khoản này mà không có sự chấp thuận trước bằng văn bản của chúng tôi.
                    </p>
                    <p>Chúng tôi bảo lưu quyền sửa đổi hoặc hủy bỏ các Điều Khoản (hoặc các phần của Điều Khoản) theo quyết định của riêng chúng tôi. Chúng tôi có thể sửa đổi các Điều Khoản bất cứ lúc nào bằng cách đăng tải bản sửa đổi trên Trang Web. Phiên bản mới nhất của Điều Khoản sẽ thay thế tất cả các phiên bản trước đó.
                    </p>
                    <p>  Trừ khi có quy định rõ ràng, không có quy định nào trong các Điều Khoản này được dự liệu là cấp cho bất kỳ bên thứ ba nào bất kỳ quyền gì để thực thi bất kỳ điều khoản nào hoặc trao cho bất kỳ bên thứ ba nào bất kỳ lợi ích nào theo các Điều Khoản. Việc áp dụng của Đạo Luật Hợp Đồng (Quyền Của Bên Thứ Ba) (Chương 53B) và bất kỳ văn bản ban hành lại nào được loại trừ một cách rõ ràng.
                    </p>
                    <p>Các thông báo được đưa ra theo Điều Khoản này sẽ được coi là đã được đưa ra một cách đầy đủ nếu các thông báo này được lập thành văn bản và được gửi bảo đảm hoặc dịch vụ báo phát hoặc phương cách tương đương tới mỗi Bên (tại địa chỉ trụ sở của chúng tôi, hoặc tại địa chỉ khác được thông báo).
                    </p>
                </div>
                <FullPageLoader />
            </div>
        );
    }

}

// export default HomePage;

const mapStateToProps = state => {
    return {
        loader: state.Loader
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchUserDetail: (user) => {
            dispatch(getUserLogin(user))
        },
        fetchAllCity: (listCity) => {
            dispatch(fetchAllCity(listCity))
        },
        fetchAllCategory: (listCategory) => {
            dispatch(fetchAllCategory(listCategory))
        },
        showLoader: () => {
            dispatch(showLoader())
        },
        hideLoader: () => {
            dispatch(hideLoader())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TermsConditions);
