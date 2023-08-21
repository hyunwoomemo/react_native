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

### TextInput

```javascript
import { TextInput } from 'react-native';

export default function App() {
  return (
    <TextInput style={styles.input} placeholder={working ? 'Add a To Do' : 'Where do you want to go?'} />
  )
}
```

#### keyboardType
- 키보드 타입을 변경해주는 props (이메일, 숫자, 전화번호 등)

#### returnKeyType
- return의 텍스트를 변경해주는 props (send, go, next 등)

#### secureTextEntry
- input의 text를 비밀번호처럼 마스킹해주는 props

#### multiline
- textarea처럼 여러 줄로 input을 작성할 수 있게하는 props

#### onChangeText
- input change 핸들러

#### onSubmitEditing
- input submit 핸들러

### AsyncStorage (react-native 스토리지 사용)
- EXPO SDK
- `expo install @react-native-async-storage/async-storage`
- `import AsyncStorage from '@react-native-async-storage/async-storage';`

### Alert 
- 지정된 제목과 메시지가 포함된 알림 대화 상자를 시작합니다.
- `Alert.alert()`, `Alert.prompt()`
- prompt는 ios에서만 사용 가능
```javascript
const deleteToDo = (key) => {
    Alert.alert(
      'Delete To Do?',
      'Are you sure?',
      [
        { text: 'Cancel' },
        {
          text: "I'm sure", onPress: () => {
            const newToDos = { ...toDos };
            delete newToDos[key];
            setToDos(newToDos);
            saveToDos(newToDos)
        } }
      ])
  }
```

### Icon

[icons.expo.fyi](https://icons.expo.fyi/Index)


