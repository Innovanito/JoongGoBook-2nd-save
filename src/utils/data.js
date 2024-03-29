export const categories = [
  // {name: '공지사항'},
  {name: '중고 교재 살펴보기'},
  { name: '중고 교재 올리기' },
  { name: '나의 활동기록 보기' },
  { name: '중고거래 채팅'}
  // {name: '중고 교재 무료나눔'},
  // {name: '신고하기'},
]

export const userQuery = (userId) => {
  const query =`*[_type == "user" && _id == '${userId}']`

  return query
}

export const userQueryForMyAccount = (userId) => {
  const query =`*[_type == "accountInfo" && userId == '${userId}']`

  return query
}

export const userInfoQuery = (userId) => {
  const query =`*[_id == '${userId}' && _type == "user" || _type == "accountInfo"]`

  return query
}

export const userQueryForMyAccount2 = (userId) => {
  const query =`*[_type == "accountInfo" && _id == '${userId}']`

  return query
}


export const bringDefaultImage = () => {
  const query =`*[_type == "defaultImage" && title match 'userIcon'] {
    image {
      asset -> {
        url
      }
    }
  }`
  return query
}


export const searchQuery = (searchTerm) => {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    price,
    destination,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      _key,
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`
  return query
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
  image {
      asset -> {
        url
      }
    },
  _id,
  postedBy -> {
    _id,
    userName,
    image
  },
  title,
  price,
  save[] {
    _key,
    postedBy -> {
      _id,
      userName,
      image
    },
  },
}`

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    price,
    _id,
    title,
    about,
    category,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image,
        userNickname
      },
    },
    comments[]{
      comment,
      _key,
      postedBy-> {
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && userId == '${userId}'] | order(_createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    destination,
    price,
    title,
    postedBy -> {
      _id,
      userName,
      image
    },
    save[] {
      postedBy -> {
        _id,
        userName,
        image
      },
    },
  }`
  return query
}

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId] | order(createdAt desc) {
    image {
      asset -> {
        url
      }
    },
    _id,
    title,
    price,
    destination,
    postedBy ->{
      _id,
      userName,
      image
    },
    save[] {
      postedBy -> {
        _id,
        userName,
        image
      }
    }
  }`
  return query
}

export const allUserId = () => {
  const query = `*[_type == "accountInfo"]{
    userId
  }`
  return query
}


export const accountIdAndPw = (userId) => {
  const query = `*[_type == "accountInfo" && userId == '${userId}']{
    password,
    userNickname,
    userEmail,
    userName,
    _id
  }`;
  return query;
};

export const dmData = (dmId) => {
  const query =`*[_type == 'dm' && _id == '${dmId}']{
    chat
  }`
  return query
}


export const dm_idData = () => {
  const query =`*[_type == 'dm']{
    _id
  }`
  return query
}

export const sidebarComponents = (user_id) => {
  const query = `*[_type == 'dm' &&  seller == '${user_id}' || buyer == '${user_id}']{
    _id
  }`
  return query
}

export const buyerData = (dmId) => {
  const query = `*[_type == 'dm' && _id == '${dmId}']{
    buyer
  }`
  return query
}


