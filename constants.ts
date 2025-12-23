
import { SurveyPoint, CongressSession, Stats, CrisisItem } from './types';

export const INITIAL_STATS: Stats = {
  economy: 20,
  people: 30,
  stability: 40
};

export const SURVEY_POINTS: SurveyPoint[] = [
  {
    id: 'hanoi',
    name: 'Hà Nội',
    title: 'Thủ đô khó khăn',
    icon: '🏛️',
    description: [
      'Hàng người xếp hàng dài bên ngoài cửa hàng mậu dịch quốc doanh.',
      'Người dân: "Thưa đại biểu, tôi đứng đây từ sáng sớm mà vẫn chưa đến lượt mua. Tem phiếu thì có, nhưng hàng hóa đâu mà mua chứ?"',
      'Người dân: "Lương công chức thì chẳng đủ sống, mỗi lần ra chợ là giá lại tăng vùn vụt. Đồng tiền mất giá kinh khủng quá!"'
    ],
    keywords: ['LẠM PHÁT', 'KHAN HIẾM HÀNG HÓA'],
    options: [
      { 
        label: '(A) Ghi nhận tình hình thiếu lương thực, lạm phát.', 
        collects: true, 
        feedback: 'Đã ghi nhận LẠM PHÁT và KHAN HIẾM HÀNG HÓA vào Sổ tay Đại biểu.' 
      },
      { 
        label: '(B) Động viên người dân cố gắng, tin tưởng vào Đảng.', 
        collects: false, 
        feedback: 'Người dân nhìn bạn với ánh mắt thất vọng.' 
      }
    ]
  },
  {
    id: 'hcmc',
    name: 'TP. Hồ Chí Minh',
    title: 'Nhà máy đình trệ',
    icon: '🏭',
    description: [
      'Nhà máy cũ kỹ, ống khói không bốc khói, máy móc hoen gỉ, công nhân ngồi rải rác chán nản.',
      'Quản đốc: "Thưa đại biểu, nhà máy đứng trước nguy cơ phá sản. Kế hoạch nhà nước giao khoán quá nặng, vật tư thiếu thốn."',
      'Quản đốc: "Cơ chế bao cấp này bó buộc quá! Có năng lực cũng chẳng thể phát huy được."'
    ],
    keywords: ['BAO CẤP', 'QUAN LIÊU', 'ĐÌNH ĐỐN SẢN XUẤT'],
    options: [
      { 
        label: '(A) Ghi nhận thực trạng quan liêu, bao cấp trong sản xuất.', 
        collects: true, 
        feedback: 'Đã ghi nhận BAO CẤP, QUAN LIÊU và ĐÌNH ĐỐN SẢN XUẤT vào Sổ tay Đại biểu.' 
      },
      { 
        label: '(B) Nhắc nhở quản đốc và công nhân phát huy tinh tinh thần tự lực.', 
        collects: false, 
        feedback: 'Quản đốc thở dài ngao ngán.' 
      }
    ]
  },
  {
    id: 'rural',
    name: 'Nông thôn',
    title: 'Đồng bằng sông Hồng',
    icon: '🌾',
    description: [
      'Cánh đồng lúa mênh mông nhưng lác đác người làm việc mệt mỏi. Làng quê nghèo nàn.',
      'Nông dân: "Ruộng đất là của chung, làm nhiều cũng chẳng được hưởng bao nhiêu. Thóc lúa nộp khoán đủ, còn lại bán giá thấp lè tè."',
      'Nông dân: "Muốn chăn nuôi thêm vài con gà cũng bị coi là kinh tế tư nhân, sợ bị đánh tư sản. Khó khăn lắm!"'
    ],
    keywords: ['HỢP TÁC XÃ', 'CƠ CHẾ KHOÁN', 'TƯ NHÂN BỊ HẠN CHẾ'],
    options: [
      { 
        label: '(A) Ghi nhận vấn đề về hợp tác xã, cơ chế khoán sản phẩm.', 
        collects: true, 
        feedback: 'Đã ghi nhận HỢP TÁC XÃ, CƠ CHẾ KHOÁN và TƯ NHÂN BỊ HẠN CHẾ vào Sổ tay Đại biểu.' 
      },
      { 
        label: '(B) Khuyên người dân an tâm lao động theo định hướng hợp tác xã.', 
        collects: false, 
        feedback: 'Người nông dân lầm lũi quay đi.' 
      }
    ]
  }
];

