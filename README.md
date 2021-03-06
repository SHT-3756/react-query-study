# React-Qeury 공부

## 준비
```shell 
npx create-react-app reactQuery-study
npm i react-query
```


## 리액트 쿼리란? 
ReactQuery 는 Server State 를 관리하는 라이브러리다.
리앧트 프로젝트에서 Server 와 Client 사이의 비동기 로직을 쉽게 관리 할 수 있게 도와준다.

*공식 홈페이지*
> 전역상태를 건드리지 않고 리액트와 네이티브에서 데이터를 가져오고, 캐시하고, 업데이트한다.

> Client 에서 제어하거나 소유되지 앟은 원격의 공간에서 관리되고 유지됨
> Fetching 이나 Updating에 비동기 API가 필요함
> 다른 사람들과 공유되는 것으로 사용자가 모르는 사이에 변경이 될수 있음
> 신경쓰지 않으면 잠재적으로 "out of data" 가 될 가능성이 있음.


## Why ? 
우리가 사용하는 리덕스의 스토어(store)에는 비동기 데이터 통신을 위한 AJAX의 동작 상태와 API Response 들이 많이 있는 공간이다. 
대형 프로젝트인 만큼 몇 백개, 몇천개의 API 의 동작 상태와 Response들의 값들이 적혀있을것이다. 
이 수많은 Response를 전역 상태에 넣게 되는 것은 비효율적이다.  
과연 이 스토어라는 공간이 상태를 관리하는 코드라고 생각이 될까? NO 
그냥, API 통신이 담긴 코드라고 생각하게 될 것이다.

1. 스토어를 정확하게 부합되게 사용이 되고 있었나?
2. 상태관리를 라이브러리를 쓰고, 추가적으로 전역상태를 하지 않았나?
3. 스토어가 너무 비대해지고 비효율적이 되지 않았나?
4. 리덕스와 모벡스를 전역상태관리가 아닌 비동기 통신으로만 사용하지 않았나?   


