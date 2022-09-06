# _WebRTC 란?_
웹 브라우저 간 플러그인 도움없이 서로 통신(P2P) 할 수 있게 한 API

### Features
-----------------------
- JS 를 통해 실행 가능 -> RTC Web App 이용
- W3C 와 IETF 에서 API 레벨과 protocol 레벨 표준화
- Peer 들 간의 통신을 위한 중계 과정이 필요함 (서로 간의 정보 교환, SDP, Candidate)
- => Signal Server 통하여 구현
- => 3가지 교환 정보(Session Control Message, Network Configuration, Media capabilities)

### 서버의 필요성
-----------------------
- Signaling 사용자 탐색, 통신
- 방화벽과 NAT 트래버셜로 인해 필요 => NAT 와 DHCP 로 인해 사용자 특정이 어렵기 때문.
- P2P 통신 중계 서버

### STUN Server 의 필요성
-----------------------
- NAT 트래버셜 작업(라우터 연결방법 찾기)를 하기 위한 목적
- 즉, 자신의 공인 IP 주소와 함께 통신에 필요한 정보를 보내주기 위함이다.
- if, 이 경우에도 통신이 되지 않는다면 TURN Server로 넘김

### TURN Server 의 필요성
-----------------------
- STUN 서버로 정보를 얻지 못하는 경우 대안으로 사용
- 서버로 패킷을 보내고 이를 포워딩 하지만, 모든 작업을 한 서버에서 하므로 오버헤드 발생

