import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUsComp.css';
import { getUserLogin, showLoader, hideLoader, fetchAllCategory, fetchAllCity } from '../../../actions/index';
import FullPageLoader from '../../../components/FullPageLoader/FullPageLoader';

class PolicynPrivacy extends Component {

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
            <div className="policyBox">
                <div id="inline">
                    <div className="bulletListCustome"></div>
                    <div className="content">
Chính sách & quyền riêng tư</div>
                </div>
                <div>
                    <p>Goboki cam kết bảo vệ và tôn trọng quyền riêng tư dữ liệu cá nhân của bạn và tuân thủ các nguyên tắc và quy định bảo vệ dữ liệu theo pháp luật hiện hành. Chúng tôi có thể thu thập, xử lý, sử dụng và tiết lộ thông tin của bạn khi bạn sử dụng trang web www.goboki.com và dịch vụ được cung cấp bởi Goboki hoặc các Nhà điều hành thông qua nền tảng Goboki này (gọi chung là “Dịch vụ”) như được mô tả trong Chính sách bảo mật này. “Bạn” và “của bạn” được sử dụng trong Chính sách bảo mật này bao gồm bất kỳ người nào truy cập Nền tảng Goboki hoặc sử dụng Dịch vụ.
                    Chính sách bảo mật này đặt ra nền tảng cơ bản và các điều khoản mà dựa trên đó Goboki thu thập, xử lý, sử dụng và/hoặc tiết lộ thông tin của bạn thu được từ bạn khi bạn truy cập Nền tảng Goboki và/hoặc sử dụng Dịch vụ. Thông tin này có thể bao gồm thông tin cá nhân liên quan đến hoặc liên kết với một cá nhân cụ thể như tên, địa chỉ cư trú, số điện thoại, địa chỉ email, thông tin chứng từ du lịch, thông tin thuê phương tiện, thông tin bảo hiểm, độ tuổi, ngày sinh hoặc bất kỳ thông tin nào khác mà chúng tôi đã yêu cầu và bạn đã cung cấp thông qua Nền tảng Goboki (gọi tắt là “Thông tin cá nhân”).
                    </p>
                    <label>Vui lòng đọc kỹ Chính sách bảo mật này.</label>
                    <p>Bằng cách truy cập Nền tảng Goboki, bạn đồng ý với việc thu thập, xử lý, sử dụng và tiết lộ Thông tin cá nhân của bạn như được quy định trong Chính sách bảo mật này.
                    </p>
                    <label>Phạm vi điều khoản</label>
                    <p>Goboki bảo lưu quyền cập nhật, sửa đổi hoặc điều chỉnh các điều khoản của Chính sách bảo mật này hoặc bất kỳ phần nào của nó mà không cần thông báo trước và việc bạn tiếp tục truy cập Nền tảng Goboki hoặc sử dụng Dịch vụ có nghĩa là bạn chấp nhận Chính sách bảo mật đã được cập nhật, sửa đổi hoặc điều chỉnh trừ trường hợp các thay đổi như vậy làm giảm quyền lợi của bạn, chúng tôi sẽ yêu cầu sự đồng ý của bạn. Nếu bạn không đồng ý với tất cả các điều khoản và điều kiện trong Chính sách bảo mật này và/hoặc bất kỳ bản cập nhật, sửa đổi hoặc điều chỉnh nào, bạn phải ngừng truy cập hoặc sử dụng Nền tảng Goboki và Dịch vụ. Theo đó, vui lòng truy cập trang này nếu bạn muốn truy cập và xem phiên bản hiện tại của Chính sách bảo mật.</p>
                    <label>Thu thập thông tin</label>
                    <p>Chúng tôi có thể thu thập Thông tin cá nhân về bạn mà bạn cung cấp cho chúng tôi khi sử dụng Nền tảng Goboki và thông tin về việc bạn sử dụng Nền tảng Goboki như thế nào bao gồm khi bạn mở tài khoản người dùng cho bạn (gọi tắt là “Tài khoản người dùng”), truy cập Nền tảng Goboki hoặc đặt chỗ trước, thuê và/hoặc đặt cho bất kỳ Dịch vụ nào hoặc sử dụng Dịch vụ. Cung cấp thông tin cá nhân của bạn cho Goboki luôn trên cơ sở tự nguyện. Tuy nhiên, chúng tôi sẽ không thể cung cấp đến bạn một số dịch vụ nhất định nếu bạn chọn không cung cấp Thông tin cá nhân của bạn cho chúng tôi. Ví dụ: chúng tôi không thể mở tài khoản người dùng của bạn hoặc đặt vé, thuê và/hoặc đặt cho bạn nếu chúng tôi không có tên và chi tiết liên hệ của bạn.
                    Mở Tài khoản người dùng Khi bạn mở Tài khoản Người dùng hoặc sửa đổi bất kỳ thông tin nào trong Tài khoản Người dùng, chúng tôi có thể thu thập Thông tin cá nhân của bạn, chẳng hạn như tên, địa chỉ email, tên người dùng, mật khẩu và số điện thoại.
                    </p>
                    <label>Lưu trữ thông tin</label>
                    <p> Thông tin cá nhân và dữ liệu khác mà chúng tôi thu thập từ bạn có thể được chuyển đến, xử lý và lưu trữ trong các máy chủ của chúng tôi hoặc của các bên thứ ba cung cấp dịch vụ cho chúng tôi</p>
                    <p>Khi không còn cần thiết để chúng tôi xử lý Thông tin cá nhân của bạn, chúng tôi sẽ xóa hay ẩn danh dữ liệu hoặc, nếu không thể (ví dụ: vì thông tin cá nhân của bạn đã được lưu trữ trong kho lưu trữ dự phòng), thì chúng tôi sẽ bảo mật lưu trữ thông tin cá nhân của bạn.</p>
                    <p>Chúng tôi sẽ cố gắng ẩn danh hoặc tổng hợp dữ liệu của bạn nếu chúng tôi có ý định sử dụng nó cho mục đích phân tích hoặc phân tích xu hướng.
                    </p>
                    <p>Goboki sẽ sử dụng các nỗ lực hợp lý để duy trì các thủ tục vật lý, điện tử và tổ chức phù hợp để đảm bảo rằng Thông tin cá nhân và các dữ liệu khác của bạn được xử lý an toàn và phù hợp với Chính sách bảo mật này và để bảo vệ các dữ liệu như vậy khỏi việc truy cập trái phép hoặc việc thay đổi, tiết lộ hoặc hủy trái phép.
                    </p>
                    <p>Khi chúng tôi đã nhận được thông tin của bạn, chúng tôi sẽ sử dụng các thủ tục nghiêm ngặt và các tính năng bảo mật để cố gắng ngăn chặn việc truy cập trái phép. Goboki không đảm bảo hoặc cam kết rằng Thông tin cá nhân mà bạn cung cấp cho chúng tôi sẽ luôn được bảo mật tại mọi thời điểm và rằng trong phạm vi Goboki đã hoàn thành trách nhiệm của mình, Goboki sẽ, trong mọi trường hợp, không chịu trách nhiệm đối với bất kỳ tổn thất, thiệt hại và các chi phí mà bạn có thể gánh chịu phát sinh từ việc truy cập trái phép đến hoặc sử dụng Thông tin cá nhân của bạn.
                    </p>
                    <p>Tất cả các giao dịch thanh toán được thực hiện bởi chúng tôi hoặc nhà cung cấp dịch vụ xử lý thanh toán mà chúng tôi lựa chọn sẽ được mã hóa bằng công nghệ mã hóa trực tuyến. Bạn có trách nhiệm giữ bí mật mật khẩu mà bạn đã chọn và không chia sẻ mật khẩu của bạn với bất kỳ bên thứ ba nào.
                    </p>
                    <label>Sử dụng thông tin</label>
                    <p>Chúng tôi xử lý Thông tin cá nhân được thu thập trong chừng mực cần thiết để thực hiện hợp đồng và cung cấp dịch vụ cho bạn. Bên cạnh đó, chúng tôi xử lý Thông tin cá nhân khác được thu thập trên cơ sở lợi ích hợp pháp của chúng tôi, đó là cải tiến hơn nữa các dịch vụ và cho các mục đích tiếp thị trực tiếp. *Ví dụ, Goboki sẽ sử dụng Thông tin Cá nhân và các dữ liệu khác được thu thập thông qua Nền tảng Goboki hoặc khi mua Dịch vụ để tạo Tài khoản Người dùng của bạn, để hoàn tất các thông tin cần thiết để đặt chỗ trước, thuê và/hoặc đặt Dịch vụ, để cung cấp cho bạn Dịch vụ, để cải thiện Nền tảng Goboki và Dịch vụ và để liên hệ bạn đến các Dịch vụ liên quan. Các điều này bao gồm Thông tin cá nhân của bạn hoặc các dữ liệu khác để thực hiện các yêu cầu mua hàng nhanh hơn, hỗ trợ khách hàng tốt hơn và cung cấp cho bạn thông báo kịp thời về Dịch vụ mới và các ưu đãi đặc biệt. *Tại từng thời điểm, chúng tôi cũng có thể sử dụng Thông tin cá nhân của bạn để liên hệ với bạn về các phản hồi của bạn liên quan đến việc sử dụng Nền tảng Goboki, để hỗ trợ chúng tôi cải thiện Nền tảng Goboki hoặc để cung cấp các chương trình khuyến mại hoặc tiết kiệm đặc biệt đến bạn nếu bạn đã bày tỏ sự đồng thuận để nhận các thông tin liên lạc như vậy. Nếu bạn không muốn nhận thông báo về các chương trình khuyến mại hoặc tiết kiệm đặc biệt, bạn chỉ cần lựa chọn không nhận chúng bằng cách trả lời đến chúng tôi thông qua đường dẫn liên kết được cung cấp trong các thông báo đó.
                    </p>
                    <label>Tiết lộ thông tin</label>
                    <p>Chúng tôi, tại từng thời điểm, có thể chia sẻ và tiết lộ Thông tin cá nhân của bạn và các dữ liệu khác cho các bên thứ ba, một trong số đó có thể có trụ sở ngoài quốc gia của bạn. Việc chia sẻ và tiết lộ sẽ được thực hiện trong một số trường hợp bao gồm nhưng không giới hạn như sau:</p>
                    <ol>
                        <li>
                        Để hoàn tất việc đặt chỗ trước, thuê và/hoặc đặt dịch vụ của bạn hoặc thực hiện Điều khoản Sử dụng của chúng tôi. Chúng tôi có thể chia sẻ thông tin của bạn với Nhà điều hành hoặc bên thứ ba (bao gồm nhưng không giới hạn như điều hành tour, công ty tàu thuyền, công viên giải trí, nhà cung cấp mang viễn thông, khách sạn, công ty thuê xe, công ty bảo hiểm…) cả trong và ngoài quốc gia sở tại của bạn, những người cung cấp hoặc vận chuyển hàng hóa và dịch vụ hoặc hành động thay mặt chúng tôi.
                        </li>
                        <li>
                        Nếu bạn là một du khách, đến Nhà điều hành có liên quan đến Dịch vụ mà bạn đã đặt chỗ trước, thuê và/hoặc đặt hoặc dự định sẽ đặt chỗ.
                        </li>
                        <li>
                        Nếu bạn là một Nhà điều hành, đến bất kỳ du khách nào liên quan đến Dịch vụ mà bạn đang cung cấp.
                        </li>
                        <li>
                        Đến các nhà cung cấp dịch vụ của chúng tôi (bao gồm Google Analytics), các bên mà chúng tôi tương tác với nhau để thực hiện các dịch vụ nhất định thay mặt chúng tôi như dịch vụ lưu trữ web, phân tích dữ liệu, tiếp thị, nghiên cứu thị trường và cung cấp dịch vụ khách hàng đến bạn. 
                        </li>
                        <li>
                        Nếu và trong phạm vi yêu cầu của pháp luật hiện hành, lệnh của tòa án hoặc yêu cầu của bất kỳ cơ quan chính phủ nào để thực hiện việc tiết lộ như vậy.
                        </li>
                        <li>
                        Giữa các công ty thuộc tập đoàn Goboki. Trong trường hợp phát sinh một giao dịch liên quan đến việc bán, sáp nhập, mua lại công ty hoặc việc tái cơ cấu hoặc tái cấu trúc công ty khác, Thông tin cá nhân của bạn có thể được tiết lộ, chia sẻ hoặc chuyển giao cho tổ chức kiểm soát mới hoặc bên thứ ba được ủy quyền để thực hiện công việc kinh doanh của chúng tôi.
                        </li>
                        <li>
                        Đến các cố vấn, các đại lý hoặc các bên liên quan khác để bảo vệ quyền và tài sản của Goboki. 
                        </li>
                        <li>
                        Trong mọi trường hợp khác, đến bất kỳ bên thứ ba nào đã được sự đồng ý trước bằng văn bản của bạn (và trong trường hợp này, chúng tôi sẽ cho phép bạn rút lại sự đồng ý của mình một cách dễ dàng như khi cung cấp sự đồng ý).
                        </li>
                    </ol>
                    <p>Chúng tôi cũng có thể chia sẻ thông tin tổng hợp hoặc ẩn danh với các bên thứ ba có liên quan, bao gồm các nhà quảng cáo của chúng tôi. Các thông tin này không chứa bất kỳ Thông tin cá nhân nào và sẽ không nhận dạng cá nhân bạn. Tuy nhiên, trong một số trường hợp, các bên thứ ba này có thể sở hữu thông tin về bạn hoặc có được thông tin của bạn từ các nguồn khác. Khi họ kết hợp thông tin đó với thông tin tổng hợp của chúng tôi, họ có thể nhận dạng cá nhân bạn.
                    </p>
                    <p>Có thể có các liên kết hiển thị trên Nền tảng Goboki này khiến bạn rời khỏi Nền tảng Goboki và/hoặc được đưa đến các trang web của bên thứ ba khác. Bạn cần lưu ý rằng bất kỳ Thông tin cá nhân nào mà bạn cung cấp cho các trang web của bên thứ ba này đều không thuộc phạm vi điều chỉnh của Chính sách bảo mật này và Goboki không chịu trách nhiệm về bất kỳ tổn thất, thiệt hại, hoặc chi phí nào mà bạn có thể phải gánh chịu liên quan đến việc bạn cung cấp Thông tin cá nhân hoặc các dữ liệu khác cho các trang web của bên thứ ba đó.
                    </p>
                    <label>Quyền lợi của bạn</label>
                    <p>Bạn luôn có thể truy cập, sửa đổi hoặc xóa Thông tin cá nhân của bạn thông qua cổng người dùng tại Nền tảng Goboki trong mục “Tài khoản của tôi”. Ngoài ra, bạn có thể yêu cầu truy cập, sửa đổi hoặc xóa dữ liệu của bạn bằng cách gửi yêu cầu đến email goboki.cs@gmail.com.
                    </p>
                    <p>Trường hợp bắt buộc theo luật hiện hành, bạn cũng có thể đề nghị hạn chế trong việc xử lý Thông tin cá nhân của bạn hoặc từ chối xử lý bằng cách gửi yêu cầu hoặc phản đối của bạn đến email goboki.cs@gmail.com. Bạn cũng có thể yêu cầu một bản sao các thông tin về bạn mà chúng tôi lưu giữ bằng cách gửi yêu cầu của bạn đến email goboki.cs@gmail.com.
                    </p>
                    <p>Vui lòng liên hệ với chúng tôi thông qua thông tin liên lạc chi tiết được nêu dưới đây nếu bạn có bất kỳ khiếu nại nào liên quan đến việc xử lý Thông tin cá nhân của bạn.
                    </p>
                    <p>Khi thực hiện bất kỳ yêu cầu được miêu tả ở trên, chúng tôi có quyền kiểm tra danh tính của người yêu cầu để đảm bảo rằng họ là người có quyền thực hiện như vậy.
                    </p>
                    <label>Các thắc mắc</label>
                    <p>Nếu bạn có bất kỳ câu hỏi nào về Chính sách bảo mật này, vui lòng liên hệ với chúng tôi qua email goboki.cs@gmail.com.
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

export default connect(mapStateToProps, mapDispatchToProps)(PolicynPrivacy);
