# :zap: Deep state ann deep effect

### Enhanced useState hook

Deep state hook is an enhanced version of standard useState hook. It provide functionality that standard useState hook is missing, like object merging, deep equality check and deep property equality check.

Hook usage is similar to well known useState hook :wink: with additional options.

Deep effect hook is an enhanced version of standard useEffect hook. It provide functionality that standard useState hook is missing, like deep dependencies check and custom equality check function.

Hook usage is similar to well known useEffect hook :wink: with additional options.

---
### 🚀 [Demo](https://codesandbox.io/s/simple-state-q0bke) - Codesandbox basic example

## Basic usage

Store module

```js
// store.js
import { makeObservable, useSimpleState } from "@ivbrajkovic/simple-state";

// This can be an object with many properties
const store = makeObservable({ clickCounter: 0 });

// Select property you want to observer
export const useSimpleStore = (select) => {
  return useSimpleState(store, select);
};
```

Some component

```js
// Component.js
import { useSimpeStore } from "./useSimpleStore";

const Component = () => {
  const [count, setCount] = useSimpeStore("clickCounter");
  
  return <div>
    <button onClick={() => setCount(count + 1)}>Incerment</button>
    <div>{count}</div>
  </div>
}

export default Component
```
<br /> 

## API

* `makeObservableSelect` - initialize observable object, accept object to observe and return observable
```js
const observable = makeObservableSelect(object);
```
| Param | Default | Required | Description | 
|---|---|---|---|
| object | { } | yes | object to observe |

| Returns | Description | 
|---|---|
| object | observable object |

<br />  

* `useSimpleState` - listen for change on observable
```js
const [state, setSimpleState] = useSimpleState(select, onChange?);
```
| Parame | Default | Required | Description |
|---|---|---|---|
| string | - | yes | property to oberve |
| callback | - | no | onChange callback called with changed value<br/>*if provided hook will not rerender* |

| Returns | Description | 
|---|---|
| state | observed value | 
| setSimpleState | update observed value |

<br /> 

## :checkered_flag: TODO

1. Add multiple selector
2. Add reference equality check
