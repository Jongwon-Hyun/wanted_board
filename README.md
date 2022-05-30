## 💻 프로젝트 기술 스펙
|  |  |
|-|-|
| typescript | 4.5.2 |
| node.js | v16.13.0 |
| nest.js | ^8.0.0 |
| type orm | ^0.2 |

---

## 🛠 개발환경 설정
### 사전 준비
 - nvm 설치, node 설치(nvm 사용 권장), npm 설치, docker 설치
### 셋업
- 노드 버전 설정  
  `nvm use`
- 의존 라이브러리 설치  
  `npm install`
- MySQL DB 기동  
  `npm run docker:up`
- 빌드  
  `npm run build`
- DB 테이블 생성  
 `npm run migration:run`
- DB 초기 데이터 생성  
 `npm run seed:config`  
 `npm run seed:run`
- API 서버 기동  
 `npm run start`  / hot reload 사용 안할 때    
 `npm run start:dev`  / hot reload 사용 할 때   

 ---

## 🗃 DB 마이그레이션
- 타입스크립트 호환 문제로 dist 폴더의 js 파일을 사용하므로 모든 커맨드는 빌드 후 실행할 것    
`npm run build`
- 엔티티 생성, 수정 변경 사항을 바탕으로 마이그레이션 파일 생성  
`npm run migration:generate <이름>`  
   - 가끔 이상한 구문을 생성하기 때문에 생성 후 반드시 확인!!
- 마이그레이션 보일러 플레이트 파일 생성  
`npm run migration:create`
- 마이그레이션 실행  
`npm run migration:run`
- 마이그레이션 취소(한 단계 이전 상태로 되돌리기)  
`npm run migration:revert`
- 모든 테이블 초기화(drop)  
`npm run schema:drop`
- DB 데이터 생성 초기화 설정  
`npm run seed:config`
- DB 데이터 생성  
`npm run seed:run`  
  - 테이블 초기화, DB 데이터 생성 초기화 설정 후 실행 할 것

 