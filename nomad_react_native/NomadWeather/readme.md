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

## create a new app

expo init 프로젝트명

- expo 로그인
expo login

- expo 실행
npm run start || expo start

`App.js`

```javascript
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

![image](https://github.com/hyunwoomemo/react_native/assets/105469077/be54e72f-7f19-4b64-803c-1961bf75a609)

## react-native 코드 살펴보기

```javascript
import { StyleSheet, Text, View } from 'react-native';
```

- View 컴포넌트는 container ! div를 쓸 수 없다
- 모든 text는 Text 컴포넌트 안에 있어야 한다.
- StyleSheet를 무조건 사용해야하는 건 아니지만 스타일을 한 곳에서 관리할 수 있으며 자동 완성을 지원한다!!
- `<StatusBar style="auto" />` 상태 표시줄 컴포넌트

## react-native component

- [react-native component](https://reactnative.dev/docs/components-and-apis)
react-native에서 제공하는 컴포넌트를 볼 수 있는 사이트

- [expo component](https://docs.expo.dev/versions/latest/)
expo에서 제공하는 많은 컴포넌트를 확인할 수 있는 사이트

## react-native Layout with Flexbox

- 모든 View는 기본적으로 FlexContainer
- Flex Direction의 기본값은 'column' (웹사이트는 row임)

```javascript
  <View style={{flex: 1}}>
    <View style={{flex:1, backgroundColor:"tomato"}}></View>
    <View style={{flex:3, backgroundColor:"teal"}}></View>
    <View style={{flex:1, backgroundColor:"orange"}}></View>
  </View>
```

![image](https://github.com/hyunwoomemo/react_native/assets/105469077/fa4053cd-7f7a-4346-aa5c-3d13a6c503c9)

## scrollView

- 스크롤 다운 가능한 view

```javascript
import { ScrollView } from 'react-native';
```

### props

#### contentContainerStyle
- scrollView에서 style을 주기위해서는 아래 코드처럼 contentContainerStyle을 사용해야한다.

```javascript
<ScrollView contentContainerStyle={styles.weather} horizontal>
```

#### horizontal
- 수평 스크롤을 위한 props

#### pagingEnabled
- 스크롤의 자유도를 없애고 페이지 이동하는 것처럼 스크롤 되게하는 props

#### showsHorizontalScrollIndicator
- default값은 true
- indicator 숨기고 싶으면 해당 props의 false를 준다.

## Dimensions

디바이스의 넓이와 높이를 얻기 위해 Dimensions api 사용


```javascript
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```