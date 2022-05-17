- package.json
    - 프로젝트에서 패키지를 사용할 때, 같은 패키지라도 버전별로 기능이 다를 수 있으므로 기록하고 관리해야 하는데 이 역할을 하는 파일이 package.json이다.
    - package-lock.json 은 어떤 패키지를 설치할 때 해당 패키지에서도 다른 패키지를 사용 했다면 같이 설치되는데 그것에 대한 의존 관계를 담고 있다.

- npm install
    - npm install —save-dev [package] == npm install -D [package]
        - —save 는 설치하는 패키지를 설치한 패키지의 버전을 관리하는 파일인 package.json에 기록한단 의미이다.
        - npm@5 부터는 —save 옵션이 기본 값으로 들어가 있다.
        - -dev 는 배포 시에는 사용되지 않고 개발 중에만 사용되는 패키지를 설치할 때 사용한다.
    - npm install —global [package] == npm install -g [package]
        - 해당 패키지를 전역에 설치하는 옵션이다.
    - audited [number] packages
        - 패키지를 설치할 때 위 메세지가 나오면 패키지에 있을 수 있는 취약점을 자동으로 검사했다는 의미이다.가끔 취약점이 발견되면 아래와 같은 문장이 출력된다.
            
            ```
            found [발견 숫자] [심각도] severity vulnerabilities run `npm audit fix` to fix them, or `npm audit` for detail.
            ```
            
            npm audit fix 를 입력하여 알아서 수정하게 할 수 있다.
            
- NPM에서는 SemVer 방식의 버전 넘버링을 따른다.
    - ^
        - minor 버전까지만 설치하거나 업데이트 한다.
        - 예를 들어 npm i express@^1.1.1 이라면 1.1.1이상 2.0.0 미만 버전까지 설치된다. 1.x.x와 같이 표현 가능하다.
    - ~
        - patch 버전까지만 설치하거나 업데이트한다.
        - npm i express@~1.1.1 이라면 1.1.1 이상부터 1.2.0 미만 버전까지 설치되며 1.1.x와 같이 표현된다.
    - >, <, ≥, ≤, =
        - 초과, 미만, 이상, 이하, 동일을 나타내며 npm i express@>1.1.1 이라하면 반드시 1.1.1 보다 높인 버전이 설치된다.
    - @latest
        - 안정된 최신 버전의 패키지를 설치한다.
    - @next
        - 가장 최근 배포판을 사용할 수 있다.
        - 보통 알파타 베타 버전의 패키지를 설치하기보다 출시 직전의 패키지(rc)를 설치할 때 사용한다.
        
- outdated
    - 업데이트할 수 있는 패키지가 있는지 확인한다.
    
- uninstall
    - 패키지를 제거한다.
    - rm 으로 줄여 쓸 수 있다.
    
- search
    - 패키지를 검색할 수 있다.
    
- info
    - 패키지의 세부 정보를 파악하고자 할 때 사용한다.
    
- adduser, logout
    - npm 로그인, 로그아웃을 위한 명령어
    - whoami 를 통해 현재 로그인한 계정 정보도 확인 가능하다.
    
- version
    - package.json의 버전을 올린다.
    - 원하는 숫자를 넣으면 된다.
    - major, minor, patch 로 해당 부분의 숫자를 1 올릴 수도 있다.
    
- npm view [package] versions
- npm show [package] versions
- npm info [package] versions