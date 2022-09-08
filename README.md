# _WebRTC 란?_
웹 브라우저 간 플러그인 도움없이 서로 통신(P2P) 할 수 있게 한 API

### __Features__
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
- 서버로 패킷을 보내고 이를 포워딩 하지만, 모든 작업을 한 서버에서 하므로 오버헤드 발생 (STUN 에 비해 리소스 낭비가 심함)

### Signaling Server
-----------------------
- 각 Peer 간 SDP 메시지, Offer, Answer 전달 역할
- ICE 후보 교환
- Peer를 관리 해주는 포워딩 서버

### SDP (Session Description Protocol)
----------------------
- 두 명의 Peer가 있을 때 다른 한쪽에서 데이터가 전송되고 있다는 것을 알려줌
- 컨텐츠에 대한 메타데이터를 설명한다 -> 미디어 자체라기 보다는 메타데이터라고 봄




## __Server 의 연결구조 종류__


### Mesh Server(Map 방식)
----------------------
- Peer 간의 offer와 answer session 정보 중계 역할
- 처음 WebRTC peer 간 정보 교환시에 서버 부하가 발생함
- 연결 완료된 후에는 부하가 따로 발생하지 않음
- 장점: 서버부하가 적어서 자원이 적게 듦. Peer간 직접연결로 실시간성이 보장됨
- 단점: 다수의 연결시 클라이언트 과부하 발생

### MCU (Multi-point Control Unit)
----------------------
- 다수의 송출 미디어를 중앙서버에서 혼합&가공하여 전달하는 방식
- 클라이언트와 Peer 간의 연결이 아닌 서버와 클라이언트 간의 Peer를 연결
- Mesh 와 다르게 개개인에게 정보를 보낼 필요가 없고 중앙서버에서 한 번만 보냄
- 즉, 클라이언트는 서버에게서 하나의 Peer로 데이터를 받음 (연결이 한개)
- 장점: 클라이언트의 부하가 현저히 줄어듦. N:M 구조로 설계 가능
- 단점: 중앙서버의 높은 컴퓨팅 파워를 요구함 -> 자원이 많이 들게됨. 연산시간이 길어져 실시간성이 저하됨

### SFU (Selective Forwarding Unit)
----------------------
- 종단간 미디어 트래픽을 중계하는 방식
- 서버와 클라이언트 간의 Peer 를 연결
- 모든 연결형식에서 서버에 자신의 영상 데이터만 보내면 된다
- 실시간 스트리밍에 적합
- 장점: P2P 보다는 느리지만 실시간성이 유지됨. 상대적으로 클라이언트 부하가 적음
- 단점: 상대적으로 서버비용이 높음. 그리고 대규모로 연결하는 경우 여전히 클라이언트 부하가 존재함


## WebRTC의 대표적인 API
-----------------------
- getUserMedia: 미디어장치에 접근하여 캡처하기 위한 API
- getDisplayMedia: 로컬 장치의 디스플레이에 접근하기 위한 API
- MediaRecoder: 오디오, 비디오를 녹화하기 위한 API
- RTCPeerConnection: 피어간에 스트림을 송수신하기 위한 연결 설정 API
- RTCDataChannel: 피어간 일반 임의 데이터(ex. txt, file, data)를 송수신하기 위한 API
- getStats: PeerConnection의 상태 정보에 접근하기 위한 API


예제모음: https://webrtc.github.io/samples/
