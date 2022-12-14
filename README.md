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

## ICE와 Candidate
-----------------------
- Candidate는 STUN, TURN 서버를 통해 획득한 IP주소, 프로토콜, 포트의 조합으로 구성된 연결 가능한 네트워크 주소를 말한다
- PeerConnection을 이용하면 Candidate를 얻을 수 있다
- 이 때 Candidate는 3가지 정보를 얻어옴 (자신의 사설 IP와 포트넘버, 자신의 공인 IP와 포트넘버, TURN 서버의 IP와 포트넘버)
- 이 모든 과정은 ICE 라는 프레임워크를 통해 이루어진다
- ICE는 두개의 단말이 P2P 연결을 가능케 하도록 최적의 경로를 찾는 것이다
- ICE의 우선순위: 로컬 - STUN - TURN

### SDP (Session Description Protocol)
----------------------
- 두 명의 Peer가 있을 때 다른 한쪽에서 데이터가 전송되고 있다는 것을 알려줌
- 컨텐츠에 대한 메타데이터를 설명한다 -> 미디어 자체라기 보다는 메타데이터라고 봄 (코덱은 무엇들이 있으며, 어떤 프로토콜을 사용하고, 대역폭은 몇인지 등등)

### Signaling Server

_앞서 이야기한 과정을 시그널링이라고 함_ 
-----------------------
- 각 Peer 간 SDP 메시지, Offer, Answer 전달 역할
- ICE 후보 교환
- Peer를 관리 해주는 포워딩 서버

</br>

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

</br>

## WebRTC의 대표적인 API
-----------------------
- getUserMedia: 미디어장치에 접근하여 캡처하기 위한 API
- getDisplayMedia: 로컬 장치의 디스플레이에 접근하기 위한 API
- MediaRecoder: 오디오, 비디오를 녹화하기 위한 API
- RTCPeerConnection: 피어간에 스트림을 송수신하기 위한 연결 설정 API
- RTCDataChannel: 피어간 일반 임의 데이터(ex. txt, file, data)를 송수신하기 위한 API
- getStats: PeerConnection의 상태 정보에 접근하기 위한 API


예제모음: https://webrtc.github.io/samples/

</br>

### Kurento Media Server
------------------------
#### Media Server란
- 그룹 통신시 사용을 용이하기 위해 중계하는 Server 개념
- WebRTC 미디어 서버는 미디어 트래픽이 통과하는 멀티미디어 미들웨어
- 즉, 미디어 서버에 들어오는 미디어 스트림을 처리하고 다른 결과물 송출 가능

#### Kurento는 Media Server의 종류 중 하나로, 주요요소로는 미디어 전송, 처리, 녹음 및 재생을 담당하는 KMS가 있다.

### Kurento 특징
- 다양한 클라이언트 API를 제공한다.(java, js...)
- HTTP, RTP, WebRTC 를 포함한 네트워크 스트리밍 프로토콜 지원
- 다양한 WebRTC 미디어 서버 유형을 제공을 지원한다. (MCD, SFU)
- VP8, H.264, H263, AMR, OPUS 등 GStreamer에서 지원하는 코덱간의 자동 미디어 트랜스 코딩

### Kurento 디자인 원칙
- 별도의 미디어 및 신호 평면
- 미디어 및 애플리케이션 서비스 배포
- 클라우드에 적합
- 미디어 파이프라인
- 응용 프로그램 개발
- 종단 간 통신 기능
- 완전히 처리 가능한 미디어 스트림
- 미디어의 모듈식 처리
- 감사 가능한 처리
- 원활한 IMS 통합
- 투명 미디어 적용 계층
