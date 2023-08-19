# React Native

## Installation

- expo-cli

```bash
npm install --global expo-cli
```

- watchman (mac)

```bash
brew update
brew install watchman
```

- expo-go 

appstore에 들어가서 설치

## React Native 작동 방법

![image](https://github.com/hyunwoomemo/react_native_start/assets/105469077/22954f8d-968b-46a9-8b35-97d19022f15c)

1. 사용자가 버튼을 누름. event는 native 쪽에서 기록. ios와 안드로이드에서 touch event 감지
2. react native는 그 정보를 가지고 json 메세지를 생성
3. bridge를 통해서 메세지를 javascript에게 전달
4. 메세지를 전달 받은 javascript는 어떤 동작을 수행하거나 ui를 업데이트하는 동작에 대한 메세지를 만들고
5. 그 메세지를 native에게 전달