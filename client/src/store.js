import { createStore, applyMiddleware } from 'redux';
import { Map } from 'immutable';
import { createEpicMiddleware } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
// import { createLogger } from 'redux-logger';
import { ajax } from 'rxjs/ajax';
import 'rxjs';

const learnMoreFulfilled = (payload) => ({ type: 'LEARN MORE FULFILLED', payload });

const learnMoreEpic = (action$) =>
  action$.pipe(
    ofType('LEARN MORE'),
    mergeMap((action) =>
      ajax.getJSON(`/learn`).pipe(map((response) => learnMoreFulfilled(response)))
    )
  );
const initialState = new Map({
  title: 'Сунь Укун, Monkey King',
  content:
    '- это герой ловкости, очень известный своей скользкой натурой, а также своей способностью обманывать его врагов превращаясь в деревья и другие объекты. Вооружившись своим магическим увеличивающимся посохом, Monkey King ударяет землю своими и прыгает по вершинам деревьев, чтобы избегать противников. Как герой роли Керри, Monkey King получает дополнительный урон и вампиризм после нанесения нескольких атак по своему противнику. Находясь на дереве, он получает лучший взор на его окрестности, позволяя ему спрыгивать на ничего не ожидающих врагов с  нанося существенный урон и замедляя их побег. В командном бою, Monkey King посылает небольшую армию клонов по всему полю битвы, в то время как он сам получает дополнительную броню. С помощью его клонов и команды, Monkey King это сила с которой нужно считаться.',
  image: '/images/dota_1.png',
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LEARN MORE FULFILLED':
      return state
        .set('title', action.payload.title)
        .set('content', action.payload.content)
        .set('image', action.payload.image);
    default:
      return state;
  }
};

const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, initialState, applyMiddleware(epicMiddleware));

epicMiddleware.run(learnMoreEpic);

export default store;