//260개 정도 목록이 있음
export const univList = [
  '없음',
  '가야대학교',
  '가천대학교',
  '가톨릭관동대학교',
  '가톨릭대학교',
  '감리교신학대학교',
  '강남대학교',
  '강릉원주대학교',
  '강원대학교',
  '건국대학교',
  '건국대학교 글로컬캠퍼스',
  '건양대학교',
  '경기대학교',
  '경남대학교',
  '경동대학교',
  '경북대학교',

  '경상국립대학교',
  '경성대학교',
  '경운대학교',
  '경인교육대학교',
  '경일대학교',
  '경주대학교',
  '경찰대학',
  '경희대학교',
  '계명대학교',
  '고려대학교',
  '고려대학교 세종캠퍼스',
  '고신대학교',
  '공군사관학교',
  '공주대학교',
  '공주교육대학교',
  '광신대학교',
  '광운대학교',
  '광주대학교',
  '광주가톨릭대학교',
  '광주과학기술원',
  '광주교육대학교',
  '광주여자대학교',
  '국군간호사관학교',
  '국민대학교',
  '군산대학교',
  '극동대학교',
  '금강대학교',
  '금오공과대학교',
  '김천대학교',
  '꽃동네대학교',

  '나사렛대학교',
  '남부대학교',
  '남서울대학교',

  '단국대학교',
  '대구대학교',
  '대구가톨릭대학교',
  '대구경북과학기술원',
  '대구교육대학교',
  '대구예술대학교',
  '대구한의대학교',
  '대신대학교',
  '대전대학교',
  '대전가톨릭대학교',
  '대전신학대학교',
  '대진대학교',
  '덕성여자대학교',
  '동국대학교',
  '동국대학교 경주캠퍼스',
  '동덕여자대학교',
  '동명대학교',
  '동서대학교',
  '동서울대학교',
  '동신대학교',
  '동아대학교',
  '동양대학교',
  '동의대학교',

  '루터대학교',

  '명지대학교',
  '목원대학교',
  '목포대학교',
  "목포가톨릭대학교",
  '목포해양대학교',


  '배재대학교',
  '백석대학교',
  '부경대학교',
  '부산대학교',
  '부산가톨릭대학교',
  '부산교육대학교',
  '부산외국어대학교',
  '부산장신대학교',


  '서울대학교',
  '삼육대학교',
  '상명대학교',
  '상지대학교',
  '서강대학교',
  '서경대학교',
  '서울과학기술대학교',
  '서울교육대학교',
  '서울기독대학교',
  '서울시립대학교',
  '서울신학대학교',
  '서울여자대학교',
  '서울장신대학교',
  '서울한영대학교',
  '서원대학교',
  '선문대학교',
  '성결대학교',
  '성공회대학교',
  '성균관대학교',
  '성신여자대학교',
  '세명대학교',
  '세종대학교',
  '세한대학교',
  '송원대학교',
  '수원대학교',
  '수원가톨릭대학교',
  '숙명여자대학교',
  '순천대학교',
  '순천향대학교',
  '숭실대학교',
  '신경대학교',
  '신라대학교',
  '신한대학교',
  '서일대학교',


  '아신대학교',
  '아주대학교',
  '안동대학교',
  '안양대학교',
  '연세대학교 미래캠퍼스',
  '연세대학교',
  '영남대학교',
  '영남신학대학교',
  '영산대학교',
  '영산선학대학교',
  '예수대학교',
  '예원예술대학교',
  '용인대학교',
  '우석대학교',
  '우송대학교',
  '울산대학교',
  '울산과학기술원',
  '원광대학교',
  '위덕대학교',
  '유원대학교',
  '육군사관학교',
  '을지대학교',
  '이화여자대학교',
  '인제대학교',
  '인천대학교',
  '인천가톨릭대학교',
  '인하대학교',


  '장로회신학대학교',
  '전남대학교',
  '전북대학교',
  '전주대학교',
  '전주교육대학교',
  '제주대학교',
  '제주국제대학교',
  '조선대학교',
  '중부대학교',
  '중앙대학교',
  '중앙승가대학교',
  '중원대학교',
  '진주교육대학교',

  '차의과학대학교',
  '창신대학교',
  '창원대학교',
  '청운대학교',
  '청주교육대학교',
  '청주대학교',
  '초당대학교',
  '총신대학교',
  '추계예술대학교',
  '춘천교육대학교',
  '충남대학교',
  '충북대학교',
  '침례신학대학교',


  '칼빈대학교',
  '케이씨대학교',


  '평택대학교',
  '포항공과대학교',

  '한경대학교',
  '한국과학기술원',
  '한국교원대학교',
  '한국교통대학교',
  '한국국제대학교',
  '한국기술교육대학교',
  '한국방송통신대학교',
  '한국산업기술대학교',
  '한국성서대학교',
  '한국예술종합학교',
  '한국외국어대학교',
  '한국전통문화대학교',
  '한국체육대학교',
  '한국항공대학교',
  '한국해양대학교',
  '한남대학교',
  '한동대학교',
  '한라대학교',
  '한려대학교',
  '한림대학교',
  '한밭대학교',
  '한서대학교',
  '한성대학교',
  '한세대학교',
  '한신대학교',
  '한양대학교',
  '한양대학교 ERICA캠퍼스',
  '한일장신대학교',
  '해군사관학교',
  '협성대학교',
  '호남대학교',
  '호남신학대학교',
  '호서대학교',
  '호원대학교',
  '홍익대학교',
]

// 사용 안하는 함수들

  // const addComment = () => {
  //   if (comment) {
  //     setAddingComment(true)

  //     client
  //       .patch(pinId)
  //       .setIfMissing({ comments: []})
  //       .insert('after', 'comments[-1]', [{
  //         comment,
  //         _key: uuidv4(),
  //         postedBy: {
  //           _type: 'postedBy',
  //           _ref: user._id
  //         }
  //       }])
  //       .commit()
  //       .then(() => {
  //         fetchPinDetails()
  //         setComment('')
  //         setAddingComment(false)
  //       })
  //   }
  // }