# react_native로 todo app 만들기

## 프로젝트 생성

```bash
expo init TodoApp
```

## 프로젝트 시작

```bash
npm start
```

### 터치 이벤트

```javascript
import { TouchableOpacity, TouchableHighlight } from 'react-native';
```

#### TouchableOpacity 
터치했을 때 투명도 애니메이션 적용

#### TouchableHighlight
터치했을 때 highlight 적용

#### Pressable
터치 기반 입력을 처리하는 보다 광범위하고 미래 지향적인 방법을 찾고 있다면 Pressable API를 확인해 보세요.

추후에는 TouchableOpacity가 없어지고 Pressable만 사용할 수도 있음

##### onPress
- 터치했을 때 동작할 이벤트를 정의할 수 있음

```javascript
  <TouchableHighlight onPress={() => console.log('sdf')}>
    <Text style={styles.btnText}>Travel</Text>
  </TouchableHighlight>
```

- Travel 클릭 시 콘솔창에 sdf라는 단어가 찍힘

##### underlayColor
- 터치했을 때 배경색 변하게 하는 props

##### activeOpacity
- 터치했을 때 투명도 조절할 수 있음 (0~1)

