import { Category } from '@/types/category';

export const categories: Category[] = [
  {
    id: 2,
    title: '구글기프트카드',
    slug: '구글기프트카드',
    description:
      '* 한국 구글플레이스토어의 게임과 상품만 구매할 수 있습니다.\n* 지메일 계정의 국가 설정을 대한민국으로 해야 충전 및 결제할 수 있습니다.\n* 일일 충전한도는 50만원입니다.\n* **구글코리아는 국내법을 따르지 않고 취소/환불을 지원하지 않아 계정 오류 발생 등 어떤 경우에도 환불 처리되지 않습니다.**\n* ** 현재 등록할 수 없는 카드라는 오류 또는 사용 후 게임 내 아이템 충전 시 구글에서 추가 정보를 요구하는 경우가 발생해도 절대 환불 처리가 안 됩니다.**\n* **구글은 이의제기를 해도 거절되면 그 이유를 알려주지도 않고 계속 거절하기 때문에 어떠한 대응도 안 됩니다.**',
    description1:
      '* 구글기프트카드\n* 발행회사: 구글 코리아\n* 홈페이지: [https://play.google.com/store](https://play.google.com/store)\n* 고객센터: 080-234-0051\n* 상품권 번호 형식: 알파벳/숫자 20자리 또는 알파벳/숫자 16자리\n    * ##### `1ABC-2DEF-3GHJ-4KLM-5NOP`\n    * ##### `1ABC-2DEF-3GHJ-4KLM`',
    discountRate: 4.0,
    pg: true,
    pgDiscountRate: 1.0,
    naverSearchTag:
      '구글기프트코드|온라인|구매|할인|코드|구글플레이스토어|핀번호|구글플레이',
    naverBrandName: '구글플레이',
    naverMakerName: 'Google Payment Korea Limited',
    imageUrl: '/categories/google.jpg',
  },
  {
    id: 3,
    title: '넥슨카드',
    slug: '넥슨카드',
    description:
      '* 넥슨 게임에서 만 18세 이상 성인 주민등록번호 계정 당 **월 50만원 한도**입니다. 매월 1일 초기화 됩니다.\n* 월 50만원 한도에서 넥슨카드로는 월 15만원까지 충전 가능합니다.\n* 상기 규정은 넥슨 본사 정책에 의해 상시 변경될 수 있습니다.',
    description1:
      '* 넥슨카드\n* 발행회사: (주)넥슨코리아\n* 홈페이지: [http://nexon.com/](http://nexon.com/)\n* 고객센터: 1588-7701\n* 상품권 번호 형식: 알파벳 20자리\n    * ##### `ABCDE-FGHJK-LMNOP-QRSTU`',
    discountRate: 5.0,
    pg: true,
    pgDiscountRate: 2.0,
    naverSearchTag:
      '넥슨캐시|넥슨핀|핀번호|온라인상품권|던파|메이플|피파온라인|서든어택',
    naverBrandName: '넥슨카드',
    naverMakerName: '(주)넥슨코리아',
    imageUrl: '/categories/nexon.png',
  },
  {
    id: 8,
    title: '컬쳐랜드상품권',
    slug: '컬쳐랜드상품권',
    description:
      '* 컬쳐랜드상품권은 **16자리**입니다.\n* 컬쳐랜드상품권(모바일문화상품권)은 반드시 **컬쳐랜드**에서 계정이 있어야 사용할 수 있습니다.\n* 컬쳐랜드상품권(모바일문화상품권)은 해피머니 또는 북앤라이프 사이트에서 사용할 수 없습니다.',
    description1:
      '* 컬쳐랜드상품권\n* 발행회사: (주)한국문화진흥\n* 홈페이지: [http://cultureland.co.kr/](http://cultureland.co.kr/)\n* 고객센터: 1577-2111\n* 상품권 번호 형식: 숫자 16자리\n    * ##### `1234-5678-1234-5678`',
    discountRate: 5.0,
    pg: true,
    pgDiscountRate: 1.0,
    naverSearchTag: '컬쳐랜드|문상|구글환전|지마켓|G마켓|스마일페이',
    naverBrandName: '컬쳐랜드상품권-컬쳐캐시',
    naverMakerName: '(주)한국문화진흥',
    imageUrl: '/categories/cultureland.jpg',
  },
  {
    id: 7,
    title: '도서문화상품권',
    slug: '도서문화상품권',
    description:
      '* 도서문화상품권은 컬쳐랜드가 아닌 **북앤라이프** 사이트에서 사용 가능합니다.\n* 반드시 북앤라이프 계정이 있어야 충전 및 사용할 수 있습니다.\n* 도서문화상품권은 **넥슨**에서 월간 최대15만원까지 사용할 수 있습니다.',
    description1:
      '* 도서문화상품권\n* 발행회사: (주)티알엔\n* 홈페이지: [https://www.booknlife.com/](https://www.booknlife.com/)\n* 고객센터: 1544-5111\n* 상품권 번호 형식: 숫자 16자리 + 비밀번호 숫자 4자리\n    * ##### `1234-5678-1234-5678 및 1234`',
    discountRate: 6.0,
    pg: true,
    pgDiscountRate: 1.0,
    naverSearchTag: '북앤라이프|도서문화|도서문상|넥슨충전|넥슨캐시',
    naverBrandName: '도서문화상품권',
    naverMakerName: '(주)티알엔',
    imageUrl: '/categories/booknlife.png',
  },
  {
    id: 27,
    title: '문화상품권',
    slug: '문화상품권',
    description:
      '* 문화상품권은 **18자리**입니다.\n* 문화상품권은 반드시 **컬쳐랜드**, **해피머니**, 또는 **북앤라이프** 사이트에서 사용할 수 없습니다.',
    description1:
      '* 문화상품권\n* 발행회사: (주)문화상품권\n* 홈페이지: [http://culturegift.co.kr/](http://culturegift.co.kr/)\n* 고객센터: 1577-3111\n* 상품권 번호 형식: 숫자 18자리\n    * ##### `1234-5678-1234-567890`',
    discountRate: 5.0,
    pg: true,
    pgDiscountRate: 1.0,
    naverSearchTag: '컬쳐랜드|문상|구글환전|지마켓|G마켓|스마일페이',
    naverBrandName: '문화상품권',
    naverMakerName: '(주)문화상품권',
    imageUrl: '/categories/culturegift.jpg',
  },
  {
    id: 22,
    title: '아프리카별풍선',
    slug: '아프리카tv',
    description:
      '* 아프리카TV BJ 후원을 위한 **한도 없는** 별풍선 교환권입니다.\n* 아프리카TV 별풍선은 문화상품권, 해피머니, 도서문화상품권으로 각각 월 300만원까지 구매 가능합니다.\n* 핀코인은 상품권 판매 쇼핑몰이므로 대리결제는 지원하지 않습니다.',
    description1:
      '* 무제한 별풍선 교환권\n* 발행회사: (주)아프리카TV\n* 홈페이지: [http://afreecatv.com/](http://afreecatv.com/)\n* 고객센터: 1688-7022\n* 상품권 번호 형식: 알파벳10자리/숫자 6자리 + 비밀번호 숫자 6자리\n    * ##### `ABCDEFGHJK123456 및 123456`',
    discountRate: 5.0,
    pg: true,
    pgDiscountRate: 1.0,
    naverSearchTag:
      '아프리카|아프리카TV|개인방송|BJ|유튜버|별풍선|별풍|별풍선상품권',
    naverBrandName: '별풍선상품권',
    naverMakerName: '아프리카TV',
    imageUrl: '/categories/afreecatv.png',
  },
  {
    id: 10,
    title: '에그머니',
    slug: '에그머니',
    description:
      '* 에그머니 10만원권은 **5만원권 선택 후 같은 번호로 2회 충전**하시기 바랍니다.\n* 에그머니는 게임 **엠게임**, **다크에덴** 등에서 사용할 수 있습니다.\n* 에그머니는 **거상**,  **로스트아크**, **넥슨** 게임에서 사용할 수 없습니다.',
    description1:
      '* 에그머니\n* 발행회사: (주)한국선불카드\n* 홈페이지: [https://www.eggmoney.kr/](https://www.eggmoney.kr/)\n* 고객센터: 1588-3206\n* 상품권 번호 형식: 숫자 20자리\n    * ##### `12345-67890-12345-67890`',
    discountRate: 9.0,
    pg: true,
    pgDiscountRate: 6.0,
    naverSearchTag: '엠게임|거상|로아|로스트아크|다크에덴|온라인상품권|핀번호',
    naverBrandName: '에그머니',
    naverMakerName: '(주)한국선불카드',
    imageUrl: '/categories/eggmoney.png',
  },
  {
    id: 14,
    title: '틴캐시',
    slug: '틴캐시',
    description:
      '* 틴캐시는 **리그오브레전드**, **아프리카별풍선구매**,에서 사용할 수 있습니다.\n* 틴캐시는 **넥슨** 게임, **로스트아크**에서 사용할 수 없습니다.',
    description1:
      '* 틴캐시\n* 발행회사: (주)플레이통\n* 홈페이지: [https://www.teencash.co.kr/](https://www.teencash.co.kr/)\n* 고객센터: 1666-3009\n* 상품권 번호 형식: 알파벳/숫자 12자리\n    * ##### `1ABC-2DEF-3GHJ`',
    discountRate: 7.0,
    pg: true,
    pgDiscountRate: 3.0,
    naverSearchTag: '틴캐쉬|리그오브레전드|롤|LOL|로스트아크|로아|구글환전',
    naverBrandName: '틴캐시',
    naverMakerName: '(주)플레이통',
    imageUrl: '/categories/teencash.png',
  },
  {
    id: 6,
    title: '스마트문화상품권',
    slug: '스마트문화상품권',
    description:
      '* 스마트문화상품권과 문화상품권은 모두 컬쳐랜드에서 발행하지만 서로 다른 상품권입니다.\n* 스마트문화상품권은 **리그오브레전드**에서 사용할 수 있습니다.\n* 스마트문화상품권은 넥슨, 로스트아크에서 사용할 수 없습니다.',
    description1:
      '* 스마트문화상품권\n* 발행회사: (주)한국문화진흥\n* 홈페이지: [http://cultureland.co.kr/](http://cultureland.co.kr/)\n* 고객센터: 1577-2111\n* 상품권 번호 형식: 숫자 18자리\n    * ##### `1234-5678-1234-567890`',
    discountRate: 6.0,
    pg: true,
    pgDiscountRate: 1.0,
    naverSearchTag: '리그오브레전드|롤|LOL|스마트문상|게임문상|게임문화상품권',
    naverBrandName: '스마트문화상품권',
    naverMakerName: '(주)한국문화진흥',
    imageUrl: '/categories/smart.png',
  },
  {
    id: 24,
    title: '플레이스테이션',
    slug: '플레이스테이션-기프트카드-교환권',
    description:
      '* PS Store(PlayStation™Store) 또는 https://www.playstation.com/ko-kr 에서 코드를 입력하여 사용하세요.',
    description1:
      '* 플레이스테이션 모바일 금액권 (페이즈 디지털 상품권)\n* 발행회사: (주)한국페이즈서비스\n* 홈페이지: [https://www.playstation.com/ko-kr)\n* 고객센터: 1644-5368\n* 상품권 번호 형식: 알파벳/숫자 12자리\n    * ##### `ABCD1234ABCD`',
    discountRate: 7.0,
    pg: false,
    pgDiscountRate: 2.0,
    naverSearchTag: '플레이스테이션,기프트카드,교환권,페이즈',
    naverBrandName: '플레이스테이션교환권',
    naverMakerName: '(주)한국페이즈서비스',
    imageUrl: '/categories/playstation.jpg',
  },
  {
    id: 26,
    title: '요기요',
    slug: '요기요',
    description:
      '- 요기요 상품권은 **개인 간 거래를 통해 재판매 되는 상품권입니다.**\n- 요기요 상품권은 요기요 회원의 경우에만 사용 가능합니다.\n- 요기요 상품권은 분할 사용이 가능한 잔액관리 상품권입니다.\n- **요기요 상품은 프로모션 상품으로 현금반환 및 기간연장이 일체 불가합니다.**',
    description1:
      '* 요기요 상품권\n* 발행회사: (주)위대한상상\n* 홈페이지: [https://www.yogiyo.co.kr](https://www.yogiyo.co.kr)\n* 고객센터: 1661-5270\n* 상품권 번호 형식: 대문자, 숫자 14자리\n    * ##### `12345ABCDE1234`',
    discountRate: 5.0,
    pg: true,
    pgDiscountRate: 0.0,
    naverSearchTag: '요기요',
    naverBrandName: '요기요상품권',
    naverMakerName: '(주)위대한상상',
    imageUrl: '/categories/yogiyo.png',
  },
  {
    id: 28,
    title: '스타벅스',
    slug: '스타벅스',
    description:
      '** 경품, 직원선물 등 대량구매는 고객센터로 문의해주세요.**\n\n1. 스타벅스 앱 다운로드 및 회원가입 후 로그인\n1. Pay 클릭 후 오른쪽 상단 三 모양 클릭 후 + 클릭\n1. **스타벅스 카드** 클릭 후 교환권번호 입력하기 (카드 교환권이 아님)\n1. 등록완료',
    description1:
      '** 경품, 직원선물 등 대량구매는 고객센터로 문의해주세요.**\n\n* 스타벅스 상품권\n* 발행회사: SSG\n* 고객센터: 1644-1133',
    discountRate: 5.0,
    pg: true,
    pgDiscountRate: 1.0,
    naverSearchTag: '스타벅스',
    naverBrandName: '스타벅스 상품권',
    naverMakerName: 'SSG',
    imageUrl: '/categories/starbucks.jpg',
  },
  {
    id: 17,
    title: '와우캐시',
    slug: '와우캐시',
    description:
      '* 와우캐시는 정액권 결제하실 때 필요합니다.  **편의점캐시**를 선택하시고 상품권 번호를 입력하여 사용바랍니다.\n* **블리자드 배틀코인** 결제를 원하는 경우에는 **문화상품권**을 구입하시기 바랍니다.',
    description1:
      '* 와우캐시\n* 발행회사: 블리자드 엔터테인먼트 유한회사\n* 홈페이지: [https://www.blizzard.com/ko-kr/](https://www.blizzard.com/ko-kr/)\n* 고객센터: 1644-0727\n* 상품권 번호 형식: 알파벳 1자리 + 숫자 11자리\n    * #####  `A123-4567-1234`',
    discountRate: 2.15,
    pg: true,
    pgDiscountRate: 0.0,
    naverSearchTag: '와우|오버워치|월드오브크래프트',
    naverBrandName: '와우캐시',
    naverMakerName: '블리자드 엔터테인먼트 유한회사',
    imageUrl: '/categories/wow.png',
  },
  {
    id: 16,
    title: 'N코인',
    slug: '엔코인',
    description:
      '*  결제창에서 **편의점결제** 선택하시고 상품권 번호 입력하여 사용바랍니다.',
    description1:
      '* N코인 (편의점캐시)\n* 발행회사: (주)엔씨소프트\n* 홈페이지: [http://nshop.plaync.com/nshop/](http://nshop.plaync.com/nshop/)\n* 고객센터: 1600-0020\n* 상품권 번호 형식: 알파벳 1자리 + 숫자 11자리\n    * ##### `A123-4567-1234`',
    discountRate: 2.0,
    pg: true,
    pgDiscountRate: 0.0,
    naverSearchTag: '리니지|블레이드앤소울|엔씨소프트',
    naverBrandName: 'N코인',
    naverMakerName: '(주)엔씨소프트',
    imageUrl: '/categories/ncoin.png',
  },
  {
    id: 4,
    title: '퍼니카드',
    slug: '퍼니카드',
    description:
      '* 퍼니카드는 **한게임, 피망, 넷마블, 엠게임** 등에서 사용할 수 있습니다.\n* 퍼니카드는 넥슨에서 사용할 수 없습니다.',
    description1:
      '* 퍼니카드\n* 발행회사: (주)KG모빌리언스\n* 홈페이지: [https://www.funny-card.co.kr/](https://www.funny-card.co.kr/)\n* 고객센터: 1600-0523\n* 상품권 번호 형식: 알파벳/숫자 16자리\n    * ##### `1ABC-2DEF-3GHJ-4KLM`',
    discountRate: 4.0,
    pg: true,
    pgDiscountRate: 0.0,
    naverSearchTag: '한게임|피망|넷마블|엠게임|온라인상품권',
    naverBrandName: '퍼니카드',
    naverMakerName: '(주)KG모빌리언스',
    imageUrl: '/categories/funnycard.png',
  },
  {
    id: 19,
    title: '아이템베이선불쿠폰',
    slug: '아이템베이선불쿠폰',
    description:
      '* **충전 시 수수료가 발생**하는 상품권입니다. 반드시 미리 확인 후 구매하시기 바랍니다.',
    description1:
      '* 아이템베이선불쿠폰\n* 발행회사: (주)아이템베이\n* 홈페이지: [http://www.itembay.com/](http://www.itembay.com/)\n* 고객센터: 1644-3333\n* 상품권 번호 형식: 알파벳/숫자 12자리\n    * ##### `1ABC-2DEF-3GHJ`',
    discountRate: 2.0,
    pg: false,
    pgDiscountRate: 0.0,
    naverSearchTag: '아이템거래|아이템베이',
    naverBrandName: '아이템베이선불쿠폰',
    naverMakerName: '(주)아이템베이',
    imageUrl: '/categories/itembay.png',
  },
  {
    id: 18,
    title: '매니아선불쿠폰',
    slug: '매니아선불쿠폰',
    description:
      '* **충전 시 수수료가 발생**하는 상품권입니다. 반드시 미리 확인 후 구매하시기 바랍니다.',
    description1:
      '* 매니아선불쿠폰\n* 발행회사: (주)아이엠아이\n* 홈페이지: [http://www.itemmania.com/](http://www.itemmania.com/)\n* 고객센터: 1544-8278\n* 상품권 번호 형식: 알파벳/숫자 12자리\n    * ##### `ABCD-EFGH-A123`',
    discountRate: 2.0,
    pg: false,
    pgDiscountRate: 0.0,
    naverSearchTag: '아이템거래|아이템매니아',
    naverBrandName: '매니아선불쿠폰',
    naverMakerName: '(주)아이엠아이',
    imageUrl: '/categories/itemmania.png',
  },
];
