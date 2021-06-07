# woowahan-frontend

* [참고사항] woowahan-board-service -> woowahan-admin-service -> woowahan-frontend
  -> (테스트 후 데이터 생성) -> woowahan-batch-service 순으로 각 서비스의 README.md 읽고 실행 시
  번거로움 없이 진행 가능합니다.

본 프로젝트는 woowahan board 서비스의 프론트엔드를 제공합니다.
<br/>

<프로젝트 실행 방법><br/>
해당 프로젝트는 React + TypeScript + Material UI 기반 프로젝트입니다. 로컬 PC에 yarn, node.js 설치가 선행 되어야합니다.

1. 본 서비스를 실행 시키기 전 woowahan-board-service 와 woowahan-admin-service 를 실행해야합니다.
2. yarn install 를 실행합니다.
3. yarn run build 를 실행합니다.
4. cd server
5. yarn run start 를 실행합니다.
* ADMIN 계정은 id: admin, password: 1234 입니다.
* 빠른 테스트를 위하여 아래 script 에 {개인이메일}과 {이름}을 채워 실행하여 계정을 생성하실수 있습니다. <br/>
  password는 1234 가 암호화 되어 있습니다. 로그인 시 사용하시면 됩니다.<br/>
  INSERT INTO user (email_id, name, password, ranking, score, hide_yn, role) VALUES ({개인이메일}, {이름}, '$2a$10$I1z3kYmQqg8iOLcM/JAqKOlZZLWWGXPy6BUiT5dBNdbI.zCGw1sFy', '0', '0', 'N', 'USER');

#TODO
1. 일별 게시글, 댓글 통계 UI