export const CONGRESS_SESSIONS: CongressSession[] = [
  {
    id: 1,
    title: 'Phiên 1: Kinh tế và Cơ chế Quản lý',
    intro: 'Trong phiên thảo luận về Kinh tế, một số đại biểu vẫn đề xuất giữ vững mô hình kinh tế kế hoạch hóa tập trung. Tuy nhiên, nhiều ý kiến khác chỉ ra sự trì trệ của cơ chế này.',
    question: 'Trước tình hình sản xuất đình đốn và lạm phát nghiêm trọng, quan điểm nào sau đây phù hợp nhất?',
    options: [
      {
        label: 'Tiếp tục củng cố kinh tế quốc doanh và tập thể, hạn chế kinh tế tư nhân để giữ vững định hướng XHCN.',
        impact: { economy: -5, people: -10, stability: -5 },
        feedback: 'Nền kinh tế vẫn sẽ tiếp tục trì trệ.',
        resolutionText: 'Củng cố và hoàn thiện cơ chế tập trung bao cấp hiện hành, ưu tiên kinh tế quốc doanh.',
        isInnovation: false
      },
      {
        label: 'Phát triển kinh tế nhiều thành phần, bao gồm kinh tế tư nhân, coi đó là động lực quan trọng.',
        impact: { economy: 10, people: 10, stability: 5 },
        feedback: 'Hứa hẹn tạo động lực mới cho sản xuất.',
        resolutionText: 'Phát triển kinh tế hàng hóa nhiều thành phần, vận dụng cơ chế thị trường dưới sự quản lý của nhà nước.',
        isInnovation: true
      },
      {
        label: 'Cải cách nhỏ lẻ trong từng đơn vị sản xuất, nhưng không thay đổi cơ chế quản lý vĩ mô.',
        impact: { economy: 0, people: -5, stability: 0 },
        feedback: 'Hiệu quả không rõ ràng, chưa giải quyết được gốc rễ vấn đề.',
        resolutionText: 'Thực hiện những cải tiến nhỏ lẻ trong quản lý sản xuất nhưng giữ nguyên cơ chế bao cấp.',
        isInnovation: false
      }
    ]
  },
  {
    id: 2,
    title: 'Phiên 2: Nông nghiệp và Quan hệ Sản xuất',
    intro: 'Vấn đề lương thực luôn là nỗi lo hàng đầu của nhân dân. Các hợp tác xã nông nghiệp không mang lại hiệu quả như mong muốn.',
    question: 'Để giải quyết vấn đề lương thực và tạo động lực cho nông dân, đâu là giải pháp căn cơ nhất?',
    options: [
      {
        label: 'Giữ vững mô hình hợp tác xã, tăng cường tuyên truyền, giáo dục để nông dân hiểu rõ vai trò tập thể.',
        impact: { economy: -5, people: -10, stability: -5 },
        feedback: 'Lương thực vẫn sẽ là vấn đề nhức nhối.',
        resolutionText: 'Duy trì mô hình hợp tác xã tập trung, tăng cường giáo dục chính trị cho nông dân.',
        isInnovation: false
      },
      {
        label: 'Thừa nhận quyền làm chủ của nông dân, thực hiện khoán sản phẩm đến người lao động, khuyến khích kinh tế hộ.',
        impact: { economy: 10, people: 10, stability: 5 },
        feedback: 'Kích thích sản xuất nông nghiệp, đảm bảo an ninh lương thực.',
        resolutionText: 'Thừa nhận quyền làm chủ của nông dân trên đất đai, thực hiện khoán sản phẩm đến người lao động (Khoán 10).',
        isInnovation: true
      },
      {
        label: 'Mở rộng diện tích đất nông nghiệp do nhà nước quản lý, tăng đầu tư cho các nông trường quốc doanh.',
        impact: { economy: -2, people: 0, stability: 0 },
        feedback: 'Chi phí lớn nhưng chưa giải quyết được động lực cho người nông dân.',
        resolutionText: 'Mở rộng quy mô nông trường quốc doanh, tập trung đầu tư công nghệ hiện đại.',
        isInnovation: false
      }
    ]
  },
  {
    id: 3,
    title: 'Phiên 3: Công cuộc xây dựng Đảng và Cán bộ',
    intro: 'Nhiều đại biểu thẳng thắn phê phán tình trạng quan liêu, tham nhũng, xa rời quần chúng trong một bộ phận cán bộ Đảng viên.',
    question: 'Để khôi phục niềm tin của nhân dân và nâng cao năng lực lãnh đạo, giải pháp nào là quan trọng nhất?',
    options: [
      {
        label: 'Tăng cường kỷ luật nội bộ Đảng, nhưng tránh phê phán công khai để giữ gìn uy tín.',
        impact: { economy: -5, people: -10, stability: -5 },
        feedback: 'Niềm tin của nhân dân vào Đảng sẽ tiếp tục giảm sút.',
        resolutionText: 'Kỷ luật nội bộ nghiêm ngặt nhưng hạn chế công khai khuyết điểm để bảo vệ uy tín Đảng.',
        isInnovation: false
      },
      {
        label: 'Thực hiện tự phê bình và phê bình một cách thẳng thắn, công khai, nhìn thẳng vào sự thật.',
        impact: { economy: 5, people: 10, stability: 5 },
        feedback: 'Khôi phục niềm tin, tạo sự đồng thuận trong xã hội.',
        resolutionText: 'Thực hiện tự phê bình và phê bình thẳng thắn, công khai, nhìn thẳng vào sự thật, đánh giá đúng sự thật.',
        isInnovation: true
      },
      {
        label: 'Tập trung vào việc thay thế các cán bộ yếu kém bằng các cán bộ trẻ, năng động hơn.',
        impact: { economy: -2, people: -5, stability: 0 },
        feedback: 'Chưa giải quyết được vấn đề gốc rễ của quan liêu, tham nhũng.',
        resolutionText: 'Ưu tiên thay thế nhân sự trẻ tuổi nhưng không thay đổi căn bản lề lối làm việc.',
        isInnovation: false
      }
    ]
  }
];

export const CRISIS_ITEMS: CrisisItem[] = []; // Not used in this version but kept for type safety if needed
